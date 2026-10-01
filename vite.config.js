import { cpSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const root = fileURLToPath(new URL('.', import.meta.url));

/**
 * Forms are edited in ./forms and copied to dist/forms, so dist/ is a complete app:
 * ODE Desktop developer mode points at dist/, and the published bundle uses the
 * nested app/forms/<form_type>/ layout.
 */
function copyForms() {
  return {
    name: 'ode-copy-forms',
    apply: 'build',
    closeBundle() {
      const src = `${root}forms`;
      if (existsSync(src)) {
        cpSync(src, `${root}dist/forms`, { recursive: true });
      }
    },
  };
}

export default defineConfig({
  // Relative URLs: the app is served from a local folder inside Formulus / ODE Desktop.
  base: './',
  plugins: [copyForms()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2020',
  },
});
