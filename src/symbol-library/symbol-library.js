import BaseComponent from '../BaseComponent.js';

class SymbolLibrary extends BaseComponent {
  constructor() {
    super();
    this.symbols = [
      {
        name: 'Source',
        svg: '<svg width="40" height="40" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="lightgreen" /><text x="50" y="55" font-size="12" text-anchor="middle">Source</text></svg>'
      },
      {
        name: 'Storage',
        svg: '<svg width="60" height="40" viewBox="0 0 120 80"><rect x="10" y="10" width="100" height="60" stroke="black" stroke-width="3" fill="lightblue" /><text x="60" y="45" font-size="12" text-anchor="middle">Storage</text></svg>'
      },
      {
        name: 'Producer',
        svg: '<svg width="60" height="40" viewBox="0 0 120 80"><path d="M70 10 H10 V70 H70 L100 40 Z" stroke="black" stroke-width="3" fill="yellow" /><text x="55" y="45" font-size="12" text-anchor="middle">Producer</text></svg>'
      }
    ];
  }

  connectedCallback() {
    const symbolListItems = this.symbols.map(symbol => `
      <li data-symbol-name="${symbol.name}">
        ${symbol.svg}
      </li>
    `).join('');

    this.innerHTML = `
      <style>
        :host { /* Style the component itself */
          display: block;
          border: 1px solid #ccc;
          padding: 10px;
        }
        h2 {
          margin-top: 0;
          font-size: 1.2em;
          text-align: center;
        }
        ul.symbol-list {
          list-style-type: none;
          padding: 0;
          margin: 0;
          display: flex; /* Allow wrapping */
          flex-wrap: wrap; /* Symbols wrap to next line */
          justify-content: center; /* Center symbols if they don't fill the row */
        }
        ul.symbol-list li {
          padding: 5px;
          margin: 5px; /* Provide some space around each symbol */
          border: 1px solid #eee;
          background-color: #f9f9f9;
          cursor: grab;
          display: flex; /* For aligning item content */
          flex-direction: column; /* Stack SVG and optional name */
          align-items: center; /* Center content */
          text-align: center;
        }
        ul.symbol-list li svg {
          display: block; /* Remove extra space below SVG */
          margin: 0 auto; /* Center SVG if it's smaller than li */
        }
        /* You could add a class to show names if desired, e.g., by adding <span class="symbol-name">\${symbol.name}</span> */
        /*
        ul.symbol-list li .symbol-name {
          font-size: 0.8em;
          margin-top: 3px;
        }
        */
      </style>
      <h2>Symbol Library</h2>
      <ul class="symbol-list">
        ${symbolListItems}
      </ul>
    `;
  }
}

customElements.define('symbol-library', SymbolLibrary);
export default SymbolLibrary;
