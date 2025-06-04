// Add this at the start of the test file
if (typeof DragEvent === 'undefined') {
  global.DragEvent = class {
    constructor(type, options) {
      this.type = type;
      this.bubbles = options.bubbles || false;
      this.cancelable = options.cancelable || false;
      this.dataTransfer = options.dataTransfer || null;
      this.clientX = options.clientX || 0;
      this.clientY = options.clientY || 0;
      this.defaultPrevented = false;
    }
    preventDefault() {
      this.defaultPrevented = true;
    }
  };
}

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'; // Added vi
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
    // Ensure SVG and g elements are present after connectedCallback
    element.connectedCallback();
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
    // Vitest specific: clear any mocks or spies if used
    // vi.clearAllMocks();
  });

  // Helper function to dispatch mouse events
  const dispatchMouseEvent = (target, type, clientX, clientY) => {
    const event = new MouseEvent(type, {
      bubbles: true,
      cancelable: true,
      clientX: clientX,
      clientY: clientY,
    });
    target.dispatchEvent(event);
  };

  // Helper function to dispatch wheel events
  const dispatchWheelEvent = (target, deltaY, clientX, clientY) => {
    const event = new WheelEvent('wheel', {
      bubbles: true,
      cancelable: true,
      deltaY: deltaY,
      clientX: clientX,
      clientY: clientY,
    });
    target.dispatchEvent(event);
  };

  it('should be registered as a custom element canvas-workspace', () => {
    const el = document.createElement('canvas-workspace');
    expect(el).toBeInstanceOf(CanvasWorkspace);
    const Ctor = customElements.get('canvas-workspace');
    expect(Ctor).toBeDefined();
    expect(Ctor).toBe(CanvasWorkspace);
    expect(el).toBeInstanceOf(Ctor);
  });

  it('should have an SVG element with a group (g) child', () => {
    expect(element.svg).toBeInstanceOf(SVGElement);
    expect(element.g).toBeInstanceOf(SVGElement);
    expect(element.g.parentElement).toBe(element.svg);
  });

  it('should initialize with default transform values', () => {
    const transformString = element.g.getAttribute('transform');
    const values = transformString.match(/-?\d+(\.\d+)?/g).map(Number);
    expect(values[0]).toBeCloseTo(0, 2); // translateX
    expect(values[1]).toBeCloseTo(0, 2); // translateY
    expect(values[2]).toBeCloseTo(1, 2); // scale
  });

  describe('Pan Functionality', () => {
    it('should update transform on pan', () => {
      const svg = element.svg;
      // Mock getBoundingClientRect for SVG if necessary, though not strictly needed for transform logic
      // For this test, clientX/Y are sufficient as we are testing the delta.

      // Start panning
      dispatchMouseEvent(svg, 'mousedown', 100, 100);
      expect(element.isPanning).toBe(true);
      // Initial transform based on currentX/Y (0,0) and mouse (100,100)
      // startX = 100 - 0 = 100; startY = 100 - 0 = 100;

      // Move mouse
      dispatchMouseEvent(svg, 'mousemove', 150, 120);
      let transformString = element.g.getAttribute('transform');
      let values = transformString.match(/-?\d+(\.\d+)?/g).map(Number);
      expect(values[0]).toBeCloseTo(50, 2);
      expect(values[1]).toBeCloseTo(20, 2);
      expect(values[2]).toBeCloseTo(1, 2);

      // Move mouse again
      dispatchMouseEvent(svg, 'mousemove', 50, 80);
      transformString = element.g.getAttribute('transform');
      values = transformString.match(/-?\d+(\.\d+)?/g).map(Number);
      expect(values[0]).toBeCloseTo(-50, 2);
      expect(values[1]).toBeCloseTo(-80 + 60, 2); // -20, example of calculation if needed
      expect(values[2]).toBeCloseTo(1, 2);


      // Stop panning
      dispatchMouseEvent(svg, 'mouseup', 50, 80);
      expect(element.isPanning).toBe(false);
    });
  });

  describe('Zoom Functionality', () => {
    beforeEach(() => {
      // Mock getBoundingClientRect for the SVG element for accurate zoom centering
      // Vitest's happy-dom doesn't fully implement getBoundingClientRect for SVG elements in all contexts.
      // We need to provide a mock implementation.
      element.svg.getBoundingClientRect = () => ({
        left: 0,
        top: 0,
        width: 800, // Example width
        height: 600, // Example height
        right: 800,
        bottom: 600,
        x: 0,
        y: 0,
      });
    });

    it('should zoom in correctly, centered on mouse pointer', () => {
      const svg = element.svg;
      // Initial state: translate(0,0) scale(1)

      // Zoom in at (100,100)
      // mouseX = 100, mouseY = 100
      // currentX = 0, currentY = 0, currentScale = 1
      // zoomFactor = 1.1
      // newScale = 1 * 1.1 = 1.1
      // currentX = 100 - (100 - 0) * 1.1 = 100 - 110 = -10
      // currentY = 100 - (100 - 0) * 1.1 = 100 - 110 = -10
      dispatchWheelEvent(svg, -100, 100, 100); // deltaY < 0 for zoom in
      expect(element.currentScale).toBeCloseTo(1.1);
      expect(element.currentX).toBeCloseTo(-10, 2);
      expect(element.currentY).toBeCloseTo(-10, 2);
      let transformString = element.g.getAttribute('transform');
      let values = transformString.match(/-?\d+(\.\d+)?/g).map(Number);
      expect(values[0]).toBeCloseTo(-10, 2);
      expect(values[1]).toBeCloseTo(-10, 2);
      expect(values[2]).toBeCloseTo(1.1, 2);

      // Zoom in again at a different point (200,200)
      dispatchWheelEvent(svg, -100, 200, 200);
      expect(element.currentScale).toBeCloseTo(1.21, 2);
      expect(element.currentX).toBeCloseTo(-31, 2);
      expect(element.currentY).toBeCloseTo(-31, 2);
      transformString = element.g.getAttribute('transform');
      values = transformString.match(/-?\d+(\.\d+)?/g).map(Number);
      expect(values[0]).toBeCloseTo(-31, 2);
      expect(values[1]).toBeCloseTo(-31, 2);
      expect(values[2]).toBeCloseTo(1.21, 2);
    });

    it('should zoom out correctly, centered on mouse pointer', () => {
      const svg = element.svg;
      dispatchWheelEvent(svg, 100, 100, 100); // deltaY > 0 for zoom out
      expect(element.currentScale).toBeCloseTo(0.9, 2);
      expect(element.currentX).toBeCloseTo(10, 2);
      expect(element.currentY).toBeCloseTo(10, 2);
      let transformString = element.g.getAttribute('transform');
      let values = transformString.match(/-?\d+(\.\d+)?/g).map(Number);
      expect(values[0]).toBeCloseTo(10, 2);
      expect(values[1]).toBeCloseTo(10, 2);
      expect(values[2]).toBeCloseTo(0.9, 2);

      dispatchWheelEvent(svg, 100, 50, 50);
      expect(element.currentScale).toBeCloseTo(0.81, 2);
      expect(element.currentX).toBeCloseTo(14, 2);
      expect(element.currentY).toBeCloseTo(14, 2);
      transformString = element.g.getAttribute('transform');
      values = transformString.match(/-?\d+(\.\d+)?/g).map(Number);
      expect(values[0]).toBeCloseTo(14, 2);
      expect(values[1]).toBeCloseTo(14, 2);
      expect(values[2]).toBeCloseTo(0.81, 2);
    });

    it('should handle mixed pan and zoom operations', () => {
      const svg = element.svg;
      // 1. Pan
      dispatchMouseEvent(svg, 'mousedown', 100, 100);
      dispatchMouseEvent(svg, 'mousemove', 150, 130);
      dispatchMouseEvent(svg, 'mouseup', 150, 130);
      let transformString = element.g.getAttribute('transform');
      let values = transformString.match(/-?\d+(\.\d+)?/g).map(Number);
      expect(values[0]).toBeCloseTo(50, 2);
      expect(values[1]).toBeCloseTo(30, 2);
      expect(values[2]).toBeCloseTo(1, 2);

      // 2. Zoom In
      dispatchWheelEvent(svg, -100, 150, 130);
      expect(element.currentScale).toBeCloseTo(1.1, 2);
      expect(element.currentX).toBeCloseTo(40, 2);
      expect(element.currentY).toBeCloseTo(20, 2);
      transformString = element.g.getAttribute('transform');
      values = transformString.match(/-?\d+(\.\d+)?/g).map(Number);
      expect(values[0]).toBeCloseTo(40, 2);
      expect(values[1]).toBeCloseTo(20, 2);
      expect(values[2]).toBeCloseTo(1.1, 2);

      // 3. Pan again
      dispatchMouseEvent(svg, 'mousedown', 100, 100);
      dispatchMouseEvent(svg, 'mousemove', 120, 110);
      dispatchMouseEvent(svg, 'mouseup', 120, 110);
      expect(element.currentX).toBeCloseTo(60, 2);
      expect(element.currentY).toBeCloseTo(30, 2);
      transformString = element.g.getAttribute('transform');
      values = transformString.match(/-?\d+(\.\d+)?/g).map(Number);
      expect(values[0]).toBeCloseTo(60, 2);
      expect(values[1]).toBeCloseTo(30, 2);
      expect(values[2]).toBeCloseTo(1.1, 2);
    });
  });
});

