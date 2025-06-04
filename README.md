# energese2

# Dynamic Systems Modeling App - Requirements & Task List

## Project Overview

A standalone, offline-capable web application for creating and simulating dynamic systems models using Howard Thomas Odum's systems ecology methodology. The app provides a visual drag-and-drop interface for building computational graphs that represent ecological and systems dynamics models.

## Core Requirements

### Technical Constraints
- **Vanilla JavaScript only** - No third-party libraries or frameworks
- **Web Components architecture** - Native custom elements for modularity
- **Offline-first design** - Full functionality without internet connection
- **File API integration** - Local file save/load using native Web File API
- **SVG-based graphics** - All symbols and canvas elements use SVG
- **SPA architecture** - Single Page Application with client-side routing

### Functional Requirements

#### 1. Visual Graph Editor
- Full-page canvas workspace with pan and zoom capabilities
- Drag-and-drop interface for placing symbols from stencil palette
- Visual connection system for linking nodes (representing flows and relationships)
- Multi-select, copy, paste, delete operations
- Undo/redo functionality
- Grid snap and alignment tools
- Layering and z-index management

#### 2. Symbol System (Odum Notation)
- Comprehensive library of Odum systems symbols:
  - Energy sources (sun, fossil fuels, etc.)
  - Storage tanks/compartments
  - Producers (plants, photosynthesis)
  - Consumers (herbivores, carnivores, decomposers)
  - Switching functions
  - Interaction symbols
  - Flow pathways
  - Control loops
- Custom SVG symbol import/creation capability
- Symbol properties panel with configurable parameters
- Symbol library management (add, edit, delete, categorize)

#### 3. Computational Graph Engine
- **DAG (Directed Acyclic Graph) representation** of system models
- **Node-based computation system** where each symbol represents:
  - State variables (stocks/levels)
  - Flow rates (connections between nodes)
  - Mathematical functions and transformations
  - Control logic and feedback loops
- **Parameter configuration** for each node:
  - Initial conditions
  - Rate constants
  - Transfer coefficients
  - Mathematical expressions
- **Validation system** to ensure model consistency and prevent cycles

#### 4. Simulation Engine
- **Time-series simulation** capabilities
- **Numerical integration methods**:
  - Euler method
  - Runge-Kutta 4th order
  - Adaptive step-size algorithms
- **Real-time and batch simulation modes**
- **Parameter sensitivity analysis**
- **Steady-state analysis**
- **Simulation controls**: start, stop, pause, reset, step-through
- **Time-series data export** in CSV/JSON formats

#### 5. Data Management
- **JSON-based model serialization** (similar to CloudFormation/Draw.io format)
- **Web File API integration** for:
  - Save models to local filesystem
  - Load existing models
  - Export simulation results
  - Import custom symbols
- **Model versioning** and metadata tracking
- **Auto-save functionality** with recovery
- **Model validation** on load/save

#### 6. User Interface Components
- **Stencil palette** - Collapsible panel with symbol categories
- **Properties panel** - Node/connection parameter editing
- **Simulation dashboard** - Controls and real-time charts
- **File management interface** - New, open, save, save-as operations
- **Toolbar** - Common editing tools and actions
- **Status bar** - Current mode, cursor position, zoom level
- **Context menus** - Right-click actions for canvas and elements

