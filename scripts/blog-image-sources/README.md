# Blog hero source images (optional)

Place the curated `.webp` masters here with the same filenames used in `scripts/sync-blog-hero-images.mjs`, or rely on the automatic lookup of:

`%USERPROFILE%\.cursor\projects\c-Users-iamanigger-Desktop-website-mw4-cheat-app\assets\`

The sync script resizes them into `public/images/blog/<post-slug>-{320,400,512,640,960}.webp` before `npm run build`.

If this folder is empty and the Cursor assets path is missing, the build keeps existing files under `public/images/blog/`.
