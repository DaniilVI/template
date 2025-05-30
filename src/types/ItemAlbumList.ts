import { Album } from "./Album";
import { Artist } from "./Artist";

export type ItemAlbumList = {
    album: Album;
    artist: Artist;
    imgURL: string;
    id: number;
}