import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import SymbolLibrary from './symbol-library.js';

describe('SymbolLibrary Component', () => {
  let element;
  let container; // To append the element to, and clean up

  beforeEach(() => {
    // Create a container and append it to the body
    container = document.createElement('div');
    document.body.appendChild(container);

    // Create the element and append it to the container
    element = new SymbolLibrary();
    container.appendChild(element);
  });

  afterEach(() => {
    // Remove the element from its container
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
    // Remove the container from the body
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
    element = null;
    container = null;
  });

  it('should render a list of symbols', () => {
    // Check for the presence of <ul>
    expect(element.innerHTML).toContain('<ul class="symbol-list">');

    // Check for the presence of <li> tags
    expect(element.innerHTML).toContain('<li>');

    // Check for placeholder symbols
    expect(element.innerHTML).toContain('Placeholder Symbol 1');
    expect(element.innerHTML).toContain('Placeholder Symbol 2');

    // Check specific structure if necessary
    const ulElement = element.querySelector('ul.symbol-list');
    expect(ulElement).not.toBeNull();
    if (ulElement) { // Check to satisfy TypeScript/linker if it were enabled
        expect(ulElement.children.length).toBe(2);
        expect(ulElement.children[0].textContent.trim()).toBe('Placeholder Symbol 1');
        expect(ulElement.children[1].textContent.trim()).toBe('Placeholder Symbol 2');
    }
  });

  it('should have basic styling applied for the list', () => {
    expect(element.innerHTML).toContain('<style>');
    // More specific checks for style content
    const styleTag = element.querySelector('style');
    expect(styleTag).not.toBeNull();
    if (styleTag) {
        expect(styleTag.textContent).toContain('list-style-type: none;');
        expect(styleTag.textContent).toContain('ul.symbol-list');
        expect(styleTag.textContent).toContain('padding: 0;');
        expect(styleTag.textContent).toContain('margin: 0;');
        expect(styleTag.textContent).toContain('background-color: #f0f0f0;');
        expect(styleTag.textContent).toContain('border: 1px solid #ccc;');
    }
  });

  it('should be registered as a custom element', () => {
    const el = document.createElement('symbol-library');
    expect(el).toBeInstanceOf(SymbolLibrary); // Check instance type

    // Or check via customElements.get
    const Ctor = customElements.get('symbol-library');
    expect(Ctor).toBeDefined();
    expect(Ctor).toBe(SymbolLibrary);
    expect(el).toBeInstanceOf(Ctor);
  });
});
