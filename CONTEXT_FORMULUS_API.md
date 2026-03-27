# Formulus injected API (WebView)

**Canonical source (TypeScript):** [FormulusInterfaceDefinition.ts](https://github.com/OpenDataEnsemble/ode/blob/main/formulus/src/webview/FormulusInterfaceDefinition.ts) in **`OpenDataEnsemble/ode`**.

**Interface version constant:** `FORMULUS_INTERFACE_VERSION` in that file (string compare / semver-style checks may apply). If the file’s inline comment version and the constant differ, **trust the exported constant** and the **published** Formulus app release notes.

This document is a **summary** for AI assistants. Always verify method names and parameters against the **GitHub** file above when implementing or reviewing code.

---

## Accessing the API

Custom apps load the host-provided script and obtain the API through **`getFormulus()`** (see [App bundle format](https://opendataensemble.org/docs/reference/app-bundle-format) and [Custom applications](https://opendataensemble.org/docs/guides/custom-applications)). The injected object implements **`FormulusInterface`** (`window.formulus`).

---

## `FormInitData` (form player initialization)

When a form is opened, the host passes **`FormInitData`**, including:

- **`formType`** — Form identifier.
- **`observationId`** — Existing row id or `null` for create.
- **`params`** — Host parameters. **Prefill** fields with **`params.defaultData`** (plain object). Reserved top-level keys include **`defaultData`**, **`theme`**, **`darkMode`**, **`themeColors`** (and future allowlisted keys); do not rely on those keys being persisted on the observation. If `defaultData` is omitted, legacy behavior may copy other top-level keys as prefill (excluding reserved keys).
- **`savedData`** — Previously saved data for edit flows.
- Optional **`formSchema`**, **`uiSchema`**, **`extensions`**, **`customQuestionTypes`** — see the TypeScript file.

---

## `FormulusInterface` methods (summary)

| Area | Methods |
|------|---------|
| **Meta** | `getVersion()` |
| **Forms** | `getAvailableForms()`, `openFormplayer(formType, params, savedData)` |
| **Observations** | `getObservations(formType, isDraft?, includeDeleted?)`, `getObservationsByQuery({ formType, whereClause, ... })`, `submitObservation(formType, finalData)`, `updateObservation(observationId, formType, finalData)` |
| **Media / device** | `requestCamera`, `requestAudio`, `requestQrcode`, `requestFile`, `requestLocation`, `requestBiometric` |
| **Other native** | `launchIntent`, `callSubform`, `runLocalModel`, `requestConnectivityStatus`, `requestSyncStatus` |
| **User / UI** | `getCurrentUser()`, `getThemeMode()` |

Result types (**`FormCompletionResult`**, **`FormObservation`**, **`ActionResult`**, etc.) are defined in the same TypeScript module.

---

## Query helper

**`getObservationsByQuery`** supports a SQL-like **`whereClause`** string for filtering (e.g. for dynamic choice lists). Exact behavior is documented in the **JSDoc** in [FormulusInterfaceDefinition.ts](https://github.com/OpenDataEnsemble/ode/blob/main/formulus/src/webview/FormulusInterfaceDefinition.ts) and in [Dynamic choice lists](https://opendataensemble.org/docs/guides/dynamic-choice-lists).

---

## Compatibility

Use **`isCompatibleVersion`** / **`FORMULUS_INTERFACE_VERSION`** from the definition file if you ship a library that must assert a minimum API level.

---

## Related docs

- [Formplayer contract](https://opendataensemble.org/docs/reference/formplayer-contract) (reference on the docs site)
- [Formulus](https://opendataensemble.org/docs/reference/formulus)
