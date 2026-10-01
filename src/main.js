// Starting point for an ODE custom app: lists the forms in the bundle with their
// observation counts, and opens a form in Formplayer. Replace freely.
//
// Formulus API reference (source of truth):
// https://github.com/OpenDataEnsemble/ode/blob/main/formulus/src/webview/FormulusInterfaceDefinition.ts
import './style.css';

const app = document.getElementById('app');

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  Object.assign(node, attrs);
  node.append(...children);
  return node;
}

function showMessage(text) {
  app.replaceChildren(el('h1', {}, 'My ODE app'), el('p', { className: 'message' }, text));
}

async function render(api, status = '') {
  const forms = await api.getAvailableForms();
  const rows = await Promise.all(
    forms.map(async form => {
      const observations = await api.getObservations(form.formType);
      const open = el('button', { type: 'button' }, 'New');
      open.addEventListener('click', async () => {
        const result = await api.openFormplayer(form.formType, {}, {});
        await render(api, `${form.name || form.formType}: ${result.status}`);
      });
      return el(
        'li',
        {},
        el('span', { className: 'name' }, form.name || form.formType),
        el('span', { className: 'count' }, `${observations.length} saved`),
        open,
      );
    }),
  );
  app.replaceChildren(
    el('h1', {}, 'My ODE app'),
    forms.length ? el('ul', { className: 'forms' }, ...rows) : el('p', {}, 'No forms in this bundle.'),
    el('p', { className: 'message' }, status),
  );
}

async function start() {
  let api;
  try {
    api = await window.getFormulus();
  } catch {
    showMessage(
      'The Formulus API is not available. Open this app in ODE Desktop (Workbench → Custom app) or in Formulus.',
    );
    return;
  }
  try {
    await render(api);
  } catch (error) {
    showMessage(`Something went wrong: ${error.message ?? error}`);
  }
}

start();
