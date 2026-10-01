# ODE custom app — agent guide

Use this file when modifying this repository. It is for AI coding assistants and human developers building a custom app for [Open Data Ensemble (ODE)](https://opendataensemble.org/).

## Start here

This is a runnable custom app template. It does not require an ODE monorepo checkout.

| Path | Purpose |
| --- | --- |
| `forms/<form_type>/` | Form definitions: `schema.json` and `ui.json`. The folder name is the stable form type. Edit these files. |
| `src/`, `index.html` | Custom app code. Edit these files. |
| `public/formulus-load.js` | Loads the host-provided Formulus bridge. Keep it as a classic script. |
| `dist/` | Complete build output loaded by ODE Desktop and published to devices. Never edit it directly. |
| `CONTEXT_*.md` | More detailed offline notes about forms, the bridge API, and bundles. |

Typical workflow:

1. Understand the requested change and inspect the relevant source files.
2. Edit `forms/` and/or `src/`. Never edit `dist/`.
3. Bump a changed form's top-level `version` in `schema.json`.
4. Run `npm run build`.
5. Run `ode forms validate dist/forms` and fix every error.
6. Refresh developer mode with `ode app dev on --profile <id>`, then ask the user to preview the app or form in ODE Desktop.
7. Run `ode app push --profile <id>` for a dry run. Publish only after explicit user confirmation and only when the profile grants push access.

For guided workflows, run `ode skills list`, `ode skills show ode-edit-form`, or `ode skills show ode-new-project`.

## How ODE fits together

```text
Custom app (this repository, HTML/JS/CSS)
  └─ runs in a WebView hosted by Formulus
       ├─ calls the injected Formulus JavaScript bridge
       └─ opens Formplayer for schema-driven forms
            └─ reads forms/<form_type>/{schema.json,ui.json}

ODE Desktop
  ├─ previews the custom app and forms
  ├─ manages profiles, developer mode, exports, and agent permissions
  └─ builds/publishes the app bundle

Synkronus
  ├─ distributes app bundles and forms
  └─ synchronizes observations and attachments
```

- **Formulus** is the offline-first mobile host. It owns profiles, native device capabilities, observation storage, attachments, and synchronization.
- **Formplayer** is the schema-driven form UI hosted inside Formulus or ODE Desktop. A custom app normally launches it with `openFormplayer()` rather than implementing form rendering itself.
- **A custom app** is navigation and project-specific workflow around forms. It runs inside Formulus and accesses native functionality only through the public bridge.
- **ODE Desktop** is the local workbench and the authority for agent permissions. Developer mode mirrors this project's `dist/` folder for previewing.
- **Synkronus** is the shared server. Collection remains usable offline; synchronization happens when connectivity is available.

Observations and attachment binaries are managed by the host, not by this app's browser storage. Do not invent direct SQLite, filesystem, or Synkronus access from the WebView.

## Forms and Formplayer

Each `forms/<form_type>/` directory contains:

- `schema.json`: JSON Schema draft-07 data shape, validation, field titles, coded choices, and a top-level `version`.
- `ui.json`: UI order, pages/groups, labels, translations, controls, and JSON Forms rules.

The example `forms/my_first_form/` demonstrates coded choices, required fields, Portuguese translations, and question/page-level skip logic.

Rules and compatibility:

- Treat the form type and existing field names/choice codes as durable data contracts.
- Never rename or remove a field that may have collected data, and never reuse a choice code with a different meaning. Add a new field/code instead.
- Bump `version` whenever a form changes.
- Keep UI `scope` values aligned with schema properties.
- Implement skip logic with JSON Forms `rule` objects. A condition uses a field `scope` and JSON Schema such as `{ "const": "1" }`.
- Do not make conditionally hidden questions required.
- Update every locale when changing user-facing text.
- A `linkedForm` must refer to another form included in the bundle.
- Use only ODE-documented formats and controls; upstream JSON Forms features are not automatically supported.

Canonical references:

- [Form specifications](https://opendataensemble.org/docs/reference/form-specifications)
- [Form design](https://opendataensemble.org/docs/guides/form-design)
- [Custom extensions](https://opendataensemble.org/docs/guides/custom-extensions)
- [JSON Forms](https://jsonforms.io/), subject to ODE's documented profile

## Formulus bridge

Load `public/formulus-load.js` from `index.html`, then acquire the bridge asynchronously:

```js
const formulus = await window.getFormulus();
```

The bridge is available only inside Formulus or ODE Desktop. Browser development should degrade gracefully when `getFormulus()` cannot connect.

Common operations include:

| Need | API |
| --- | --- |
| Identify the host/profile | `getVersion()`, `getProfileId()` |
| List and open forms | `getAvailableForms()`, `openFormplayer()` |
| Read observations | `getObservations()`, `getObservationsByQuery()` |
| Headless create/update | `persistObservation()` |
| Profile-scoped browser state | `getLocalStorageRef()` |
| Attachments and bundle paths | `getAttachmentUri()`, `getAttachmentsUri()`, `getCustomAppUri()`, `getFormSpecsUri()` |
| Native capture | `requestCamera()`, `requestAudio()`, `requestVideo()`, `requestFile()`, `requestLocation()`, `requestQrcode()` |
| Connectivity and sync | `getConnectivityStatus()`, `sync()`, `getCurrentDataRevisionCount()` |
| User/theme | `getCurrentUser()`, `getThemeMode()` |

Important boundaries:

- Verify exact signatures and result types against the canonical interface before coding. Do not infer APIs from method names.
- Pass prefill values to `openFormplayer()` under `params.defaultData`; session options such as `skipFinalize` and `skipDraftSelection` belong in its fourth argument.
- Prefer `openFormplayer()` for user-entered data. Use `persistObservation()` only when the app intentionally performs a validated headless write.
- Attachment values persisted in observations are host-managed basenames/metadata. Resolve display URLs with `getAttachmentUri()`; do not persist temporary URIs.
- The app is offline-first. Treat connectivity as optional and handle bridge rejections without losing user work.

Canonical source of truth:

- [`FormulusInterfaceDefinition.ts`](https://github.com/OpenDataEnsemble/ode/blob/main/formulus/src/webview/FormulusInterfaceDefinition.ts)
- [Formplayer contract](https://opendataensemble.org/docs/reference/formplayer-contract)
- [Custom applications](https://opendataensemble.org/docs/guides/custom-applications)

`CONTEXT_FORMULUS_API.md` is a convenience summary, not the contract. When it disagrees with the TypeScript interface, follow the interface.

## Build and bundle constraints

This template uses plain JavaScript and Vite, but another framework is fine if the production output remains a valid ODE app bundle.

Keep these invariants:

- `npm run build` produces a self-contained `dist/` with `index.html`, assets, `formulus-load.js`, and `forms/`.
- Vite uses `base: './'` so assets work from a WebView file URL.
- Never hand-edit generated files in `dist/`.
- Never edit ODE Desktop's managed `bundles/active` or `bundles/dev-local` folders.
- Never expose credentials or add direct authenticated Synkronus calls when the bridge or ODE tooling provides the operation.

See [App bundle format](https://opendataensemble.org/docs/reference/app-bundle-format) and `CONTEXT_BUNDLE_AND_CI.md`.

## Scope and safety

- Make focused changes consistent with the existing plain-JavaScript scaffold.
- Do not modify Formulus, Formplayer, Synkronus, or ODE Desktop unless the user explicitly asks for platform work in the corresponding repository.
- Do not publish an app bundle without explicit confirmation. Publishing reaches devices on their next sync.
- Do not send observations or attachments to remote services without explicit authorization.
- Prefer public links on `opendataensemble.org` and `github.com/OpenDataEnsemble`; do not cite paths on the user's machine.
