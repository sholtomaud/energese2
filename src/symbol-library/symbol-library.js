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
      <li data-symbol-name="${symbol.name}" draggable="true">
        ${symbol.svg}
      </li>
    `).join('');

    this.innerHTML = `
      <style>
        :host {
          display: flex; /* Changed to flex */
          flex-direction: column; /* Vertical layout for the component itself */
          height: 100%; /* Fill the nav container */
          box-sizing: border-box;
          /* background-color: #E2E8F0; /* Already set by app-shell nav */
        }
        h2 {
          font-size: 1rem; /* Smaller title */
          margin: 0;
          padding: 0.75rem 1rem; /* Consistent padding */
          text-align: left;
          font-weight: 600;
          color: #2D3748; /* Darker text for title */
          border-bottom: 1px solid #CBD5E0; /* Separator */
          flex-shrink: 0; /* Prevent shrinking */
        }
        ul.symbol-list {
          list-style-type: none;
          padding: 0.5rem; /* Padding around the list */
          margin: 0;
          display: flex;
          flex-direction: column; /* Vertical list of symbols */
          align-items: stretch; /* Stretch items to fill width */
          flex-grow: 1; /* Take remaining vertical space */
          overflow-y: auto; /* Scroll if too many symbols */
        }
        ul.symbol-list li {
          padding: 0.5rem; /* Padding inside each item */
          margin: 0.25rem 0; /* Margin between items */
          border: 1px solid #CBD5E0; /* Softer border */
          background-color: #F7FAFC; /* Light background for items */
          border-radius: 4px; /* Rounded corners */
          cursor: grab;
          display: flex;
          flex-direction: row; /* SVG and name (if any) in a row */
          align-items: center;
          text-align: left;
          transition: background-color 0.2s ease-in-out;
        }
        ul.symbol-list li:hover {
          background-color: #EDF2F7; /* Slightly different background on hover */
          border-color: #A0AEC0;
        }
        ul.symbol-list li svg {
          display: block;
          margin-right: 0.5rem; /* Space between SVG and name (if shown) */
          flex-shrink: 0; /* Prevent SVG from shrinking */
          /* Max width/height can be added if SVGs are too large */
        }
        /* Optional: Style for symbol names if they were added next to SVGs */
        /*
        .symbol-name-label {
          font-size: 0.875rem;
          color: #4A5568;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        */
      </style>
      <h2>Symbols</h2> <!-- Changed title -->
      <ul class="symbol-list">
        ${symbolListItems} <!-- Symbol names are part of SVG text for now -->
      </ul>
    `;

    this.querySelectorAll('ul.symbol-list li').forEach(item => {
      item.addEventListener('dragstart', event => {
        const symbolName = event.currentTarget.dataset.symbolName;
        const symbol = this.symbols.find(s => s.name === symbolName);
        if (symbol) {
          event.dataTransfer.setData('application/json', JSON.stringify({ name: symbol.name, svg: symbol.svg }));
          event.dataTransfer.effectAllowed = 'copy';
        } else {
          console.error('Symbol not found for dragstart:', symbolName);
        }
      });
    });
  }
}

customElements.define('symbol-library', SymbolLibrary);
export default SymbolLibrary;
