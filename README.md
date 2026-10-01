# ODE custom app template

A minimal, runnable starting point for a **custom app** on the [Open Data Ensemble (ODE)](https://opendataensemble.org/) platform. It includes the example form `my_first_form` with skip logic and translations, and context documents for AI assistants and developers.

---

## What is a custom app?

A **custom app** is your own **HTML, CSS, and JavaScript** (bundled into a zip) that runs inside the **Formulus** mobile app. It uses the **Formulus JavaScript API** to open forms, read/write observations, and access device features (camera, GPS, etc.). Forms are defined with **JSON Schema** and **JSON Forms** (ODE’s UI rules) on the [documentation site](https://opendataensemble.org/docs/).

---

## Quick start

1. **Create your own repository from this template.** Click **Use this template** on GitHub, or run:
   ```sh
   gh repo create my-ode-app --template OpenDataEnsemble/custom_app --private --clone
   ```
2. **Build** (requires [Node.js](https://nodejs.org/) 22.12+ or 20.19+):
   ```sh
   npm install
   npm run build
   ```
   The complete app is written to **`dist/`**: `index.html`, assets, `formulus-load.js`, and `forms/`.
3. **Open it in ODE Desktop:** create a profile in developer mode pointing at `dist/`. Either use Workbench → Bundles → Developer mode, or run:
   ```sh
   ode profiles create --label "My ODE app" --source dist
   ```
   Then select the profile in ODE Desktop and try the app (Workbench → Custom app) and the form (Workbench → Form preview).

Rebuild after every change (`npm run build`), then press **Refresh app** in ODE Desktop.

---

## Layout

| Path                    | What it is                                                                                      |
| ----------------------- | ----------------------------------------------------------------------------------------------- |
| `forms/<form_type>/`    | Form definitions: `schema.json` + `ui.json`. The folder name is the form type. **Edit these.**  |
| `src/`, `index.html`    | The app's code. **Edit these.** Plain JavaScript with [Vite](https://vite.dev/); any framework works. |
| `public/`               | Copied to `dist/` unchanged. Contains `formulus-load.js`, which provides `window.getFormulus()`. |
| `dist/`                 | Build output. This is what ODE Desktop loads and what gets published. **Never edit it.**        |
| `AGENTS.md`, `CONTEXT_*.md` | Context for AI assistants: rules for forms, the Formulus API, and bundles.                  |

Scripts:

- `npm run build`: production build to `dist/`. Forms are copied to `dist/forms/`.
- `npm run dev`: Vite dev server for working on the UI in a browser. The Formulus API is only available inside ODE Desktop or Formulus, so the page shows a notice there.

---

## Working on forms

- Follow [Form specifications](https://opendataensemble.org/docs/reference/form-specifications) and [Form design](https://opendataensemble.org/docs/guides/form-design).
- Bump the form's top-level `"version"` in `schema.json` on every change.
- Validate before previewing or publishing:
  ```sh
  ode forms validate forms
  ```
  The `ode` command ships with ODE Desktop. AI assistants can run `ode skills show ode-edit-form` for the full workflow.

## Publishing

From ODE Desktop, use Workbench → Custom app → **Update server**, or run `ode app push` (with the permission enabled in Desktop → Profiles → Local tools). See also [App bundles](https://opendataensemble.org/docs/using/app-bundles) and the [Synkronus CLI](https://opendataensemble.org/docs/reference/synkronus-cli) for scripted uploads.

---

## Context files

| File                                                   | Purpose                                                                       |
| ------------------------------------------------------ | ----------------------------------------------------------------------------- |
| [AGENTS.md](AGENTS.md)                                 | How AI assistants should behave: project workflow, scope, do/don't, and links to official docs. |
| [CONTEXT_ODE_FORMS.md](CONTEXT_ODE_FORMS.md)           | ODE form definitions: schema, UI schema, extensions, `format` types.          |
| [CONTEXT_FORMULUS_API.md](CONTEXT_FORMULUS_API.md)     | Summarized **Formulus** injected API (see version note; canonical source on GitHub). |
| [CONTEXT_BUNDLE_AND_CI.md](CONTEXT_BUNDLE_AND_CI.md)   | Bundling, Synkronus CLI, and optional CI patterns.                            |
| [examples/README.md](examples/README.md)               | Where to find **public** tutorials and example repos (URLs only).             |

---

## Official documentation

- **Site:** [https://opendataensemble.org/docs/](https://opendataensemble.org/docs/)
- **Recommended starting points:**
  - [Custom applications](https://opendataensemble.org/docs/guides/custom-applications)
  - [Building custom apps](https://opendataensemble.org/docs/guides/building-custom-apps)
  - [Form specifications](https://opendataensemble.org/docs/reference/form-specifications)
  - [App bundle format](https://opendataensemble.org/docs/reference/app-bundle-format)
  - [Synkronus CLI](https://opendataensemble.org/docs/reference/synkronus-cli)

**Source code (API contract):** [FormulusInterfaceDefinition.ts](https://github.com/OpenDataEnsemble/ode/blob/main/formulus/src/webview/FormulusInterfaceDefinition.ts) in the `OpenDataEnsemble/ode` repository on GitHub. `public/formulus-load.js` is a copy of [`formulus/assets/webview/formulus-load.js`](https://github.com/OpenDataEnsemble/ode/blob/main/formulus/assets/webview/formulus-load.js).

---

## License

Unless otherwise noted in a separate `LICENSE` file, consider content here as documentation for the ODE ecosystem; refer to [Open Data Ensemble](https://opendataensemble.org/) for project licensing.
