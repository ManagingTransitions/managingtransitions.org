# Upload everything in this folder to the repository root

There are no subfolders. Nothing depends on the GitHub uploader preserving folder
structure, which is what broke the images the first time.

## The fix, in four clicks

From the repository page on GitHub:

1. **Add file → Upload files**
2. Select the **11 files** listed below and drag them onto the drop zone together
3. Commit message: `flatten asset paths, add codebook page`
4. **Commit changes**

GitHub overwrites the HTML files already there and adds the rest. Give Pages about a
minute, then hard-refresh `managingtransitions.org/research.html` (Ctrl+Shift+R).

Do **not** upload `UPLOAD-THESE.md`. It is this file.

## The 11 files

| File | What it does |
|---|---|
| `research.html` | Loads `fig1.png` from the root instead of `img/fig1.png`. This is the actual fix |
| `index.html` | Social card image path corrected to the root |
| `codebook.html` | New. The codebook as a styled page matching the site, with the corrections log as a section |
| `fig1.png` `fig2.png` `fig3.png` | Re-optimised, 563 KB down to 199 KB, no visible quality loss |
| `transition_exposure_dataset.csv` | The dataset, linked from the download block |
| `faq.html` `diagnostic.html` | Unchanged from the original bundle. Re-uploading is harmless and guarantees they are current |
| `robots.txt` | Points at the sitemap |
| `sitemap.xml` | Now lists the codebook page too |

`Thomson-2026-Transition-Exposure-UK-INGOs.pdf` is already live at the root and does not
need uploading again.

## One optional extra: `.nojekyll`

There is a twelfth file in this folder called `.nojekyll`. It is empty, and it stops
GitHub Pages running Jekyll across the repository. Nothing currently at the root needs
it, so skip it if it is awkward.

Chromebook file pickers hide files starting with a dot, so if you want it, the easier
route is **Add file → Create new file**, type `.nojekyll` as the filename, leave the
body empty, and commit. Worth doing if you ever add a `.md` file at the root, because
Jekyll will otherwise try to turn it into a web page.

## Do not bother deleting the old `img/` or `data/` folders

If either was partially created on the first attempt, leave it. Nothing points at them
any more and tidying up is not worth the clicks before launch.

## Check these five URLs after the commit

- `managingtransitions.org/research.html` — all three figures visible
- `managingtransitions.org/fig1.png` — the chart itself, not a 404
- `managingtransitions.org/codebook.html` — a styled page, not raw markdown
- `managingtransitions.org/transition_exposure_dataset.csv` — downloads or displays
- `managingtransitions.org/` — hero reads "When the funding ends, what actually breaks?"

Then run the research URL through LinkedIn's Post Inspector
(`linkedin.com/post-inspector`) so it re-reads the social card. LinkedIn caches the
first version it sees, and right now that version has a broken image.
