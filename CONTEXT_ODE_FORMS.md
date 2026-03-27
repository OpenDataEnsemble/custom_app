# ODE forms profile (JSON Schema + UI)

**Canonical public spec:** [Form specifications](https://opendataensemble.org/docs/reference/form-specifications) on [opendataensemble.org](https://opendataensemble.org/docs/).

This summary is for **AI assistants** and **offline** reference. When in doubt, follow the live documentation site.

---

## Two files per form

Each form type is usually defined by:

- **`schema.json`** — [JSON Schema](https://json-schema.org/) (draft **07** in ODE docs). Describes data shape, validation, and **question types** via `type`, `format`, `enum`, etc.
- **`ui.json`** — [JSON Forms](https://jsonforms.io/) **UI schema** (layouts, `Control` elements, `scope`, rules). ODE uses standard layout types plus project conventions described in the [documentation](https://opendataensemble.org/docs/reference/form-specifications).

Cross-file consistency: every `scope` in the UI should reference a valid path in the schema.

---

## ODE-specific `format` values

Many field types are selected with JSON Schema **`format`** (and matching UI options). The authoritative list and examples are in:

- [Form specifications — Question types](https://opendataensemble.org/docs/reference/form-specifications)

Typical categories include **text**, **numeric**, **date/time**, **selection**, **multimedia** (photo, audio, video, signature, GPS, QR, file), etc. **Do not** assume a `format` works if it is not documented for ODE.

---

## Layouts and rules

- Layouts: **VerticalLayout**, **HorizontalLayout**, **Group**, **Categorization**, etc. — see [Form specifications](https://opendataensemble.org/docs/reference/form-specifications).
- **Conditional visibility** uses **rules** (`effect`, `condition`, `scope`) as documented there.

---

## Extensions and dynamic data

- **Custom extensions** (extra renderers, functions, schemas): [Custom extensions](https://opendataensemble.org/docs/guides/custom-extensions).
- **Dynamic choice lists** (populating choices from other data): [Dynamic choice lists](https://opendataensemble.org/docs/guides/dynamic-choice-lists).

---

## App-level `ext.json` and manifests

Projects often use an **extensions manifest** (`ext.json` or equivalent) to register custom renderers and helpers. Structure and behavior are documented under [Custom extensions](https://opendataensemble.org/docs/guides/custom-extensions) and related guides.

---

## Further reading

- [Custom applications](https://opendataensemble.org/docs/guides/custom-applications)
- [Building custom apps](https://opendataensemble.org/docs/guides/building-custom-apps), [v1](https://opendataensemble.org/docs/guides/building-custom-apps-v1), [v2](https://opendataensemble.org/docs/guides/building-custom-apps-v2)
- [Form design](https://opendataensemble.org/docs/guides/form-design)
- [Configuration](https://opendataensemble.org/docs/guides/configuration)

---

## External standard

- **JSON Forms UI schema:** [jsonforms.io](https://jsonforms.io/) — ODE follows this with **documented** additions and limitations; always validate against ODE docs.
