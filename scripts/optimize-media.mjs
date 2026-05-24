#!/usr/bin/env node
/**
 * Media optimization workflow for SoftWaveTech.
 *
 * Regenerates the compressed/modern media the live site references, from the
 * original archived source files. Requires ffmpeg (with libx264, libvpx-vp9,
 * libwebp; libaom-av1 optional) on your PATH.
 *
 *   node scripts/optimize-media.mjs          # encode everything
 *   node scripts/optimize-media.mjs --probe  # just print source info
 *
 * Originals are never modified or deleted — outputs are written beside them.
 * Always visually check the results; the CRF/bitrate targets below are tuned
 * for a heavily tinted background and a brief fullscreen intro.
 */
import { execFileSync, spawnSync } from 'node:child_process'
import { existsSync, statSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const water = join(root, 'public/assets/water') // optimized outputs (deployed)
const intro = join(root, 'public/assets/intro')

// Originals live outside public/ so they are archived/versioned but never
// copied into the production build.
const BG_SRC = join(root, 'media-source/water/water-bg.mp4')
const INTRO_SRC = join(root, 'media-source/intro/softwave-intro.mp4')
const POSTER_SRC = join(water, 'water-poster.jpg')

const mb = (p) => (existsSync(p) ? (statSync(p).size / 1048576).toFixed(2) + ' MB' : 'missing')

function haveFfmpeg() {
  try {
    execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

function run(args) {
  console.log('  ffmpeg ' + args.join(' '))
  const r = spawnSync('ffmpeg', args, { stdio: ['ignore', 'ignore', 'inherit'] })
  if (r.status !== 0) throw new Error('ffmpeg exited with code ' + r.status)
}

// libvpx-vp9 is encoded 2-pass: its single-pass CRF mode does not reliably
// constrain size, while 2-pass hits the target bitrate predictably.
function vp9TwoPass({ input, output, bitrate, vf, log }) {
  const common = ['-y', '-hide_banner', '-loglevel', 'error', '-i', input, '-an',
    '-vf', vf, '-c:v', 'libvpx-vp9', '-b:v', bitrate, '-row-mt', '1',
    '-deadline', 'good', '-cpu-used', '2', '-passlogfile', log]
  run([...common, '-pass', '1', '-f', 'null', process.platform === 'win32' ? 'NUL' : '/dev/null'])
  run([...common, '-pass', '2', output])
  const passLog = join(root, log + '-0.log')
  if (existsSync(passLog)) rmSync(passLog)
}

if (process.argv.includes('--probe')) {
  for (const f of [BG_SRC, INTRO_SRC, POSTER_SRC]) {
    console.log(`${f}: ${mb(f)}`)
  }
  process.exit(0)
}

if (!haveFfmpeg()) {
  console.error('\nffmpeg not found on PATH. Install it, then re-run this script.')
  console.error('See MEDIA_OPTIMIZATION.md for the exact commands to run by hand.\n')
  process.exit(1)
}

console.log('Optimizing media (originals are preserved)...\n')

// --- Background: 720p, behind a dark tint, so it can be pushed hard ----------
console.log('Background MP4 (H.264, 720p, 24fps, CRF 35)')
run(['-y', '-hide_banner', '-loglevel', 'error', '-i', BG_SRC, '-an',
  '-vf', 'scale=1280:-2:flags=lanczos,fps=24', '-c:v', 'libx264', '-profile:v', 'high',
  '-pix_fmt', 'yuv420p', '-preset', 'slow', '-crf', '35', '-movflags', '+faststart',
  join(water, 'water-bg.optimized.mp4')])

console.log('Background WebM (VP9, 720p, 24fps, ~1200k 2-pass)')
vp9TwoPass({
  input: BG_SRC,
  output: join(water, 'water-bg.webm'),
  bitrate: '1200k',
  vf: 'scale=1280:-2:flags=lanczos,fps=24',
  log: 'bgpass',
})

// --- Intro: brief fullscreen brand moment, keep it crisp ---------------------
console.log('Intro MP4 (H.264, 720p, CRF 28)')
run(['-y', '-hide_banner', '-loglevel', 'error', '-i', INTRO_SRC, '-an',
  '-vf', 'scale=1280:-2:flags=lanczos', '-c:v', 'libx264', '-profile:v', 'high',
  '-pix_fmt', 'yuv420p', '-preset', 'slow', '-crf', '28', '-movflags', '+faststart',
  join(intro, 'softwave-intro.optimized.mp4')])

console.log('Intro WebM (VP9, 720p, ~2500k 2-pass)')
vp9TwoPass({
  input: INTRO_SRC,
  output: join(intro, 'softwave-intro.webm'),
  bitrate: '2500k',
  vf: 'scale=1280:-2:flags=lanczos',
  log: 'intropass',
})

// --- Poster: WebP always, AVIF when libaom is available ----------------------
console.log('Poster WebP (q68)')
run(['-y', '-hide_banner', '-loglevel', 'error', '-i', POSTER_SRC, '-c:v', 'libwebp',
  '-quality', '68', '-compression_level', '6', join(water, 'water-poster.webp')])

console.log('Poster AVIF (CRF 32, requires libaom-av1)')
try {
  run(['-y', '-hide_banner', '-loglevel', 'error', '-i', POSTER_SRC, '-c:v', 'libaom-av1',
    '-still-picture', '1', '-crf', '32', '-cpu-used', '6', join(water, 'water-poster.avif')])
} catch {
  console.warn('  AVIF skipped (libaom-av1 unavailable). WebP + JPG fallback still cover everything.')
}

console.log('\nDone. Output sizes:')
for (const f of [
  'water/water-bg.optimized.mp4', 'water/water-bg.webm',
  'intro/softwave-intro.optimized.mp4', 'intro/softwave-intro.webm',
  'water/water-poster.webp', 'water/water-poster.avif',
]) {
  console.log(`  ${f.padEnd(36)} ${mb(join(root, 'public/assets', f))}`)
}
console.log('\nNow visually check each clip/image in the browser before committing.')
