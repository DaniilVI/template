import { Image } from "./Image";
import { Artist } from "./Artist";
import { Album } from "./Album";

export type Track = {
    name: string;
    image: Image[];
    url: string;
    artist: Artist | string;
    album?: Album;
    duration?: string;
}