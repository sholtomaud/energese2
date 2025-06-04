import BaseComponent from '../../BaseComponent.js';

class CanvasWorkspace extends BaseComponent {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    height: 100%;
                    overflow: hidden; /* To contain pan/zoom later */
                    background-color: #f0f0f0; /* Light grey background */
                    border: 1px solid #ccc; /* Subtle border */
                    box-sizing: border-box;
                }
                svg {
                    width: 100%;
                    height: 100%;
                }
            </style>
            <svg id="canvas-svg" width="100%" height="100%"></svg>
        `;
    }

    connectedCallback() {
        // Perform any initial setup after the component is connected to the DOM
        // For example, you might want to get a reference to the SVG element:
        // this.svgCanvas = this.shadowRoot.getElementById('canvas-svg');
        console.log('canvas-workspace connected');
    }

    // Add other methods for pan, zoom, drawing, etc. later
}

customElements.define('canvas-workspace', CanvasWorkspace);
