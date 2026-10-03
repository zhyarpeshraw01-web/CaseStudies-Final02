# Put the presentation on GitHub Pages

The website is ready for GitHub Pages. No npm install, build step, Git LFS or external CDN is required.

## 1. Extract the download

Extract `Cancer-Hospital-Case-Studies-Offline.zip` completely. Open the `architecture-of-care` folder. You should see `index.html`, `presentation.js`, `presentation.css`, and the six asset folders.

## 2. Upload the website files

Open your GitHub repository and choose **Add file → Upload files**. Put the contents of `architecture-of-care` directly at the repository root, so `index.html` appears beside the `plans` and `photos` folders.

Upload and commit in these batches:

| Batch | What to drag into the upload page |
| --- | --- |
| 1 | The loose root files: `index.html`, `presentation.js`, `presentation.css`, `atelier.js`, `atelier.css`, `favicon.svg`, the documentation files, and `.nojekyll` / `.gitignore` if visible |
| 2 | The entire `plans` folder — 15 files |
| 3 | The entire `photos` folder — 31 files |
| 4 | The entire `details` folder — 13 files |
| 5 | The entire `source-sheets` folder — 19 files |
| 6 | The entire `team-analysis` folder — 33 files |
| 7 | The entire `fonts` folder — 4 files |

Use **Commit changes** after each batch. Keep the folder names and file names exactly as supplied. Do not flatten the images into the repository root. The upload page accepts folders by drag and drop in supported desktop browsers.

GitHub’s browser uploader limits an individual file to **25 MiB** and one upload to **100 files**. Every extracted file in this edition is below **2 MiB**, and every batch above is below 100 files. Uploading the website folders also lets Pages locate all the assets. Uploading a ZIP by itself does not create a working Pages site.

If hidden files are not visible, the provided static HTML/CSS/JS site can still run. You can also create an empty `.nojekyll` file using **Add file → Create new file**. It tells Pages to publish the static files without Jekyll processing.

For an existing presentation repository, overwrite the old `index.html` and upload the new files at the same root. The new version uses the supplied `plans`, `photos`, `details`, `source-sheets`, `team-analysis` and `fonts` folders. Upload every batch before testing the site.

## 3. Enable Pages

1. In the repository, open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Choose the branch that contains your upload, usually **main**.
4. Select **/(root)**, then **Save**.
5. Wait for the deployment to finish. GitHub will show your site link on this page. Publication can take up to about 10 minutes.

For a project repository, the address normally has the form `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`. Use the actual link GitHub displays. GitHub Free supports Pages from public repositories; other repository visibility options depend on your plan.

## Quick checks

- **Only a ZIP appears:** extract locally and upload the website contents.
- **“Too many files”:** upload one folder per batch, as above.
- **A size error persists:** check that you selected the optimized files from this package, rather than the original source PDFs or the earlier large archive.
- **404 page:** confirm that `index.html` is at the publishing root and that Pages uses the correct branch and `/(root)`.
- **Images missing:** check that all six folders were uploaded with their original names, then reload after deployment finishes.
- **Old design still appears:** hard-refresh the browser after the deployment completes.

## Official GitHub guidance

Checked 3 October 2026:

- [Adding a file to a repository — file and batch limits](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)
- [About large files on GitHub](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github)
- [Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [Configuring a publishing source for GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
