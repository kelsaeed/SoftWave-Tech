# Media optimization

The site's heavy media (water background + intro clip) is shipped as small,
modern-format files. The **original high-bitrate files are kept as source/archive**
in `media-source/` and are *not* referenced by the live site.

> **Why `media-source/` and not `public/`?** Everything under `public/` is copied
> verbatim into `dist/` at build time. Keeping the ~80 MB / ~29 MB originals there
> would ship them to production unused. They live outside `public/` so they're
> versioned/archived but never deployed. Only the optimized files in
> `public/assets/**` are built and served.

## Files

| Role | Source (archived, not deployed) | Live: WebM (modern) | Live: MP4 (fallback) |
|------|---------------------------------|---------------------|----------------------|
| Background | `media-source/water/water-bg.mp4` | `public/assets/water/water-bg.webm` | `public/assets/water/water-bg.optimized.mp4` |
| Intro | `media-source/intro/softwave-intro.mp4` | `public/assets/intro/softwave-intro.webm` | `public/assets/intro/softwave-intro.optimized.mp4` |

| Role | Source | Modern (AVIF) | Modern (WebP) | Fallback (JPG) |
|------|--------|---------------|---------------|----------------|
| Poster | `water-poster.jpg` | `water-poster.avif` | `water-poster.webp` | `water-poster.jpg` |

The browser picks the best it supports: WebM → MP4 for video, AVIF → WebP → JPG
for the poster (via CSS `image-set`). If WebM is unsupported it uses MP4; if the
modern poster formats are unsupported it uses the JPG.

## Regenerating

Requires **ffmpeg** on your PATH (with `libx264`, `libvpx-vp9`, `libwebp`;
`libaom-av1` is optional, only for AVIF).

```bash
npm run optimize:media        # encodes everything from the source files
npm run optimize:media -- --probe   # just print source sizes
```

The script never modifies or deletes the originals. **Always open the results in
a browser and visually check quality** before committing.

## Exact ffmpeg commands

These are what the script runs. Targets are tuned for a heavily tinted
background (can be pushed hard) and a brief fullscreen intro (kept crisp).

### Background — MP4 (H.264 fallback), 720p, 24 fps
```bash
ffmpeg -i media-source/water/water-bg.mp4 -an \
  -vf "scale=1280:-2:flags=lanczos,fps=24" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p -preset slow -crf 35 \
  -movflags +faststart public/assets/water/water-bg.optimized.mp4
```

### Background — WebM (VP9, 2-pass ~1200k)
VP9 is encoded 2-pass because its single-pass CRF mode does not reliably
constrain file size.
```bash
ffmpeg -y -i media-source/water/water-bg.mp4 -an \
  -vf "scale=1280:-2:flags=lanczos,fps=24" \
  -c:v libvpx-vp9 -b:v 1200k -row-mt 1 -deadline good -cpu-used 2 \
  -passlogfile bgpass -pass 1 -f null /dev/null      # use NUL on Windows
ffmpeg -i media-source/water/water-bg.mp4 -an \
  -vf "scale=1280:-2:flags=lanczos,fps=24" \
  -c:v libvpx-vp9 -b:v 1200k -row-mt 1 -deadline good -cpu-used 2 \
  -passlogfile bgpass -pass 2 public/assets/water/water-bg.webm
```

### Intro — MP4 (H.264 fallback), 720p
```bash
ffmpeg -i media-source/intro/softwave-intro.mp4 -an \
  -vf "scale=1280:-2:flags=lanczos" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p -preset slow -crf 28 \
  -movflags +faststart public/assets/intro/softwave-intro.optimized.mp4
```

### Intro — WebM (VP9, 2-pass ~2500k)
```bash
ffmpeg -y -i media-source/intro/softwave-intro.mp4 -an \
  -vf "scale=1280:-2:flags=lanczos" \
  -c:v libvpx-vp9 -b:v 2500k -row-mt 1 -deadline good -cpu-used 2 \
  -passlogfile intropass -pass 1 -f null /dev/null   # use NUL on Windows
ffmpeg -i media-source/intro/softwave-intro.mp4 -an \
  -vf "scale=1280:-2:flags=lanczos" \
  -c:v libvpx-vp9 -b:v 2500k -row-mt 1 -deadline good -cpu-used 2 \
  -passlogfile intropass -pass 2 public/assets/intro/softwave-intro.webm
```

### Poster — WebP + AVIF
```bash
ffmpeg -i public/assets/water/water-poster.jpg \
  -c:v libwebp -quality 68 -compression_level 6 \
  public/assets/water/water-poster.webp

ffmpeg -i public/assets/water/water-poster.jpg \
  -c:v libaom-av1 -still-picture 1 -crf 32 -cpu-used 6 \
  public/assets/water/water-poster.avif
```

## Recommended target sizes

