import { Artist } from "./Artist";
import { Track } from "./Track";

export type ItemPopularList = {
    track: Track;
    artist: Artist;
    imgURL: string;
    id: number;
}