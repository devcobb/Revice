export interface Category {
    name: string;
}

export interface TextField {
    [key: string]: string | number;
    type: 'text';
    value: string;
    id: number;
    title: string;
}

export interface ImageField {
    [key: string]: string | number;
    type: 'image';
    src: string;
    id: number;
}

export interface BannerField {
    [key: string]: string | number;
    type: 'banner';
    src: string;
    value: string;
    id: number;
    title: string;
    arrangement: "image-text" | "text-image"
}

export interface Post {
    author: string;
    thumbnail: string;
    title: string;
    id: string;
    postPrivate: boolean;
    fields: (TextField | ImageField | BannerField)[];
    url: string;
    userUrl: string;
}

export interface Star {
    half: boolean;
    filled: boolean;
    id: number;
}