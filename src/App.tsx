import React, { useEffect, useState } from 'react';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Main } from './components/Main/Main';
import { ItemArtistList } from './types/ItemArtistList';
import { addTrackItem, fetchArtistList, fetchTrackList } from './api/api';
import { addArtistItem } from './api/api';
import { ItemAlbumList } from './types/ItemAlbumList';
import { fetchAlbumList } from './api/api';
import { addAlbumItem } from './api/api';
import { ItemTrackTable } from './types/ItemTrackTable';

function App() {

    const [artistList, setArtistList] = useState<ItemArtistList[]>([]);
    const [albumList, setAlbumList] = useState<ItemAlbumList[]>([]);
    const [trackTable, setTrackTable] = useState<ItemTrackTable[]>([]);
    const [searchText, setSearchText] = useState("");
    const [hidden, setHidden] = useState<boolean>(true);
    const searchHandler = (text: string) => {
        setSearchText(text);
        setHidden(false);
    };
    useEffect(() => {
        async function fetchAndSetArtists() {
            const results = await fetchArtistList(searchText);
            if (
                results &&
                results.results &&
                results.results.artistmatches &&
                Array.isArray(results.results.artistmatches.artist)
            ) {
                const data = await addArtistItem(results.results.artistmatches.artist);
                setArtistList(data);
            } else {
                console.log('Результатов не найдено');
                setArtistList([]);
            }
        }
        if (searchText.trim() !== "") {
            fetchAndSetArtists();
        }
    }, [searchText]);

    useEffect(() => {
        async function fetchAndSetAlbums() {
            const results = await fetchAlbumList(searchText);
            if (
                results &&
                results.results &&
                results.results.albummatches &&
                Array.isArray(results.results.albummatches.album)
            ) {
                const data = await addAlbumItem(results.results.albummatches.album);
                setAlbumList(data);
            } else {
                console.log('Результатов не найдено');
                setAlbumList([]);
            }
        }
        if (searchText.trim() !== "") {
            fetchAndSetAlbums();
        }
    }, [searchText]);

    useEffect(() => {
        async function fetchAndSetTracks() {
            const results = await fetchTrackList(searchText);
            if (
                results &&
                results.results &&
                results.results.trackmatches &&
                Array.isArray(results.results.trackmatches.track)
            ) {
                const data = await addTrackItem(results.results.trackmatches.track);
                setTrackTable(data);
            } else {
                console.log('Результатов не найдено');
                setTrackTable([]);
            }
        }
        if (searchText.trim() !== "") {
            fetchAndSetTracks();
        }
    }, [searchText]);

    return (
        <div className="app">
            <Header onSubmit={searchHandler} />
            <Main hide={hidden} onSubmit={searchHandler} searchText={searchText} artistList={artistList} albumList={albumList} trackTable={trackTable} />
            <Footer />
        </div>
    );
}

export default App;
