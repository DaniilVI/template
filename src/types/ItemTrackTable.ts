import { Album } from "./Album";
import { Artist } from "./Artist";
import { Track } from "./Track";

export type ItemTrackTable = {
    track: Track;
    artist: Artist;
    album?: Album;
    imgURL: string;
    time: string;
    id: number;
}