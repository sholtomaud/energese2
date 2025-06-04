import BaseComponent from '../BaseComponent.js';
import SymbolLibrary from '../symbol-library/symbol-library.js';

class AppShell extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <header>
        <h1>Dynamic Systems Modeler</h1>
      </header>
      <div style="display: flex; min-height: calc(100vh - 150px);"> <!-- Adjust min-height as needed -->
        <nav style="width: 200px; border-right: 1px solid #ccc; padding: 10px; background-color: #f0f0f0;">
          <symbol-library></symbol-library>
        </nav>
        <main style="flex-grow: 1; padding: 10px;">
          <p>Main application content will go here. The canvas-workspace will eventually replace this.</p>
          <!-- Placeholder for canvas-workspace -->
          <!-- <canvas-workspace></canvas-workspace> -->
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
