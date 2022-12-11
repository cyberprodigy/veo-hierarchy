export type Node = {
    id: number;
    name: string;
    parentId: number | null;
    children: Node[];
}