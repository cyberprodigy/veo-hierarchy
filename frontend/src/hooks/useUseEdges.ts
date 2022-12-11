import { Edge } from '../../../shared/Edge';
import { useEffect, useState } from 'react';

export function useEdges() {
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    let unmounted = false;

    fetch('http://localhost:4000/getAllEdges')
      .then((response) => response.json())
      .then((data) => {
        if (unmounted) {
          return;
        }
        setEdges(data);
      });

    return () => {
      unmounted = true;
    };
  }, []);

  return { edges };
}
