# Voltescape Static Launch

This folder is the same-day emergency launch version of Voltescape.

Upload the contents of this folder to any static host if the Next.js/Vercel pipeline is not ready yet.

## Files

- `index.html` — homepage
- `404.html` — fallback page to avoid dead routes on simple static hosts
- `voltescape-assets/voltescape-hero.png` — hero image

## Fast Launch Options

1. Drag this folder into Netlify Drop or another static host.
2. Upload the folder contents to any host connected to `voltescape.com`.
3. Point the domain to that host.

## After Launch

Replace this static version with the full Next.js app when Vercel, Supabase and Travelpayouts environment variables are ready.
