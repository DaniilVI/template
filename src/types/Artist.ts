import { Image } from "./Image";

export type Artist = {
    image: Image[];
    url: string;
    name: string;
    listeners?: string;
}