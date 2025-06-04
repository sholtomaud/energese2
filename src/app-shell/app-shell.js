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
            width: 100vw; /* Changed from 100% to 100vw for full viewport width */
            margin: 0;
            font-family: sans-serif;
            background-color: #fff; /* Default background for the shell */
        }

        app-shell > header,
        app-shell > footer {
            padding: 10px;
            background-color: #e0e0e0; /* Light grey */
            flex-shrink: 0; /* Prevent shrinking */
            text-align: center;
        }

        app-shell > .content-wrapper { /* New class for the div containing nav and main */
            display: flex;
            flex-grow: 1; /* Takes up remaining space */
            overflow: hidden; /* Prevent content from breaking layout */
        }

        app-shell nav {
            width: 200px;
            border-right: 1px solid #ccc;
            padding: 10px;
            background-color: #f0f0f0; /* Slightly different grey for nav */
            flex-shrink: 0;
            overflow-y: auto; /* If nav content gets long */
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
            border: 1px dashed #aaa; /* For visualizing its bounds during dev */
        }
      </style>
      <header>
        <h1>Dynamic Systems Modeler</h1>
      </header>
      <div class="content-wrapper">
        <nav>
          <symbol-library></symbol-library>
        </nav>
        <main>
          <!-- Placeholder for canvas-workspace -->
          <canvas-workspace></canvas-workspace>
        </main>
      </div>
      <footer>
        <p>App Shell Footer</p>
        <p id="route-info">Current Route: </p>
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
