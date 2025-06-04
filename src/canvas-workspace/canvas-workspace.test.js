import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import CanvasWorkspace from './canvas-workspace.js';

describe('CanvasWorkspace Component', () => {
  let element;
  let container; // To append the element to, and clean up

  beforeEach(() => {
    // Create a container and append it to the body
    container = document.createElement('div');
    document.body.appendChild(container);

    // Create the element and append it to the container
    element = new CanvasWorkspace();
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

  it('should render a placeholder for the canvas', () => {
    expect(element).not.toBeNull();

    const placeholderDiv = element.querySelector('div');
    expect(placeholderDiv).not.toBeNull();

    if (placeholderDiv) {
      // Assert content
      expect(placeholderDiv.textContent).toContain('Canvas Workspace Placeholder');

      // Assert styles more directly using Vitest's toHaveStyle or by checking style properties
      // For inline styles, direct property access is fine.
      // getComputedStyle is more robust for styles from stylesheets.
      expect(placeholderDiv.style.width).toBe('100%');
      expect(placeholderDiv.style.height).toBe('100%');
      expect(placeholderDiv.style.backgroundColor).toBe('rgb(240, 240, 240)'); // #f0f0f0
      expect(placeholderDiv.style.display).toBe('flex');
      expect(placeholderDiv.style.alignItems).toBe('center');
      expect(placeholderDiv.style.justifyContent).toBe('center');

      // Alternative: Check the style attribute string for multiple properties at once
      const styleAttribute = placeholderDiv.getAttribute('style');
      expect(styleAttribute).toContain('width:100%');
      expect(styleAttribute).toContain('height:100%');
      expect(styleAttribute).toContain('background-color: #f0f0f0');
      expect(styleAttribute).toContain('display:flex');
      expect(styleAttribute).toContain('align-items:center');
      expect(styleAttribute).toContain('justify-content:center');
    }
  });

  it('should be registered as a custom element canvas-workspace', () => {
    const el = document.createElement('canvas-workspace');
    expect(el).toBeInstanceOf(CanvasWorkspace); // Check instance type

    const Ctor = customElements.get('canvas-workspace');
    expect(Ctor).toBeDefined();
    expect(Ctor).toBe(CanvasWorkspace); // Check if the registered constructor is the imported class
    expect(el).toBeInstanceOf(Ctor); // Check if the created element is an instance of the registered constructor
  });
});
