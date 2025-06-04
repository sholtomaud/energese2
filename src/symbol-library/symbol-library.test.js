import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import SymbolLibrary from './symbol-library.js';

describe('SymbolLibrary Component', () => {
  let element;
  let container; // To append the element to, and clean up

  // Expected symbols data - this should match the component's internal data for verification
  const expectedSymbols = [
    { name: 'Source', svgIdentifier: 'circle cx="50" cy="50" r="40"' , fill: 'lightgreen' },
    { name: 'Storage', svgIdentifier: 'rect x="10" y="10" width="100" height="60"', fill: 'lightblue' },
    { name: 'Producer', svgIdentifier: 'path d="M70 10 H10 V70 H70 L100 40 Z"', fill: 'yellow' }
  ];

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    // Ensure the custom element is defined for each test context
    if (!customElements.get('symbol-library')) {
      customElements.define('symbol-library', SymbolLibrary);
    }
    element = document.createElement('symbol-library');
    container.appendChild(element);
  });

  afterEach(() => {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
    element = null;
    container = null;
  });

  it('should render a list of SVG symbols', () => {
    const ulElement = element.querySelector('ul.symbol-list');
    expect(ulElement).not.toBeNull();

    const liElements = ulElement.querySelectorAll('li');
    expect(liElements.length).toBe(expectedSymbols.length);

    liElements.forEach((li, index) => {
      const expectedSymbol = expectedSymbols[index];

      // Check dataset attribute
      expect(li.dataset.symbolName).toBe(expectedSymbol.name);

      // Check for SVG presence
      const svgElement = li.querySelector('svg');
      expect(svgElement).not.toBeNull();

      // Check for some unique part of the SVG structure or attributes
      // This makes the test more robust than checking the entire SVG string
      expect(svgElement.innerHTML).toContain(expectedSymbol.svgIdentifier);

      // Optionally, check fill color of a primary element if applicable and easily selectable
      const primaryShape = svgElement.querySelector('[fill]'); // Get the first element with a fill
      if (primaryShape) {
        expect(primaryShape.getAttribute('fill')).toBe(expectedSymbol.fill);
      }

      // Check for the text element inside SVG (if applicable, like in these examples)
      const textElement = svgElement.querySelector('text');
      expect(textElement).not.toBeNull();
      if (textElement) {
        expect(textElement.textContent).toBe(expectedSymbol.name);
      }
    });
  });

  it('should have appropriate styling for the symbol list and items', () => {
    const styleTag = element.querySelector('style');
    expect(styleTag).not.toBeNull();

    if (styleTag) {
      const styles = styleTag.textContent;
      // General styles from previous implementation
      expect(styles).toContain('ul.symbol-list {');
      expect(styles).toContain('list-style-type: none;');
      expect(styles).toContain('padding: 0;');
      expect(styles).toContain('margin: 0;');

      // Styles for list items
      expect(styles).toContain('ul.symbol-list li {');
      expect(styles).toContain('cursor: grab;');
      expect(styles).toContain('border: 1px solid #eee;'); // Updated border
      expect(styles).toContain('background-color: #f9f9f9;'); // Updated background

      // Flex styles for layout
      expect(styles).toContain('display: flex;');
      expect(styles).toContain('flex-wrap: wrap;');
      expect(styles).toContain('justify-content: center;'); // For ul
      expect(styles).toContain('align-items: center;'); // For li

      // SVG specific styles
      expect(styles).toContain('ul.symbol-list li svg {');
      expect(styles).toContain('display: block;');
      expect(styles).toContain('margin: 0 auto;');

      // Host and H2 styles
      expect(styles).toContain(':host {');
      expect(styles).toContain('h2 {');
    }
  });

  it('should be registered as a custom element', () => {
    const el = document.createElement('symbol-library');
    expect(el).toBeInstanceOf(SymbolLibrary);

    const Ctor = customElements.get('symbol-library');
    expect(Ctor).toBeDefined();
    expect(Ctor).toBe(SymbolLibrary);
    expect(el).toBeInstanceOf(Ctor);
  });
});

describe('SymbolLibrary Drag Functionality', () => {
  let element;
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    // Ensure the custom element is defined for each test context
    if (!customElements.get('symbol-library')) {
      customElements.define('symbol-library', SymbolLibrary);
    }
    element = document.createElement('symbol-library');
    container.appendChild(element);
  });

  afterEach(() => {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
    element = null;
    container = null;
  });

  it('should have draggable="true" attribute on symbol list items', () => {
    const liElements = element.querySelectorAll('ul.symbol-list li');
    expect(liElements.length).toBeGreaterThan(0); // Make sure there are items
    liElements.forEach(li => {
      expect(li.getAttribute('draggable')).toBe('true');
    });
  });

  it('should handle dragstart event correctly and set dataTransfer', () => {
    const symbolListItem = element.querySelector('ul.symbol-list li');
    expect(symbolListItem).not.toBeNull();

    const mockSetData = vi.fn();
    const mockDataTransfer = {
      setData: mockSetData,
      effectAllowed: '' // To check if it's set
    };

    // The component instance `element` has the `symbols` array.
    const symbolName = symbolListItem.dataset.symbolName;
    const expectedSymbolData = element.symbols.find(s => s.name === symbolName);
    expect(expectedSymbolData).toBeDefined();

    const dragEvent = new DragEvent('dragstart', {
      bubbles: true,
      cancelable: true,
      dataTransfer: mockDataTransfer
    });

    symbolListItem.dispatchEvent(dragEvent);

    expect(mockSetData).toHaveBeenCalledTimes(1);
    expect(mockSetData).toHaveBeenCalledWith(
      'application/json',
      JSON.stringify({ name: expectedSymbolData.name, svg: expectedSymbolData.svg })
    );

    expect(mockDataTransfer.effectAllowed).toBe('copy');
  });
});
