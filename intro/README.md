# Intro clip

Small Remotion project that renders the water intro shown when the site loads.
The finished clip lives at `public/assets/intro/softwave-intro.mp4` in the site.

## Re-render it

```
npm i
cp ../public/assets/water/water-loop-desktop.mp4 public/water.mp4
npx remotion render SoftwaveIntro out/softwave-intro.mp4
```

Then scale it down for the web and copy it into the site:

```
npx remotion ffmpeg -i out/softwave-intro.mp4 -vf scale=1280:720 -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -movflags +faststart -an ../public/assets/intro/softwave-intro.mp4 -y
```

`public/water.mp4` and `out/` are just build inputs/outputs and are not committed.
