import { describe, it, expect } from 'vitest';
import './app-shell.js'; // Ensure the component is defined

describe('AppShell Component', () => {
  it('should be defined in customElements', () => {
    const el = window.customElements.get('app-shell');
    expect(el).toBeDefined();
  });

  it('should render basic structure', async () => {
    document.body.innerHTML = '<app-shell></app-shell>';
    const appShellElement = document.body.querySelector('app-shell');
    // Wait for component to connect and render
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(appShellElement).not.toBeNull();
    const header = appShellElement.shadowRoot ? appShellElement.shadowRoot.querySelector('header') : appShellElement.querySelector('header');
    expect(header).not.toBeNull();
    expect(header.textContent).toContain('Dynamic Systems Modeler');
  });

  it('should render a footer element', async () => {
    document.body.innerHTML = '<app-shell></app-shell>';
    const appShellElement = document.body.querySelector('app-shell');
    await new Promise(resolve => setTimeout(resolve, 0)); // Wait for potential async rendering

    const footer = appShellElement.shadowRoot ? appShellElement.shadowRoot.querySelector('footer') : appShellElement.querySelector('footer');
    expect(footer).not.toBeNull();
  });
});
