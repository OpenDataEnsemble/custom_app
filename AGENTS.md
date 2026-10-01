# Custom applications for ODE — AI assistant guide

**Audience:** This file is for **AI coding assistants** and **human developers** building **custom apps** for [Formulus](https://opendataensemble.org/docs/reference/formulus). It assumes **no** local clone of the ODE monorepo or private example apps.

---

## This project

This repository was created from the ODE custom app template. It is a runnable app:

| Path                 | Role                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------ |
| `forms/<form_type>/` | `schema.json` + `ui.json` per form; the folder name is the form type. **Edit here.**      |
| `src/`, `index.html` | App code (plain JavaScript + Vite). **Edit here.**                                         |
| `public/`            | Copied to `dist/` unchanged; `formulus-load.js` provides `window.getFormulus()`.           |
| `dist/`              | Build output that ODE Desktop loads and publishes. **Never edit; rebuild instead.**        |

### Workflow

1. Edit `forms/` or `src/`.
2. For form changes:
   - Bump the form's top-level `"version"` in `schema.json`.
   - Never rename or delete fields that may already have data, and never reuse a choice code with a new meaning.
3. Build with `npm run build` (Node.js 22.12+ or 20.19+; run `npm install` once first).
4. Validate with `ode forms validate dist/forms` and fix every error. `ode` ships with ODE Desktop. Run `ode --help` for all commands, and `ode skills show ode-edit-form` for the full edit → preview → publish workflow.
5. Preview: ODE Desktop developer mode points at `dist/`. Run `ode app dev on --profile <id>`, or ask the user to press **Refresh app** in Desktop.
6. Publish only after the user explicitly confirms (`ode app push`).

The example form `forms/household_visit/` shows the basics:

- coded choices (`$defs` + `oneOf`);
- skip logic on a question and on a whole page (`rule` with `SHOW`);
- Portuguese translations (`translations` in `ui.json`, including choice labels via `options.oneOf`).

---

## Official references (use these in answers)

- **Documentation:** [https://opendataensemble.org/docs/](https://opendataensemble.org/docs/)
- **Formulus ↔ WebView API (source of truth):** [FormulusInterfaceDefinition.ts](https://github.com/OpenDataEnsemble/ode/blob/main/formulus/src/webview/FormulusInterfaceDefinition.ts) in the `OpenDataEnsemble/ode` repository.
- **JSON Forms (upstream standard):** [jsonforms.io](https://jsonforms.io/). Use it together with the ODE-specific rules in [Form specifications](https://opendataensemble.org/docs/reference/form-specifications).

Don't cite paths on the user's disk, `../`, or unpublished repos. Prefer **opendataensemble.org** and **github.com/OpenDataEnsemble** links.

---

## What you are building

A **custom app** is deployed as an **app bundle** (zip) and runs in a **WebView** inside Formulus. The runtime contract is **static web assets** (HTML, JS, CSS) plus **form definitions** (JSON), not a particular SPA framework.

### Stack freedom

Authors may use **plain HTML**, **Vite**, **React**, **Vue**, **Svelte**, or any other toolchain, **if** the **production output** can be packaged as required by the [app bundle format](https://opendataensemble.org/docs/reference/app-bundle-format). This template uses plain JavaScript and Vite; replacing `src/` with a framework is fine.

Keep these when you do:

- `base: './'`, so URLs are relative.
- `formulus-load.js` loaded as a classic script.
- The forms copy into `dist/forms`.

---

## What to do

- Follow **[Form specifications](https://opendataensemble.org/docs/reference/form-specifications)** for `schema.json` / `ui.json` (JSON Schema draft-07 and ODE UI rules).
- Load the **Formulus** API via the documented **`formulus-load.js`** / **`getFormulus()`** pattern (see [App bundle format](https://opendataensemble.org/docs/reference/app-bundle-format) and related guides).
- Use the **CONTEXT_*.md** files in this repo for condensed rules: [CONTEXT_ODE_FORMS.md](CONTEXT_ODE_FORMS.md), [CONTEXT_FORMULUS_API.md](CONTEXT_FORMULUS_API.md), and [CONTEXT_BUNDLE_AND_CI.md](CONTEXT_BUNDLE_AND_CI.md).
- For **extensions** (custom renderers, functions), see [Custom extensions](https://opendataensemble.org/docs/guides/custom-extensions).

---

## What not to do

- Do **not** edit the **Formulus** React Native app, the **Synkronus** server, or **formplayer** unless the user explicitly asked for **platform** development work in a **repository that contains that code**.
- Do **not** invent Synkronus or Formulus APIs that are not in the official **interface definition** or public docs.
- Do **not** assume unsupported JSON Forms features work on ODE. Stay within [Form specifications](https://opendataensemble.org/docs/reference/form-specifications) and test on device.
- Do **not** edit `dist/`, or ODE Desktop's workspace (`bundles/active`, `bundles/dev-local`).

---

## Related files in this repo

- [README.md](README.md): human overview, quick start, and link index.
- [CONTEXT_ODE_FORMS.md](CONTEXT_ODE_FORMS.md): forms and UI schema profile.
- [CONTEXT_FORMULUS_API.md](CONTEXT_FORMULUS_API.md): injected API summary (versioned).
- [CONTEXT_BUNDLE_AND_CI.md](CONTEXT_BUNDLE_AND_CI.md): bundles and CLI.
- [examples/README.md](examples/README.md): public examples (URLs only).
