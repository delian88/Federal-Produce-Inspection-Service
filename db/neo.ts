
/**
 * NEO GRAPH DATABASE SIMULATOR
 * Tracks relationships between Agents, Markets, Exporters, and Inspection Points.
 */

export interface Node {
  id: string;
  label: string;
  properties: any;
}

export interface Relationship {
  from: string;
  to: string;
  type: string;
}

class NeoSim {
  private nodes: Map<string, Node> = new Map();
  private relationships: Relationship[] = [];

  constructor() {
    this.load();
  }

  private save() {
    localStorage.setItem('neo_nodes', JSON.stringify(Array.from(this.nodes.entries())));
    localStorage.setItem('neo_rels', JSON.stringify(this.relationships));
  }

  private load() {
    const nodes = localStorage.getItem('neo_nodes');
    const rels = localStorage.getItem('neo_rels');
    if (nodes) this.nodes = new Map(JSON.parse(nodes));
    if (rels) this.relationships = JSON.parse(rels);
  }

  createNode(label: string, id: string, props: any) {
    this.nodes.set(id, { id, label, properties: props });
    this.save();
  }

  createRelationship(from: string, to: string, type: string) {
    this.relationships.push({ from, to, type });
    this.save();
  }

  // Cypher-like query simulation: "MATCH (a)-[:COLLECTS_FROM]->(m) RETURN m"
  getConnections(nodeId: string, type?: string) {
    return this.relationships
      .filter(r => r.from === nodeId && (!type || r.type === type))
      .map(r => this.nodes.get(r.to));
  }
}

export const neo = new NeoSim();
