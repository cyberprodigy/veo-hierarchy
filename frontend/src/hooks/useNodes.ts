import { Node } from './../../../shared/Node';
import { useEffect, useState } from 'react';

export function useNodes() {
  const [nodes, setNodes] = useState<Node[]>([]);

  useEffect(() => {
    let unmounted = false;
    fetch('http://localhost:4000/getAllNodes')
      .then((response) => response.json())
      .then((data) => {
        if (unmounted) {
          return;
        }
        setNodes(data);
      });

    return () => {
      unmounted = true;
    };
  }, []);

  return { nodes };
}
