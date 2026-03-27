# App bundles, Synkronus CLI, and CI

**Official references:**

- [App bundle format](https://opendataensemble.org/docs/reference/app-bundle-format)
- [App bundles (user guide)](https://opendataensemble.org/docs/using/app-bundles)
- [Synkronus CLI](https://opendataensemble.org/docs/reference/synkronus-cli)
- [Deployment](https://opendataensemble.org/docs/guides/deployment)

---

## What you ship

A **custom app** is packaged as a **ZIP** archive that includes at least:

- An **entry HTML** file (e.g. `index.html`) referenced by **`manifest.json`**
- **`manifest.json`** — name, version, `entryPoint`, etc. (see [App bundle format](https://opendataensemble.org/docs/reference/app-bundle-format))
- **Assets** — JavaScript, CSS, images, **`formulus-load.js`** (or equivalent per docs), and your compiled bundles
- **`forms/`** — Form definitions (`schema.json`, `ui.json`, manifests as required by your project)

Exact folder layout may vary slightly by tutorial; always align with **[App bundle format](https://opendataensemble.org/docs/reference/app-bundle-format)** and the version of Synkronus you deploy against.

---

## Uploading and versioning

Administrators (or automation) upload bundles to **Synkronus**. The **Synkronus CLI** documents login, bundle upload, listing versions, and related workflows:

- [Synkronus CLI](https://opendataensemble.org/docs/reference/synkronus-cli)

Configuration file locations and `synk` subcommands are described there — **do not** invent flags; use the published CLI reference.

---

## CI / automation (generic)

You can automate **linting**, **form validation**, **building** static assets, and **zipping** the bundle in any CI system (GitHub Actions, GitLab CI, Jenkins, etc.). Patterns depend on your stack:

- **Build** your web app with your toolchain (npm, pnpm, bun, etc.) so the output directory matches what you put in the zip.
- **Validate** JSON schemas against draft-07 and project rules (custom scripts or validators — keep them in your repo).
- **Package** the zip with the structure required by the [App bundle format](https://opendataensemble.org/docs/reference/app-bundle-format).
- **Upload** with **`synk`** in a secured pipeline (store credentials as CI secrets).

There is **no single mandatory** GitHub Actions workflow; choose what fits your org. Public examples may appear under [github.com/OpenDataEnsemble](https://github.com/OpenDataEnsemble) from time to time — treat them as **examples**, not guarantees.

---

## Server and sync context

- **Synkronus** hosts bundles and serves them to clients during sync. Deployment topics: [Deployment](https://opendataensemble.org/docs/guides/deployment), [Synkronus server](https://opendataensemble.org/docs/reference/synkronus-server).

---

## Related

- [Custom applications](https://opendataensemble.org/docs/guides/custom-applications)
- [REST API — app bundle](https://opendataensemble.org/docs/reference/rest-api/app-bundle) (if linked from the docs index)