describe('Drop Functionality', () => {
  let element;
  let container;
  const mockSymbolSvg = '<circle cx="10" cy="10" r="5" fill="blue" />';
  const mockSymbolData = { name: 'TestSymbol', svg: mockSymbolSvg };
  const mockBoundingClientRect = { left: 0, top: 0, width: 800, height: 600, right: 800, bottom: 600, x: 0, y: 0 };

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    // Ensure the custom element is defined (though CanvasWorkspace might not need it explicitly if always new'd)
    if (!customElements.get('canvas-workspace')) {
        customElements.define('canvas-workspace', CanvasWorkspace);
    }
    element = new CanvasWorkspace(); // Creates instance
    container.appendChild(element); // Appends to DOM, which calls connectedCallback implicitly if it's a custom element standard lifecycle
    // However, the original tests call connectedCallback explicitly, so we might keep that if issues arise.
    // For now, assuming standard custom element behavior where appendChild triggers connectedCallback.
    // If element.svg is null, then explicit call to element.connectedCallback() is needed.
    if (!element.svg) {
      element.connectedCallback(); // Ensure SVG and g are created.
    }

    // Mock getBoundingClientRect for the SVG element
    element.svg.getBoundingClientRect = vi.fn(() => mockBoundingClientRect);
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
    vi.restoreAllMocks(); // Restore any mocks after each test
  });

  it('should handle dragover correctly', () => {
    const mockDataTransfer = {
      dropEffect: ''
    };
    const dragOverEvent = new DragEvent('dragover', {
      bubbles: true,
      cancelable: true,
      dataTransfer: mockDataTransfer
    });

    element.svg.dispatchEvent(dragOverEvent);

    expect(dragOverEvent.defaultPrevented).toBe(true);
    expect(mockDataTransfer.dropEffect).toBe('copy');
  });

  it('should handle drop correctly and place symbol with default pan/zoom', () => {
    const clientX = 100;
    const clientY = 50;
    const mockGetData = vi.fn().mockReturnValue(JSON.stringify(mockSymbolData));
    const mockDataTransfer = {
      getData: mockGetData,
      dropEffect: '' // Not strictly needed for drop, but part of interface
    };

    const dropEvent = new DragEvent('drop', {
      bubbles: true,
      cancelable: true,
      clientX: clientX,
      clientY: clientY,
      dataTransfer: mockDataTransfer
    });

    element.svg.dispatchEvent(dropEvent);

    expect(dropEvent.defaultPrevented).toBe(true);
    expect(mockGetData).toHaveBeenCalledWith('application/json');

    const addedSymbolGroup = element.g.lastChild;
    expect(addedSymbolGroup).not.toBeNull();
    expect(addedSymbolGroup.tagName.toLowerCase()).toBe('g');
    // Note: innerHTML of an SVG element might be cased differently by the parser or serialized differently.
    // It's safer to check for structural elements or specific attributes if possible.
    // For this case, if the SVG string is simple and controlled, direct match might be okay.
    // AFTER THE FIX: addedSymbolGroup.innerHTML will be the *content* of the mockSymbolData.svg, not the full string.
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(mockSymbolData.svg, "image/svg+xml");
    const expectedInnerSvg = svgDoc.documentElement.innerHTML;
    expect(addedSymbolGroup.innerHTML).toBe(expectedInnerSvg);

    const expectedSvgX = (clientX - mockBoundingClientRect.left - element.currentX) / element.currentScale;
    const expectedSvgY = (clientY - mockBoundingClientRect.top - element.currentY) / element.currentScale;

    const transformString = addedSymbolGroup.getAttribute('transform');
    const values = transformString.match(/-?\d+(\.\d+)?/g).map(Number);
    expect(values[0]).toBeCloseTo(expectedSvgX, 2);
    expect(values[1]).toBeCloseTo(expectedSvgY, 2);
  });

  it('should handle drop correctly and place symbol with custom pan/zoom', () => {
    // Set custom pan/zoom
    element.currentX = 50;
    element.currentY = 20;
    element.currentScale = 0.5;
    element.updateTransform(); // Ensure the main group's transform is updated if necessary for logic (though not directly used in calc here)

    const clientX = 150;
    const clientY = 100;
    const mockGetData = vi.fn().mockReturnValue(JSON.stringify(mockSymbolData));
    const mockDataTransfer = {
      getData: mockGetData
    };

    const dropEvent = new DragEvent('drop', {
      bubbles: true,
      cancelable: true,
      clientX: clientX,
      clientY: clientY,
      dataTransfer: mockDataTransfer
    });

    element.svg.dispatchEvent(dropEvent);

    expect(dropEvent.defaultPrevented).toBe(true);
    expect(mockGetData).toHaveBeenCalledWith('application/json');

    const addedSymbolGroup = element.g.lastChild;
    expect(addedSymbolGroup).not.toBeNull();
    expect(addedSymbolGroup.tagName.toLowerCase()).toBe('g');
    // AFTER THE FIX: addedSymbolGroup.innerHTML will be the *content* of the mockSymbolData.svg, not the full string.
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(mockSymbolData.svg, "image/svg+xml");
    const expectedInnerSvg = svgDoc.documentElement.innerHTML;
    expect(addedSymbolGroup.innerHTML).toBe(expectedInnerSvg);

    const expectedSvgX = (clientX - mockBoundingClientRect.left - element.currentX) / element.currentScale;
    const expectedSvgY = (clientY - mockBoundingClientRect.top - element.currentY) / element.currentScale;

    const transformString = addedSymbolGroup.getAttribute('transform');
    const values = transformString.match(/-?\d+(\.\d+)?/g).map(Number);
    expect(values[0]).toBeCloseTo(expectedSvgX, 2);
    expect(values[1]).toBeCloseTo(expectedSvgY, 2);
  });
});
