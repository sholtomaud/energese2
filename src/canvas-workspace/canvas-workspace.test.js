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
    expect(element.g.getAttribute('transform')).toBe('translate(0, 0) scale(1)');
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
      // currentX = 150 - 100 = 50; currentY = 120 - 100 = 20;
      expect(element.g.getAttribute('transform')).toBe('translate(50, 20) scale(1)');

      // Move mouse again
      dispatchMouseEvent(svg, 'mousemove', 50, 80);
      // currentX = 50 - 100 = -50; currentY = 80 - 100 = -20;
      expect(element.g.getAttribute('transform')).toBe('translate(-50, -20) scale(1)');

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
      expect(element.currentX).toBeCloseTo(-10);
      expect(element.currentY).toBeCloseTo(-10);
      expect(element.g.getAttribute('transform')).toBe(`translate(-10, -10) scale(1.1)`);

      // Zoom in again at a different point (200,200)
      // mouseX = 200, mouseY = 200
      // currentX = -10, currentY = -10, currentScale = 1.1
      // zoomFactor = 1.1
      // newScale = 1.1 * 1.1 = 1.21
      // currentX = 200 - (200 - (-10)) * 1.1 = 200 - (210) * 1.1 = 200 - 231 = -31
      // currentY = 200 - (200 - (-10)) * 1.1 = 200 - (210) * 1.1 = 200 - 231 = -31
      dispatchWheelEvent(svg, -100, 200, 200);
      expect(element.currentScale).toBeCloseTo(1.21);
      expect(element.currentX).toBeCloseTo(-31);
      expect(element.currentY).toBeCloseTo(-31);
      expect(element.g.getAttribute('transform')).toBe(`translate(-31, -31) scale(1.21)`);
    });

    it('should zoom out correctly, centered on mouse pointer', () => {
      const svg = element.svg;
      // Initial state: translate(0,0) scale(1)

      // Zoom out at (100,100)
      // mouseX = 100, mouseY = 100
      // currentX = 0, currentY = 0, currentScale = 1
      // zoomFactor = 0.9
      // newScale = 1 * 0.9 = 0.9
      // currentX = 100 - (100 - 0) * 0.9 = 100 - 90 = 10
      // currentY = 100 - (100 - 0) * 0.9 = 100 - 90 = 10
      dispatchWheelEvent(svg, 100, 100, 100); // deltaY > 0 for zoom out
      expect(element.currentScale).toBeCloseTo(0.9);
      expect(element.currentX).toBeCloseTo(10);
      expect(element.currentY).toBeCloseTo(10);
      expect(element.g.getAttribute('transform')).toBe(`translate(10, 10) scale(0.9)`);

      // Zoom out again at a different point (50,50)
      // mouseX = 50, mouseY = 50
      // currentX = 10, currentY = 10, currentScale = 0.9
      // zoomFactor = 0.9
      // newScale = 0.9 * 0.9 = 0.81
      // currentX = 50 - (50 - 10) * 0.9 = 50 - (40) * 0.9 = 50 - 36 = 14
      // currentY = 50 - (50 - 10) * 0.9 = 50 - (40) * 0.9 = 50 - 36 = 14
      dispatchWheelEvent(svg, 100, 50, 50);
      expect(element.currentScale).toBeCloseTo(0.81);
      expect(element.currentX).toBeCloseTo(14);
      expect(element.currentY).toBeCloseTo(14);
      // Due to potential floating point inaccuracies, it's better to check parts of the string or use toBeCloseTo for numerical values
      const transform = element.g.getAttribute('transform');
      expect(transform).toContain(`scale(0.81)`);
      // For translate, parse the values if precision is an issue.
      // Or ensure the component rounds or formats the output consistently.
      // For now, direct string comparison with calculated values.
      expect(transform).toBe(`translate(14, 14) scale(0.81)`);
    });

    it('should handle mixed pan and zoom operations', () => {
      const svg = element.svg;
      // 1. Pan
      dispatchMouseEvent(svg, 'mousedown', 100, 100);
      dispatchMouseEvent(svg, 'mousemove', 150, 130); // dx=50, dy=30. translate(50,30) scale(1)
      dispatchMouseEvent(svg, 'mouseup', 150, 130);
      expect(element.g.getAttribute('transform')).toBe('translate(50, 30) scale(1)');

      // 2. Zoom In at (150, 130) - this is relative to SVG, current element.currentX = 50, element.currentY = 30
      // mouseX = 150, mouseY = 130
      // currentX = 50, currentY = 30, currentScale = 1
      // zoomFactor = 1.1
      // newScale = 1.1
      // nextX = 150 - (150 - 50) * 1.1 = 150 - 100 * 1.1 = 150 - 110 = 40
      // nextY = 130 - (130 - 30) * 1.1 = 130 - 100 * 1.1 = 130 - 110 = 20
      dispatchWheelEvent(svg, -100, 150, 130);
      expect(element.currentScale).toBeCloseTo(1.1);
      expect(element.currentX).toBeCloseTo(40);
      expect(element.currentY).toBeCloseTo(20);
      expect(element.g.getAttribute('transform')).toBe(`translate(40, 20) scale(1.1)`);

      // 3. Pan again
      // currentX = 40, currentY = 20, currentScale = 1.1
      dispatchMouseEvent(svg, 'mousedown', 100, 100); // startX = 100 - 40 = 60, startY = 100 - 20 = 80
      dispatchMouseEvent(svg, 'mousemove', 120, 110); // nextX = 120 - 60 = 60, nextY = 110 - 80 = 30
      dispatchMouseEvent(svg, 'mouseup', 120, 110);
      expect(element.currentX).toBeCloseTo(60);
      expect(element.currentY).toBeCloseTo(30);
      expect(element.g.getAttribute('transform')).toBe(`translate(60, 30) scale(1.1)`);
    });
  });
});
