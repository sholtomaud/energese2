import BaseComponent from '../BaseComponent.js';

class CanvasWorkspace extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div style="width:100%; height:100%; background-color: #f0f0f0; display:flex; align-items:center; justify-content:center;">
        Canvas Workspace Placeholder
      </div>
    `;
    console.log('canvas-workspace connected');
  }
}

customElements.define('canvas-workspace', CanvasWorkspace);
export default CanvasWorkspace;
