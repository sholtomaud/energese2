import BaseComponent from '../BaseComponent.js';

class SymbolLibrary extends BaseComponent {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
      <style>
        ul.symbol-list {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        ul.symbol-list li {
          padding: 8px;
          margin-bottom: 5px;
          background-color: #f0f0f0;
          border: 1px solid #ccc;
          cursor: grab;
        }
      </style>
      <h2>Symbol Library</h2>
      <ul class="symbol-list">
        <li>Placeholder Symbol 1</li>
        <li>Placeholder Symbol 2</li>
      </ul>
    `;
  }
}

customElements.define('symbol-library', SymbolLibrary);
export default SymbolLibrary;
