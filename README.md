# ODE custom app — template context

This repository holds **documentation for AI assistants and developers** who build **custom applications** for the [Open Data Ensemble (ODE)](https://opendataensemble.org/) platform. It does **not** need to be installed as a dependency or copied into your project.

You do **not** need the [ODE platform monorepo](https://github.com/OpenDataEnsemble/ode) on your machine to use these guides. Everything is written to stand alone and link to **official** references only.

---

## What is a custom app?

A **custom app** is your own **HTML, CSS, and JavaScript** (bundled into a zip) that runs inside the **Formulus** mobile app. It uses the **Formulus JavaScript API** to open forms, read/write observations, and access device features (camera, GPS, etc.). Forms are defined with **JSON Schema** and **JSON Forms** (ODE’s UI rules) on the [documentation site](https://opendataensemble.org/docs/).

---

## Stack freedom

You may use **any** toolchain or framework you prefer **as long as the build output** is suitable for packaging: static **HTML, JS, and CSS** (plus images, JSON, etc.) as described in the [app bundle format](https://opendataensemble.org/docs/reference/app-bundle-format). Examples in official docs (e.g. React, Vite) are **illustrative**, not requirements.

---

## Files in this repo

| File | Purpose |
|------|---------|
| [AGENTS.md](AGENTS.md) | How AI assistants should behave: scope, do/don’t, links to official docs. |
| [CONTEXT_ODE_FORMS.md](CONTEXT_ODE_FORMS.md) | ODE form definitions: schema, UI schema, extensions, `format` types. |
| [CONTEXT_FORMULUS_API.md](CONTEXT_FORMULUS_API.md) | Summarized **Formulus** injected API (see version note; canonical source on GitHub). |
| [CONTEXT_BUNDLE_AND_CI.md](CONTEXT_BUNDLE_AND_CI.md) | Bundling, Synkronus CLI, and optional CI patterns. |
| [examples/README.md](examples/README.md) | Where to find **public** tutorials and example repos (URLs only). |

---

## Official documentation

- **Site:** [https://opendataensemble.org/docs/](https://opendataensemble.org/docs/)
- **Recommended starting points:** [Custom applications](https://opendataensemble.org/docs/guides/custom-applications), [Building custom apps](https://opendataensemble.org/docs/guides/building-custom-apps), [Form specifications](https://opendataensemble.org/docs/reference/form-specifications), [App bundle format](https://opendataensemble.org/docs/reference/app-bundle-format), [Synkronus CLI](https://opendataensemble.org/docs/reference/synkronus-cli).

**Source code (API contract):** [FormulusInterfaceDefinition.ts](https://github.com/OpenDataEnsemble/ode/blob/main/formulus/src/webview/FormulusInterfaceDefinition.ts) in the `OpenDataEnsemble/ode` repository on GitHub.

---

## License

Unless otherwise noted in a separate `LICENSE` file, consider content here as documentation for the ODE ecosystem; refer to [Open Data Ensemble](https://opendataensemble.org/) for project licensing.
