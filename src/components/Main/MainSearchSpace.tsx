import { useState } from "react";
import { MainForm } from "../MainForm/MainForm";
import { ArtistList } from "../ArtistList/ArtistList";
import { ItemArtistList } from "../../types/ItemArtistList";
import { AlbumList } from "../AlbumList/AlbumList";
import { ItemAlbumList } from "../../types/ItemAlbumList";
import { TracksTable } from "../TracksTable/TracksTable";
import { ItemTrackTable } from "../../types/ItemTrackTable";

interface ISpace {
    hide: boolean;
    searchTextHeader: string;
    artistList: ItemArtistList[];
    albumList: ItemAlbumList[];
    trackTable: ItemTrackTable[];
    onSubmit: (value: string) => void;
}

export const MainSearchSpace = (props: ISpace) => {
    const { hide, searchTextHeader, artistList, albumList, trackTable, onSubmit } = props;
    const flag = hide ? 'hide' : '';

    return (
        <div className={`main__searchSpace ${flag}`}>
            <div className="accordion">
                <h1 className="main__searchHead1">Search results for “{searchTextHeader}”</h1>
                <MainForm onSubmit={onSubmit} />
                <h2><span className="main__headLink">Artists</span></h2>
                {artistList.length > 0 ? (
                    <ArtistList artistList={artistList} />
                ) : (
                    <p className="message">No artists found.</p>
                )}
                <h2><span className="main__headLink">Albums</span></h2>
                {albumList.length > 0 ? (
                    <AlbumList albumList={albumList} />
                ) : (
                    <p className="message">No albums found.</p>
                )}
                <h2><span className="main__headLink">Tracks</span></h2>
                {trackTable.length > 0 ? (
                    <table className="trackListTable">
                        <thead className="trackList__head">
                            <tr>
                                <th>Album</th>
                                <th>Track name</th>
                                <th>Artist name</th>
                                <th>Duration</th>
                            </tr>
                        </thead>
                        <TracksTable trackTable={trackTable}/>
                    </table>
                ) : (
                    <p className="message">No tracks found.</p>
                )}
            </div>
            <div className="space">
            </div>
        </div>
    );
};