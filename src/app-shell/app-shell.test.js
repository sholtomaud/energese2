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
    // Wait for component to connect and render its innerHTML
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(appShellElement).not.toBeNull();
    // app-shell does not use Shadow DOM, so direct query is fine.
    const header = appShellElement.querySelector('header');
    expect(header).not.toBeNull();
    const h1 = header.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1.textContent).toContain('DSM'); // Updated title check

    // Check for other structural elements
    const contentWrapper = appShellElement.querySelector('.content-wrapper');
    expect(contentWrapper).not.toBeNull();
    const nav = contentWrapper.querySelector('nav');
    expect(nav).not.toBeNull();
    expect(nav.querySelector('symbol-library')).not.toBeNull();
    const main = contentWrapper.querySelector('main');
    expect(main).not.toBeNull();
    expect(main.querySelector('canvas-workspace')).not.toBeNull();
  });

  it('should render a footer element with updated text', async () => {
    document.body.innerHTML = '<app-shell></app-shell>';
    const appShellElement = document.body.querySelector('app-shell');
    await new Promise(resolve => setTimeout(resolve, 0));

    const footer = appShellElement.querySelector('footer');
    expect(footer).not.toBeNull();
    const pElement = footer.querySelector('p#route-info'); // Specific p element
    expect(pElement).not.toBeNull();
    expect(pElement.textContent).toContain('Status: Ready'); // Updated footer text check
  });
});
