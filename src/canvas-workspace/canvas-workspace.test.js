import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './canvas-workspace.js'; // Adjust path as necessary if component is in a different directory

describe('CanvasWorkspace', () => {
  let element;
  let container;

  beforeEach(() => {
    // Create a container for the element to be appended to
    container = document.createElement('div');
    document.body.appendChild(container);

    element = document.createElement('canvas-workspace');
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

  it('should be defined as a custom element', () => {
    const Ctor = customElements.get('canvas-workspace');
    expect(Ctor).toBeDefined();
    expect(element).toBeInstanceOf(Ctor);
    // Also check it's not a generic HTMLUnknownElement
    expect(element).not.toBeInstanceOf(HTMLUnknownElement);
  });

  it('should have a shadowRoot', () => {
    expect(element.shadowRoot).toBeDefined();
    expect(element.shadowRoot).not.toBeNull();
  });

  it('should have an SVG element in its shadow DOM', () => {
    // Ensure shadowRoot is present before querying
    expect(element.shadowRoot).toBeDefined();
    const svgElement = element.shadowRoot.querySelector('svg');
    expect(svgElement).not.toBeNull();
    expect(svgElement).toBeInstanceOf(SVGElement);
  });

  it('should have the id "canvas-svg" for the svg element', () => {
    expect(element.shadowRoot).toBeDefined();
    const svgElement = element.shadowRoot.querySelector('svg#canvas-svg');
    expect(svgElement).not.toBeNull();
    // Check if the id attribute is indeed 'canvas-svg'
    expect(svgElement.getAttribute('id')).toBe('canvas-svg');
  });

  it('should have width and height attributes set to 100% on the svg element', () => {
    expect(element.shadowRoot).toBeDefined();
    const svgElement = element.shadowRoot.querySelector('svg#canvas-svg');
    expect(svgElement).not.toBeNull();
    expect(svgElement.getAttribute('width')).toBe('100%');
    expect(svgElement.getAttribute('height')).toBe('100%');
  });
});
