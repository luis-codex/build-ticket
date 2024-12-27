export type ListImage = {
    path: string;
    name: string;
    category: string;
    extensions: ("jpg" | "jpeg" | "png" | "gif" | "svg" | "webp")[];
    id: string;
} 