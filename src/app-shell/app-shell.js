import BaseComponent from '../BaseComponent.js';

class AppShell extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <header>
        <h1>Dynamic Systems Modeler</h1>
      </header>
      <main>
        <p>Main application content will go here.</p>
      </main>
      <footer>
        <p>App Shell Footer</p>
      </footer>
    `;

    window.addEventListener('hashchange', this.handleRouteChange.bind(this));
    window.addEventListener('popstate', this.handleRouteChange.bind(this));
    this.handleRouteChange(); // Handle initial route
  }

  handleRouteChange() {
    console.log("Routing would be handled here. Current hash:", window.location.hash);
    // In a real app, you'd parse the route and update the main content.
  }
}

customElements.define('app-shell', AppShell);
export default AppShell; // Ensure class is exported
