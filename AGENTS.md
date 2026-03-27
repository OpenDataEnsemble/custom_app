# Custom applications for ODE — AI assistant guide

**Audience:** This file is for **AI coding assistants** and **human developers** building **custom apps** for [Formulus](https://opendataensemble.org/docs/reference/formulus). It assumes **no** local clone of the ODE monorepo or private example apps.

---

## Official references (use these in answers)

- **Documentation:** [https://opendataensemble.org/docs/](https://opendataensemble.org/docs/)
- **Formulus ↔ WebView API (source of truth):** [FormulusInterfaceDefinition.ts](https://github.com/OpenDataEnsemble/ode/blob/main/formulus/src/webview/FormulusInterfaceDefinition.ts) in the `OpenDataEnsemble/ode` repository.
- **JSON Forms (upstream standard):** [jsonforms.io](https://jsonforms.io/) — use together with ODE-specific rules in [Form specifications](https://opendataensemble.org/docs/reference/form-specifications).

Do **not** cite paths on the user’s disk, `../`, or unpublished repos. Prefer **opendataensemble.org** and **github.com/OpenDataEnsemble** links.

---

## What you are building

A **custom app** is deployed as an **app bundle** (zip) and runs in a **WebView** inside Formulus. The runtime contract is **static web assets** (HTML, JS, CSS) plus **form definitions** (JSON), not a particular SPA framework.

### Stack freedom

Authors may use **plain HTML**, **Vite**, **React**, **Vue**, **Svelte**, or any other toolchain **if** the **production output** can be packaged as required by the [app bundle format](https://opendataensemble.org/docs/reference/app-bundle-format). Examples in the docs that use React or Vite are **not** mandatory.

---

## What to do

- Follow **[Form specifications](https://opendataensemble.org/docs/reference/form-specifications)** for `schema.json` / `ui.json` (JSON Schema draft-07 and ODE UI rules).
- Load the **Formulus** API via the documented **`formulus-load.js`** / **`getFormulus()`** pattern (see [App bundle format](https://opendataensemble.org/docs/reference/app-bundle-format) and related guides).
- Use **CONTEXT_*.md** in this repo for condensed rules: [CONTEXT_ODE_FORMS.md](CONTEXT_ODE_FORMS.md), [CONTEXT_FORMULUS_API.md](CONTEXT_FORMULUS_API.md), [CONTEXT_BUNDLE_AND_CI.md](CONTEXT_BUNDLE_AND_CI.md).
- For **extensions** (custom renderers, functions), see [Custom extensions](https://opendataensemble.org/docs/guides/custom-extensions).

---

## What not to do

- Do **not** edit the **Formulus** React Native app, **Synkronus** server, or **formplayer** unless the user explicitly asked for **platform** development work in a **repository that contains that code**.
- Do **not** invent Synkronus or Formulus APIs that are not in the official **interface definition** or public docs.
- Do **not** assume unsupported JSON Forms features work on ODE; stay within [Form specifications](https://opendataensemble.org/docs/reference/form-specifications) and test on device.

---

## Related files in this repo

- [README.md](README.md) — human overview and link index.
- [CONTEXT_ODE_FORMS.md](CONTEXT_ODE_FORMS.md) — forms and UI schema profile.
- [CONTEXT_FORMULUS_API.md](CONTEXT_FORMULUS_API.md) — injected API summary (versioned).
- [CONTEXT_BUNDLE_AND_CI.md](CONTEXT_BUNDLE_AND_CI.md) — bundles and CLI.
- [examples/README.md](examples/README.md) — public examples (URLs only).
