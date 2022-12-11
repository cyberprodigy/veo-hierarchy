import React from 'react';
import VisGraph, {
  GraphData,
  GraphEvents,
  Options,
} from 'react-vis-graph-wrapper';
import { useNodes } from '../hooks/useNodes';
import { useEdges } from '../hooks/useUseEdges';
import { Edge as VisEdge, Node as VisNode } from 'vis-network';
import { Node } from '../../../shared/Node';
import { Edge } from '../../../shared/Edge';

function adaptNodeForVisualizer(node: Node): VisNode {
  return {
    id: node.id,
    label: node.name,
  };
}

function adaptEdgeForVisualizer(edge: Edge): VisEdge {
  return {
    from: edge.fromId,
    to: edge.toId,
  };
}

function NodeVisualizer() {
  const { nodes } = useNodes();
  const { edges } = useEdges();

  if (!nodes || !edges) {
    return <div>Loading...</div>;
  }
  const graph: GraphData = {
    nodes: nodes.map(adaptNodeForVisualizer),
    edges: edges.map(adaptEdgeForVisualizer),
  };

  const options: Options = {
    layout: {
      hierarchical: true,
    },
    edges: {
      color: '#000000',
    },
    height: '500px',
  };

  const events: GraphEvents = {
    select: (event: any) => {
      const { nodes, edges } = event;
      console.log(nodes, edges);
    },
  };
  return (
    <VisGraph
      graph={graph}
      options={options}
      events={events}
      getNetwork={(network: any) => {
        //  if you want access to vis.js network api you can set the state in a parent component using this property
        console.log(network);
      }}
    />
  );
}

export default NodeVisualizer;
