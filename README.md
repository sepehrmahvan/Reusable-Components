# Tree Chart Application

A React-based organizational chart application with UUID-based node identification.

## Features

- **Interactive Tree Chart**: Add, edit, and delete organizational positions
- **UUID System**: Each node has a unique MongoDB-like ObjectId
- **Backend Ready**: IDs are compatible with database operations
- **Responsive Design**: Works on desktop and mobile devices

## UUID System Implementation

The application now uses a MongoDB-like ObjectId system for node identification:

### ObjectId Format
Each node ID is a 24-character hexadecimal string:
- **Timestamp** (8 chars): Unix timestamp in hex
- **Random Part** (8 chars): Random hex string  
- **Counter** (8 chars): Random counter in hex

### Benefits
- ✅ **Unique Identification**: No conflicts when adding/removing nodes
- ✅ **Backend Compatible**: Works seamlessly with MongoDB and other databases
- ✅ **Relationship Tracking**: Easy to track parent-child relationships
- ✅ **Scalable**: Supports unlimited nodes without ID conflicts

### Utility Functions

```typescript
// Generate a new ObjectId
generateObjectId(): string

// Find node by ID
findNodeById(nodes: OrgNode[], targetId: string): OrgNode | null

// Find parent node by child ID
findParentById(nodes: OrgNode[], targetId: string): OrgNode | null

// Add IDs to existing tree structure
addIdsToTree(nodes: RawOrgNode[]): OrgNode[]

// Log tree structure with IDs (debugging)
logTreeWithIds(nodes: OrgNode[], level?: number): void
```

## Data Structure

```typescript
export type OrgNode = {
    id: string;        // MongoDB-like ObjectId
    title: string;     // Node title/position
    children?: OrgNode[]; // Child nodes
};
```

## Usage

1. **Adding Nodes**: Click the + buttons around any node to add children or siblings
2. **Editing Nodes**: Click on a node title to open edit overlay
3. **Deleting Nodes**: Click on a node title and use the delete button
4. **Navigation**: Use the stepper to move between different views

## Development

```bash
npm install
npm run dev
```

The application will start on `http://localhost:3000`

## Backend Integration

When sending data to your backend:

```typescript
// Example API call
const saveNode = async (node: OrgNode) => {
  const response = await fetch('/api/nodes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: node.id,           // MongoDB ObjectId
      title: node.title,
      parentId: parent?.id,  // Reference to parent
      children: node.children?.map(child => child.id)
    })
  });
  return response.json();
};
```

## File Structure

```
components/
├── TreeChart/page.tsx      # Main tree chart component
├── Define/page.tsx         # Define page with tree operations
├── Define/DefineContent.tsx # Content wrapper
└── Base/BaseDataGrid/      # Data grid components

utils/
└── data.ts                # Data types and UUID utilities
```

## Recent Changes

- ✅ Implemented UUID-based node identification
- ✅ Updated all components to use ID-based operations
- ✅ Added utility functions for node management
- ✅ Maintained backward compatibility
- ✅ Added comprehensive documentation
