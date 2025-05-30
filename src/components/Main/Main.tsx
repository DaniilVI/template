import { useEffect, useState } from "react";
import { ItemHotList } from "../../types/ItemHotList";
import { fetchHotList } from "../../api/api";
import { addArtist } from "../../api/api";
import { MainSearchSpace } from "./MainSearchSpace";
import { ItemPopularList } from "../../types/ItemPopularList";
import { fetchPopularList } from "../../api/api";
import { addTrack } from "../../api/api";
import { MainMusic } from "./MainMusic";
import { ItemArtistList } from "../../types/ItemArtistList";
import { ItemAlbumList } from "../../types/ItemAlbumList";
import { ItemTrackTable } from "../../types/ItemTrackTable";

interface IMain{
    hide: boolean;
    searchText: string;
    artistList: ItemArtistList[];
    albumList: ItemAlbumList[];
    trackTable: ItemTrackTable[];
    onSubmit: (value: string)=> void;
}

export const Main = (props: IMain) => {
    const {hide, searchText, artistList, albumList, trackTable, onSubmit} = props;
    const [hotList, setHotList] = useState<ItemHotList[]>([]);
    const [popularList, setPopularList] = useState<ItemPopularList[]>([]);

    useEffect(() => {
        fetchHotList().then(
            (result) => {
                if (result && result.artists && Array.isArray(result.artists.artist)) {
                    const data = addArtist(result.artists.artist);
                    setHotList(data);
                } else {
                    setHotList([]);
                }
            }
        );
    }, []);

    useEffect(() => {
        fetchPopularList().then(
            (result) => {
                if (result && result.tracks && Array.isArray(result.tracks.track)) {
                    const data = addTrack(result.tracks.track);
                    setPopularList(data);
                } else {
                    setPopularList([]);
                }
            }
        );
    }, []);

    return (
        <main className="main">
            <MainMusic hotList={hotList} popularList={popularList} hide={hide}/>
            <MainSearchSpace hide={hide} onSubmit={onSubmit} searchTextHeader={searchText} artistList={artistList} albumList={albumList} trackTable={trackTable}/>
        </main>
    );
};