import { Image } from "./Image";

export type Album = {
    name?: string;
    title?: string;
    artist: string;
    image: Image[];
    url: string;
}