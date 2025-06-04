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
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', '50');
    rect.setAttribute('y', '50');
    rect.setAttribute('width', '100');
    rect.setAttribute('height', '100');
    rect.setAttribute('fill', 'blue');
    this.g.appendChild(rect);

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
    this.isPanning = true;
    this.startX = event.clientX - this.currentX;
    this.startY = event.clientY - this.currentY;
    this.svg.style.cursor = 'grabbing';
  }

  handleMouseMove(event) {
    if (!this.isPanning) {
      return;
    }
    this.currentX = event.clientX - this.startX;
    this.currentY = event.clientY - this.startY;
    this.updateTransform();
  }

  handleMouseUp() {
    this.isPanning = false;
    this.svg.style.cursor = 'grab';
  }

  handleWheel(event) {
    event.preventDefault();
    const zoomFactor = event.deltaY < 0 ? 1.1 : 0.9;
    const rect = this.svg.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Calculate the new scale
    const newScale = this.currentScale * zoomFactor;

    // Adjust translation to keep zoom centered on mouse pointer
    this.currentX = mouseX - (mouseX - this.currentX) * zoomFactor;
    this.currentY = mouseY - (mouseY - this.currentY) * zoomFactor;
    this.currentScale = newScale;

    this.updateTransform();
  }

  updateTransform() {
    this.g.setAttribute('transform', `translate(${this.currentX}, ${this.currentY}) scale(${this.currentScale})`);
  }
}

customElements.define('canvas-workspace', CanvasWorkspace);
export default CanvasWorkspace;
