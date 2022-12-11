// implement dbMock with curd operations

type Node = {
    id: number;
    name: string;
    parent: Node | null;
    children: Node[];
}

let nextId = 2;

const rootNode: Node = {
    id: 1,
    name: "CEO",
    parent: null,
    children: []
}

export const dbMock = {
    createNode: (node: Pick<Node, 'name' >, parrentNodeId: number) => {
        const parrentNode = findElementInGraphById(rootNode, parrentNodeId);
        if (parrentNode) {
            const newNode = {
                ...node,
                parent: parrentNode,
                children: [],
                id: nextId
            }
            parrentNode.children.push(newNode);
            nextId++;
            return Promise.resolve(node);
        }

        return Promise.resolve(null);
    },

    getNode: (id: number) => {
        findElementInGraphById(rootNode, id)
        return Promise.resolve(rootNode);
    }
}

function findElementInGraphById(graph: Node, id: number): Node | null {
    if (graph.id === id) {
        return graph;
    }
    for (let i = 0; i < graph.children.length; i++) {
        const found = findElementInGraphById(graph.children[i], id);
        if (found) {
            return found;
        }
    }
    return null;
}


