# Fund Sid’s GTA VI Era

A funny personal ₹7,500 GTA VI fundraiser for Sidhartha Das, ready to host on GitHub Pages.

## Open locally

Run `python3 -m http.server 8000` in this folder and open http://127.0.0.1:8000 in Chrome. Keep that terminal running while previewing. You can also open `index.html` directly; use the local server for the best preview of video and sharing behavior.

## Publish on GitHub Pages

1. Create a GitHub repository, for example `fund-sids-gta6`.
2. Upload `index.html`, `style.css`, `script.js`, `.nojekyll`, and the entire `assets` folder, preserving the folder structure. The ZIP contains these files plus this guide. Extract it before uploading.
3. Open repository **Settings → Pages**.
4. Select **Deploy from a branch → main → / (root)** and save.
5. Share the public URL that GitHub displays when the deployment finishes.

No npm, build process, API key, paid service, or backend is needed. Relative asset paths work for GitHub project Pages. The QR and hero artwork are local; Google Fonts and YouTube need an internet connection. System fonts are used if Google Fonts is unavailable.

## The experience

- Original full-screen sunset artwork with a scroll-controlled zoom and changing title.
- A pinned three-exhibit sequence: console acquired, monitor acquired, game missing. The console, monitor, and game box are rendered in CSS.
- A skippable intro that plays once per tab session; replay it from the footer.
- Roast button, five-star police-light chaos, animated countdown, donation tiers, QR download, share button, and a joke thank-you celebration.
- Motion controls and system reduced-motion support. When motion is paused, the pinned exhibits become ordinary readable sections.
- The user-supplied launch trailer is click-to-play, with a direct YouTube fallback: https://www.youtube.com/watch?v=rz1B4B2yBZY

## Payments

`assets/upi-qr.jpeg` is the supplied PhonePe image for Sidhartha Das, unchanged. CSS displays the QR region, and the full original can be opened or downloaded.

Choosing a tier or entering an amount does not modify the QR. Visitors enter their chosen amount in their UPI app and verify the recipient there. This site does not process, verify, store, or count donations. The “I sent it” button opens honorary applause, not a payment confirmation.

₹7,500 is the personal fund target, not an official store price quote. Your QR and recipient name will be public when you publish.

## Edit

Copy and sections: `index.html`. Styling: `style.css`. Countdown, roasts, motion, and interactions: `script.js`.

Countdown: November 19, 2026 at midnight in India. Official game and setting: https://www.rockstargames.com/VI

## Artwork

`assets/leonida-sunset.jpg` was created with the built-in Imagegen tool and exported to JPEG for the web. It is original AI-assisted fan artwork, not an official game screenshot. The original generated PNG remains in the Codex generated-images library.

Prompt: “Premium detailed game-promo-style illustration of a coral pink sports coupe on a fictional Miami waterfront at a purple and peach sunset, palms framing the scene, neon skyline, reflective asphalt, tiny flamingos, wide 16:9 composition with upper sky for typography; no people, text, logos or watermark.”

This is an unofficial fan fundraiser, not affiliated with Rockstar Games or PlayStation.
