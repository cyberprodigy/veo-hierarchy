// implement dbMock with curd operations

type Node = {
    id: number;
    name: string;
    parentId: number | null;
    children: Node[];
}

type Edge = {
    fromId: number;
    toId: number;
}

let nextId = 2;

const rootNode: Node = {
    id: 1,
    name: "root",
    parentId: null,
    children: [ {
        id: 2,
        name: "a",
        parentId: 1,
        children: [
            {
                id: 4,
                name: "c",
                parentId: 2,
                children: [
                    {
                        id: 5,
                        name: "d",
                        parentId: 4,
                        children: []
                    },
                    {
                        id: 6,
                        name: "e",
                        parentId: 4,
                        children: []
                    }
                ]
            }
        ]
    },  {
        id: 3,
        name: "b",
        parentId: 1,
        children: []
    }]
}

export const dbMock = {
    createNode: (node: Pick<Node, 'name' >, parentNodeId: string) => {
        const parentId = parseInt(parentNodeId);
        const parrentNode = getNodeById(rootNode, parentId);
        if (parrentNode) {
            const newNode = {
                ...node,
                parentId: parentId,
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
        getNodeById(rootNode, id)
        return Promise.resolve(rootNode);
    },

    getAllNodes: () => {
        return Promise.resolve(rootNode);
    },

    getAllEdges: () => {
        return Promise.resolve(getAllEdges(rootNode));
    }
}

function getNodeById(graph: Node, id: number): Node | null {
    if (graph.id === id) {
        return graph;
    }
    for (let i = 0; i < graph.children.length; i++) {
        const found = getNodeById(graph.children[i], id);
        if (found) {
            return found;
        }
    }
    return null;
}


function getAllEdges(graph: Node): Edge[] {
    const edges: Edge[] = [];
    for (let i = 0; i < graph.children.length; i++) {
        edges.push({fromId: graph.id, toId: graph.children[i].id});
        edges.push(...getAllEdges(graph.children[i]));
    }
    return edges;
}
    

