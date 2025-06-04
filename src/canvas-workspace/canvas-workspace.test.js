import CanvasWorkspace from './canvas-workspace.js';

// Helper function for basic assertions
function assertEquals(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`Assertion failed: ${message}. Expected "${expected}", but got "${actual}".`);
  }
}

function assertContains(haystack, needle, message) {
  if (!haystack.includes(needle)) {
    throw new Error(`Assertion failed: ${message}. Expected to find "${needle}" in "${haystack}".`);
  }
}

function assertNotNull(value, message) {
  if (value === null || value === undefined) {
    throw new Error(`Assertion failed: ${message}. Expected value to be not null/undefined.`);
  }
}

describe('CanvasWorkspace Component', () => {
  let element;
  let testContainer;

  beforeEach(() => {
    testContainer = document.createElement('div');
    document.body.appendChild(testContainer);

    element = new CanvasWorkspace();
    testContainer.appendChild(element);
  });

  afterEach(() => {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
    if (testContainer && testContainer.parentNode) {
      testContainer.parentNode.removeChild(testContainer);
    }
    element = null;
    testContainer = null;
  });

  it('should render a placeholder for the canvas', () => {
    assertNotNull(element, 'CanvasWorkspace element should be created');

    // Check for the placeholder div
    const placeholderDiv = element.querySelector('div');
    assertNotNull(placeholderDiv, 'Placeholder div should exist in the component');

    // Assert content
    assertContains(placeholderDiv.textContent, 'Canvas Workspace Placeholder', 'Placeholder div should contain the correct text');

    // Assert styles
    // Note: Accessing inline styles can be tricky. Style property names are camelCased.
    // And matching exact string might be brittle if order or spacing changes.
    // It's often better to check computed styles in more complex scenarios,
    // but for this specific inline style, direct check is okay.
    assertContains(placeholderDiv.style.width, '100%', 'Placeholder div should have width 100%');
    assertContains(placeholderDiv.style.height, '100%', 'Placeholder div should have height 100%');
    assertEquals(placeholderDiv.style.backgroundColor, 'rgb(240, 240, 240)', 'Placeholder div should have correct background color'); // #f0f0f0
    assertEquals(placeholderDiv.style.display, 'flex', 'Placeholder div should have display:flex');
    assertEquals(placeholderDiv.style.alignItems, 'center', 'Placeholder div should have align-items:center');
    assertEquals(placeholderDiv.style.justifyContent, 'center', 'Placeholder div should have justify-content:center');

    // A more robust check for the style attribute string itself
    const styleAttribute = placeholderDiv.getAttribute('style');
    assertContains(styleAttribute, 'width:100%', 'Style attribute should contain width');
    assertContains(styleAttribute, 'height:100%', 'Style attribute should contain height');
    assertContains(styleAttribute, 'background-color: #f0f0f0', 'Style attribute should contain background-color');
    assertContains(styleAttribute, 'display:flex', 'Style attribute should contain display:flex');
    assertContains(styleAttribute, 'align-items:center', 'Style attribute should contain align-items:center');
    assertContains(styleAttribute, 'justify-content:center', 'Style attribute should contain justify-content:center');

  });

  it('should be registered as a custom element canvas-workspace', () => {
    const el = document.createElement('canvas-workspace');
    assertNotNull(el, 'Element should be creatable via document.createElement');
    // Check if it's an instance of CanvasWorkspace or its superclass, not just a generic HTMLElement
    // This might require the component to be defined globally or CanvasWorkspace to be accessible
    // For simplicity, we'll check if it's not HTMLUnknownElement if possible,
    // or rely on the fact that if the previous test passed, it's likely registered.
    if (typeof HTMLUnknownElement !== 'undefined') {
        if (el instanceof HTMLUnknownElement) {
            throw new Error('canvas-workspace is an HTMLUnknownElement. It might not be registered correctly.');
        }
    }
    // A more direct check:
    assertEquals(customElements.get('canvas-workspace'), CanvasWorkspace, 'canvas-workspace should be registered with the CanvasWorkspace class');
  });
});

