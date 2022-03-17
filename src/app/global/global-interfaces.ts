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

export interface PossibleErrors {
    noFieldsAdded: boolean,
    titleLength: boolean,
    noThumbnail: boolean,
    noRatings: boolean,
    userNotExists: boolean,
    textFieldLength: boolean,
    imageFieldNoData: boolean,
    bannerNoData: boolean
}

export enum EPossibleErrors {
    textFieldLength = "Please fill field with data. Title should be at least 5 characters long and maximum 50 characters, main text should be at least 10 characters long and maximum 550 characters",
    imageFieldNoData = "Please fill field with data. To add image just click the field and choose file from your computer",
    bannerNoData = `Title should be at least 5 characters long and maximum 50 characters, main text should be at least 10 characters long and maximum 550 characters. To add 
    image just click the field and choose file from your computer`,
    noFieldsAdded = "Please add fields to your post. It should have at least one added field of some kind.",
    titleLength = "Please fill post's title field. It should be at least 5 characters long and maximum 50 characters.",
    noThumbnail = "Please add thumbnail of your post.",
    noRatings = "Please add rating of your post. It should have at least a half star rating.",
    userNotExists = "Please sign in to add new post.",
}