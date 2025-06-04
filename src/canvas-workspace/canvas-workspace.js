import BaseComponent from '../BaseComponent.js';

class CanvasWorkspace extends BaseComponent {
  constructor() {
    super();
    this.isPanning = false;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.currentScale = 1;
  }

  connectedCallback() {
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('width', '100%');
    this.svg.setAttribute('height', '100%');
    this.svg.style.backgroundColor = '#f0f0f0';

    this.g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.g.setAttribute('transform', `translate(${this.currentX}, ${this.currentY})`);
    this.svg.appendChild(this.g);

    // Add some sample content to the group
    const prominentRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    prominentRect.setAttribute('x', '25'); // Centered a bit more if canvas is small
    prominentRect.setAttribute('y', '25');
    prominentRect.setAttribute('width', '200'); // Larger
    prominentRect.setAttribute('height', '150'); // Larger
    prominentRect.setAttribute('fill', 'red'); // Brighter color
    prominentRect.setAttribute('stroke', 'black');
    prominentRect.setAttribute('stroke-width', '2');
    this.g.appendChild(prominentRect);

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', '60');
    text.setAttribute('y', '100');
    text.textContent = 'Pan me!';
    this.g.appendChild(text);


    this.appendChild(this.svg);

    this.svg.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.svg.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.svg.addEventListener('mouseup', this.handleMouseUp.bind(this));
    this.svg.addEventListener('mouseleave', this.handleMouseUp.bind(this)); // Reset panning if mouse leaves canvas
    this.svg.addEventListener('wheel', this.handleWheel.bind(this));

    console.log('canvas-workspace connected');
  }

  handleMouseDown(event) {
    console.log('handleMouseDown triggered');
    this.isPanning = true;
    this.startX = event.clientX - this.currentX;
    this.startY = event.clientY - this.currentY;
    this.svg.style.cursor = 'grabbing';
    console.log(`  Initial pan: startX=${this.startX}, startY=${this.startY}, clientX=${event.clientX}, clientY=${event.clientY}`);
  }

  handleMouseMove(event) {
    if (!this.isPanning) {
      return;
    }
    console.log('handleMouseMove triggered');
    const dx = event.clientX - this.startX;
    const dy = event.clientY - this.startY;
    console.log(`  Mouse move: clientX=${event.clientX}, clientY=${event.clientY}`);
    console.log(`  Calculated delta: dx=${dx - this.currentX}, dy=${dy - this.currentY}`); // Delta from previous currentX/Y
    this.currentX = dx;
    this.currentY = dy;
    console.log(`  Updated state: currentX=${this.currentX}, currentY=${this.currentY}`);
    this.updateTransform();
  }

  handleMouseUp() {
    console.log('handleMouseUp triggered (also by mouseleave)');
    if (this.isPanning) {
      this.isPanning = false;
      this.svg.style.cursor = 'grab';
      console.log('  Panning stopped');
    }
  }

  handleWheel(event) {
    console.log('handleWheel triggered');
    event.preventDefault();
    const zoomFactor = event.deltaY < 0 ? 1.1 : 0.9;
    const rect = this.svg.getBoundingClientRect();
    // offsetX/offsetY are properties of the event, but often not what's needed for SVG transforms.
    // clientX/clientY relative to the viewport, then adjusted by getBoundingClientRect is more robust.
    const svgX = event.clientX - rect.left;
    const svgY = event.clientY - rect.top;

    console.log(`  Wheel event: deltaY=${event.deltaY}, clientX=${event.clientX}, clientY=${event.clientY}`);
    console.log(`  SVG coords: svgX=${svgX}, svgY=${svgY}`);
    console.log(`  Current state: currentX=${this.currentX}, currentY=${this.currentY}, currentScale=${this.currentScale}`);

    const oldScale = this.currentScale;
    const newScale = this.currentScale * zoomFactor;

    // Adjust translation to keep zoom centered on mouse pointer
    const newCurrentX = svgX - (svgX - this.currentX) * zoomFactor;
    const newCurrentY = svgY - (svgY - this.currentY) * zoomFactor;

    console.log(`  Calculated zoom: zoomFactor=${zoomFactor}, newScale=${newScale}`);
    console.log(`  Calculated new translation: newCurrentX=${newCurrentX}, newCurrentY=${newCurrentY}`);

    this.currentX = newCurrentX;
    this.currentY = newCurrentY;
    this.currentScale = newScale;

    this.updateTransform();
  }

  updateTransform() {
    const transformString = `translate(${this.currentX}, ${this.currentY}) scale(${this.currentScale})`;
    console.log(`updateTransform: ${transformString}`);
    this.g.setAttribute('transform', transformString);
  }
}

customElements.define('canvas-workspace', CanvasWorkspace);
export default CanvasWorkspace;