## Development Environment
This project uses [Vite.js](https://vitejs.dev/) for its development server and build processes, providing a fast and modern development experience. For testing, we use [Vitest](https://vitest.dev/), a Vite-native testing framework.

All new features, components, or significant code changes must be accompanied by unit tests to ensure code quality and maintainability.

Key commands:
- To start the development server: `npm run dev`
- To run tests: `npm test`

## Technical Architecture

### Web Components Structure
```
├── app-shell (main application container)
├── canvas-workspace (main drawing surface)
├── stencil-palette (symbol library)
├── properties-panel (parameter editor)
├── simulation-dashboard (controls and visualization)
├── file-manager (save/load operations)
├── symbol-library (SVG symbol management)
├── graph-engine (computational graph processor)
├── simulation-engine (numerical computation)
└── data-serializer (JSON model handling)
```

### Data Models

#### Model Document Structure
```json
{
  "metadata": {
    "id": "uuid",
    "name": "Model Name",
    "version": "1.0.0",
    "created": "timestamp",
    "modified": "timestamp",
    "author": "string",
    "description": "string"
  },
  "graph": {
    "nodes": [{
      "id": "uuid",
      "type": "symbol-type",
      "position": {"x": 0, "y": 0},
      "properties": {},
      "connections": []
    }],
    "edges": [{
      "id": "uuid",
      "source": "node-id",
      "target": "node-id",
      "properties": {}
    }]
  },
  "simulation": {
    "parameters": {},
    "timeSettings": {},
    "initialConditions": {}
  }
}
```

## Implementation Task List

### Phase 1: Core Infrastructure (Weeks 1-2)
- [x] **Task 1.1**: Set up project structure and build system
- [x] **Task 1.2**: Create base Web Components architecture
- [x] **Task 1.3**: Implement app-shell component with routing
- [x] **Task 1.4**: Create canvas-workspace component with SVG rendering (placeholder implemented)
- [ ] **Task 1.5**: Implement basic pan/zoom functionality
- [ ] **Task 1.6**: Set up event handling system for component communication

### Phase 2: Symbol System (Weeks 3-4)
- [x] **Task 2.1**: Create symbol-library Web Component (placeholder implemented)
- [ ] **Task 2.2**: Design and implement Odum symbol SVG library
- [ ] **Task 2.3**: Build stencil-palette component with drag initiation
- [ ] **Task 2.4**: Implement drag-and-drop system for symbol placement
- [ ] **Task 2.5**: Create symbol instance management (select, move, delete)
- [ ] **Task 2.6**: Add custom symbol import functionality

### Phase 3: Graph Editing (Weeks 5-6)
- [ ] **Task 3.1**: Implement connection system between symbols
- [ ] **Task 3.2**: Create visual connection rendering (lines, arrows)
- [ ] **Task 3.3**: Add multi-select and group operations
- [ ] **Task 3.4**: Implement copy/paste functionality
- [ ] **Task 3.5**: Create undo/redo system with command pattern
- [ ] **Task 3.6**: Add grid snap and alignment tools

### Phase 4: Properties and Configuration (Weeks 7-8)
- [ ] **Task 4.1**: Build properties-panel Web Component
- [ ] **Task 4.2**: Create parameter input system for nodes
- [ ] **Task 4.3**: Implement validation system for parameters
- [ ] **Task 4.4**: Add mathematical expression parser
- [ ] **Task 4.5**: Create connection properties editor
- [ ] **Task 4.6**: Implement symbol library management UI

### Phase 5: Computational Graph Engine (Weeks 9-11)
- [ ] **Task 5.1**: Design and implement DAG data structure
- [ ] **Task 5.2**: Create graph-engine Web Component
- [ ] **Task 5.3**: Implement topological sorting for execution order
- [ ] **Task 5.4**: Build node computation system
- [ ] **Task 5.5**: Add dependency tracking and change propagation
- [ ] **Task 5.6**: Create graph validation and cycle detection

### Phase 6: Simulation Engine (Weeks 12-14)
- [ ] **Task 6.1**: Implement simulation-engine Web Component
- [ ] **Task 6.2**: Create numerical integration algorithms
- [ ] **Task 6.3**: Build time-series computation system
- [ ] **Task 6.4**: Implement simulation controls and state management
- [ ] **Task 6.5**: Add real-time visualization of results
- [ ] **Task 6.6**: Create batch simulation and analysis tools

### Phase 7: File Management (Weeks 15-16)
- [ ] **Task 7.1**: Implement data-serializer component
- [ ] **Task 7.2**: Create JSON model format and validation
- [ ] **Task 7.3**: Build file-manager Web Component
- [ ] **Task 7.4**: Integrate Web File API for save/load operations
- [ ] **Task 7.5**: Implement auto-save and recovery system
- [ ] **Task 7.6**: Add model export/import functionality

### Phase 8: Simulation Dashboard (Weeks 17-18)
- [ ] **Task 8.1**: Create simulation-dashboard Web Component
- [ ] **Task 8.2**: Implement real-time charting (native SVG/Canvas)
- [ ] **Task 8.3**: Build simulation parameter controls
- [ ] **Task 8.4**: Add data export functionality
- [ ] **Task 8.5**: Create analysis tools interface
- [ ] **Task 8.6**: Implement result visualization options

### Phase 9: User Experience (Weeks 19-20)
- [ ] **Task 9.1**: Implement responsive design and mobile support
- [ ] **Task 9.2**: Add keyboard shortcuts and accessibility
- [ ] **Task 9.3**: Create user tutorials and help system
- [ ] **Task 9.4**: Implement theme system and customization
- [ ] **Task 9.5**: Add context menus and toolbar enhancements
- [ ] **Task 9.6**: Performance optimization and testing

### Phase 10: Advanced Features (Weeks 21-22)
- [ ] **Task 10.1**: Add model comparison and diff tools
- [ ] **Task 10.2**: Implement parameter sensitivity analysis
- [ ] **Task 10.3**: Create model template system
- [ ] **Task 10.4**: Add collaboration features (offline-first)
- [ ] **Task 10.5**: Implement plugin architecture for extensions
- [ ] **Task 10.6**: Create comprehensive testing suite

## LLM Developer Extension Points

To make the application easily extensible by LLM developers like Google's Jules:

### 1. Plugin Architecture
- Well-defined Web Component interfaces
- Event-driven communication system
- Standardized property and method signatures
- Clear documentation of extension points

### 2. Symbol Extension System
- JSON-based symbol definition format
- SVG template system for custom symbols
- Computation function registration API
- Parameter validation schema system

### 3. Simulation Extension Points
- Pluggable numerical methods
- Custom analysis functions
- Extensible visualization components
- Data processing pipeline hooks

### 4. Configuration-Driven Development
- JSON-based UI configuration
- Declarative symbol library definitions
- Template-based model generation
- Schema-driven validation system

## Success Criteria

1. **Functional completeness**: All core Odum systems modeling capabilities implemented
2. **Performance**: Smooth interaction with 100+ nodes and real-time simulation
3. **Usability**: Intuitive interface comparable to Draw.io/Miro
4. **Reliability**: Robust file handling and crash recovery
5. **Extensibility**: Clear APIs for adding new symbols and functions
6. **Offline capability**: Full functionality without internet connection
7. **Standards compliance**: Web standards compliant, cross-browser compatible

## Technical Notes

- Use Service Workers for offline functionality
- Implement efficient SVG rendering and manipulation
- Consider Canvas fallback for performance-critical operations
- Use Web Workers for computational simulation threads
- Implement proper memory management for large models
- Follow accessibility guidelines (WCAG 2.1)
- Use semantic HTML and proper ARIA attributes
- Implement comprehensive error handling and user feedback
