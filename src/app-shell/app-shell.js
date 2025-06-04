import BaseComponent from '../BaseComponent.js';
import SymbolLibrary from '../symbol-library/symbol-library.js';


class AppShell extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <style>
        /* Styles for app-shell component */
        app-shell { /* Since it's not shadow DOM, we target the element itself */
            display: flex;
            flex-direction: column;
            height: 100vh;
            width: 100vw;
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
            background-color: #F7FAFC; /* App background - very light grey */
        }

        app-shell > header {
            padding: 0.5rem 1rem; /* Reduced padding */
            background-color: #4A5568; /* Muted dark blue/grey */
            color: #F7FAFC; /* Light text */
            flex-shrink: 0;
            text-align: left; /* Align title left */
            font-size: 0.9rem; /* Smaller font for header content */
            line-height: 1.2;
            border-bottom: 1px solid #2D3748; /* Darker border */
        }

        app-shell > header h1 {
            font-size: 1.1rem; /* Smaller h1 */
            margin: 0;
            font-weight: 600;
        }

        app-shell > footer {
            padding: 0.25rem 1rem; /* Reduced padding */
            background-color: #E2E8F0; /* Light grey, less prominent */
            color: #4A5568; /* Darker text */
            font-size: 0.75rem;
            text-align: center;
            flex-shrink: 0;
            border-top: 1px solid #CBD5E0;
        }

        app-shell > .content-wrapper {
            display: flex;
            flex-grow: 1;
            overflow: hidden;
        }

        app-shell nav { /* This is where symbol-library goes */
            width: 220px; /* Slightly wider for new symbol layout */
            border-right: 1px solid #CBD5E0; /* Softer border */
            padding: 0; /* Remove padding, symbol-library will handle its own */
            background-color: #E2E8F0; /* Light grey nav area */
            flex-shrink: 0;
            overflow-y: auto;
        }

        app-shell main {
            flex-grow: 1;
            padding: 10px;
            display: flex; /* To allow canvas-workspace to fill it */
            flex-direction: column; /* If we add other things in main */
        }

        /* Ensure canvas-workspace (if present) can fill the main area */
        app-shell main canvas-workspace {
            flex-grow: 1;
            /* border: 1px dashed #aaa; /* Removed for production look */
        }
      </style>
      <header>
        <h1>DSM</h1> <!-- Shortened Title -->
      </header>
      <div class="content-wrapper">
        <nav>
          <symbol-library></symbol-library>
        </nav>
        <main>
          <canvas-workspace></canvas-workspace>
        </main>
      </div>
      <footer>
        <p id="route-info">Status: Ready</p> <!-- Simplified footer -->
      </footer>
    `;

    window.addEventListener('hashchange', this.handleRouteChange.bind(this));
    window.addEventListener('popstate', this.handleRouteChange.bind(this));
    this.handleRouteChange(); // Handle initial route
  }

  handleRouteChange() {
    const routeInfo = this.querySelector('#route-info') || (this.shadowRoot && this.shadowRoot.querySelector('#route-info'));
    if (routeInfo) {
      routeInfo.textContent = 'Current Route: ' + (window.location.hash || '# (default)');
    }
    console.log("Routing handled. Current hash:", window.location.hash);
    // In a real app, you'd parse the route and update the main content.
  }
}

customElements.define('app-shell', AppShell);
export default AppShell; // Ensure class is exported