| Asset | Target | Notes |
|-------|--------|-------|
| Background MP4 | 2–5 MB | Behind a dark tint + glass, so CRF can be high. |
| Background WebM | < background MP4 | VP9 ~1200k @ 720p24. |
| Intro MP4 | as small as acceptable | Brief, fullscreen — keep edges/logo clean. |
| Intro WebM | < intro MP4 | VP9 ~2500k @ 720p. |
| Poster | ~250–350 KB | AVIF smallest, WebP next, JPG fallback. |

Tuning knobs: raise `-crf` (x264) or lower `-b:v` (VP9) for smaller files at the
cost of quality; drop resolution (`scale=...`) or frame rate (`fps=...`) for
further savings. Re-check visually after any change.

## Achieved (current files)

| Asset | Before | After |
|-------|-------:|------:|
| Background | 79.5 MB (1080p, ~60 Mbps) | MP4 **3.44 MB** · WebM **1.69 MB** |
| Intro | 28.3 MB (1080p, ~65 Mbps) | MP4 **4.90 MB** · WebM **1.14 MB** |
| Poster | 0.51 MB (JPG) | AVIF **0.27 MB** · WebP **0.34 MB** |

Typical first load (modern browser, video allowed): poster ~0.27 MB immediately,
then ~1.69 MB background after idle — down from ~80 MB. On Save-Data / slow
connections / reduced-motion, only the poster loads and no video is fetched.

## What gets deployed

Only the optimized files below ship (everything else under `public/` plus the
hashed `dist/assets/index-*.{js,css}` and `index.html`):

```
public/assets/water/water-bg.optimized.mp4   (3.44 MB)
public/assets/water/water-bg.webm            (1.69 MB)
public/assets/water/water-poster.avif        (0.27 MB)
public/assets/water/water-poster.webp        (0.34 MB)
public/assets/water/water-poster.jpg         (0.51 MB)
public/assets/intro/softwave-intro.optimized.mp4 (4.90 MB)
public/assets/intro/softwave-intro.webm          (1.14 MB)
```

Total deployed media ≈ **11.8 MB**. `media-source/` holds the archived original
high-bitrate files; it is **not** built into `dist/` and must **not** be
referenced by live components — only the optimizer script reads from it.

## Vite build warnings

The earlier 3 `image-set ... didn't resolve at build time` warnings are **gone**.
The poster now uses a `<picture>` element (AVIF → WebP → JPG `<source>`s + `<img>`
fallback) instead of CSS `image-set`, so Vite no longer scans those public paths.
A clean build should now show **0 warnings, 0 errors**. If you reintroduce CSS
`image-set` (or `url()`) pointing at `public/` paths, those info warnings return
and are harmless (the path is passed through to runtime) — but the `<picture>`
approach avoids them entirely.

## QA notes

- Verified from the **production preview** (`npm run preview`, not dev): site
  returns 200, optimized assets serve with correct MIME types/sizes, and the
  original `*.mp4` paths 404 (SPA fallback serves `index.html`), confirming the
  heavy originals are not in `dist/`.
- Encoded specs confirmed via `ffprobe`: videos are 1280×720 (bg 24 fps, intro
  30 fps); posters are 1920×1080.
- **Poster is 1080p, video is 720p.** The first-paint still is therefore slightly
  sharper than the moving video; the difference is masked by the dark tint + glass
  and the 0.7s cross-fade. If a sharper background is ever wanted, raise the video
  `scale` to 1080p (expect ~2–3× larger files).
- Poster-to-video transition: the `<picture>` poster (opacity 0.85) fades out over
  0.7s once the `<video>` fires `playing`, so there is no hard cut and no flash —
  the poster stays until the first real frame is ready.
- Pixel-level quality (does 720p look premium, is the fade smooth on your
  displays) should be confirmed by eye using the checklist below.

## Pre-deploy media QA checklist

Run `npm run build && npm run preview`, then in a browser:

- [ ] **Desktop** hero/background looks crisp and on-brand at full width.
- [ ] **Mobile** (DevTools device or real phone) hero/background fills correctly.
- [ ] Poster appears immediately; **no flash/blank** before the video starts.
- [ ] Poster → video cross-fade is smooth (no hard cut, no double-bright flash).
- [ ] Intro clip plays once, looks clean (watch logo/edges), then fades to site.
- [ ] 720p background still looks premium behind the tint/glass.
- [ ] **prefers-reduced-motion** (DevTools › Rendering › Emulate CSS prefers-
      reduced-motion): no autoplay video, no intro, static poster + frozen waves.
- [ ] **Save-Data / slow link** (DevTools › Network throttling + Save-Data, or a
      `slow-2g`/`2g` profile): no video request in the Network panel; poster only.
- [ ] **Tab hidden/visible** (switch tabs): background video and cursor trail
      pause, then resume cleanly on return.
- [ ] Browsers: **Chrome** (WebM/VP9 + AVIF), **Firefox** (WebM + AVIF/WebP),
      **Safari/iOS** (falls back to MP4 + WebP/JPG — verify the MP4 path plays).
