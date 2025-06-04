import BaseComponent from '../BaseComponent.js';

class SymbolLibrary extends BaseComponent {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
      <div style="border: 1px solid #ccc; padding: 10px; margin: 5px;">
        <h2>Symbol Library</h2>
        <p>Symbols will be listed here.</p>
        <!-- Example of how a symbol might look later -->
        <!--
        <div class="symbol-item" draggable="true" data-symbol-type="source">
          <svg width="50" height="30" viewBox="0 0 50 30">
            <rect width="50" height="30" style="fill:lightgreen;stroke:black;stroke-width:1"/>
            <text x="5" y="20" font-size="10">Source</text>
          </svg>
        </div>
        -->
      </div>
    `;
  }
}

customElements.define('symbol-library', SymbolLibrary);
export default SymbolLibrary;

