class BaseComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Called when the element is added to the DOM
  }

  disconnectedCallback() {
    // Called when the element is removed from the DOM
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // Called when an observed attribute changes
  }
}

// It's common to export the class if you're using modules.
export default BaseComponent;