// Basic test runner simulation (similar to symbol-library.test.js)
(async () => {
  console.log('Running tests for CanvasWorkspace...');
  let testsPassed = 0;
  let testsFailed = 0;

  const originalDescribe = global.describe;
  const originalIt = global.it;
  const originalBeforeEach = global.beforeEach;
  const originalAfterEach = global.afterEach;

  let currentSuite = {};
  global.describe = (name, fn) => {
    console.log(`\nTestSuite: ${name}`);
    currentSuite.beforeEaches = [];
    currentSuite.afterEaches = [];
    currentSuite.tests = [];
    fn(); // This will call beforeEach, it, afterEach

    currentSuite.tests.forEach(test => {
      try {
        currentSuite.beforeEaches.forEach(bf => bf());
        test.fn();
        console.log(`  [PASS] ${test.name}`);
        testsPassed++;
      } catch (e) {
        console.error(`  [FAIL] ${test.name}`);
        console.error(`    Error: ${e.message}`);
        testsFailed++;
      } finally {
        currentSuite.afterEaches.forEach(af => af());
      }
    });
  };
  global.it = (name, fn) => {
    currentSuite.tests.push({ name, fn });
  };
  global.beforeEach = (fn) => {
    currentSuite.beforeEaches.push(fn);
  };
  global.afterEach = (fn) => {
    currentSuite.afterEaches.push(fn);
  };

  // Manually trigger the describe block's function to populate and run tests
  const describeBlockFn = () => {
      let element;
      let testContainer;

      global.beforeEach(() => {
        testContainer = document.createElement('div');
        // Mock document for Node.js like environment if needed
        if (typeof document === 'undefined') {
            global.document = { body: { appendChild: () => {}, removeChild: () => {} }, querySelector: () => {}, createElement: () => ({ appendChild: () => {}, removeChild: () => {}, style: {}, getAttribute: () => ''}) };
            global.window = {};
            global.customElements = { get: () => {} }; // mock customElements
            global.CanvasWorkspace = CanvasWorkspace; // Ensure CanvasWorkspace is available globally for the mocked environment
        }
        document.body.appendChild(testContainer);
        element = new CanvasWorkspace(); // Assumes CanvasWorkspace is imported and available
        testContainer.appendChild(element);
      });

      global.afterEach(() => {
        if (element && element.parentNode) {
          element.parentNode.removeChild(element);
        }
        if (testContainer && testContainer.parentNode) {
          testContainer.parentNode.removeChild(testContainer);
        }
        element = null;
        testContainer = null;
      });

      global.it('should render a placeholder for the canvas', () => {
        assertNotNull(element, 'CanvasWorkspace element should be created');
        const placeholderDiv = element.querySelector('div');
        assertNotNull(placeholderDiv, 'Placeholder div should exist in the component');
        assertContains(placeholderDiv.textContent, 'Canvas Workspace Placeholder', 'Placeholder div should contain the correct text');
        const styleAttribute = placeholderDiv.getAttribute('style');
        assertContains(styleAttribute, 'width:100%', 'Style attribute should contain width');
        assertContains(styleAttribute, 'height:100%', 'Style attribute should contain height');
        assertContains(styleAttribute, 'background-color: #f0f0f0', 'Style attribute should contain background-color');
        assertContains(styleAttribute, 'display:flex', 'Style attribute should contain display:flex');
        assertContains(styleAttribute, 'align-items:center', 'Style attribute should contain align-items:center');
        assertContains(styleAttribute, 'justify-content:center', 'Style attribute should contain justify-content:center');
      });

      global.it('should be registered as a custom element canvas-workspace', () => {
        const el = document.createElement('canvas-workspace');
        assertNotNull(el, 'Element should be creatable via document.createElement');
         if (typeof HTMLUnknownElement !== 'undefined' && el instanceof HTMLUnknownElement) {
            throw new Error('canvas-workspace is an HTMLUnknownElement.');
        }
        assertEquals(customElements.get('canvas-workspace'), CanvasWorkspace, 'canvas-workspace should be registered');
      });
  };

  global.describe('CanvasWorkspace Component', describeBlockFn);

  console.log(`\n--- Test Summary ---`);
  console.log(`Total tests: ${testsPassed + testsFailed}`);
  console.log(`Passed: ${testsPassed}`);
  console.log(`Failed: ${testsFailed}`);
  console.log(`--------------------`);

  if (originalDescribe) global.describe = originalDescribe;
  if (originalIt) global.it = originalIt;
  if (originalBeforeEach) global.beforeEach = originalBeforeEach;
  if (originalAfterEach) global.afterEach = originalAfterEach;

  if (testsFailed > 0) {
    console.error(`${testsFailed} CanvasWorkspace test(s) failed. Check logs above.`);
  } else {
    console.log("All CanvasWorkspace tests passed!");
  }
})().catch(e => {
  console.error("Error running basic test runner for CanvasWorkspace:", e);
});
