import { Artist } from "../types/Artist";
import { Track } from "../types/Track";
import { Album } from "../types/Album";
import { Tag } from "../types/Tag";
import { ItemHotList } from "../types/ItemHotList";
import { ItemPopularList } from "../types/ItemPopularList";
import { ItemArtistList } from "../types/ItemArtistList";
import { ItemAlbumList } from "../types/ItemAlbumList";
import { ItemTrackTable } from "../types/ItemTrackTable";


const $API_key: string = "402edf32f4223834b83b71ccb849f0e0";
const $API_path: string = "https://ws.audioscrobbler.com/2.0/?method=";

/**
* Запрос списка топ 12 исполнителей
*
* @returns {Promise<any>} 
*/
export async function fetchHotList() {
    try {
        const response = await fetch(`${$API_path}chart.gettopartists&format=json&api_key=${$API_key}&limit=12`);
        if (response.status !== 200) {
            throw new Error('Something went wrong');
        }
        const artistList = await response.json();
        if (artistList) {
            return artistList;
        }
        else {
            console.log("Ошибка получения топ 12 исполнителей");
            return null;
        }
    } catch (err) {
        return null;
    }
}
/**
* Формирование элемента списка топа исполнителей
* @param {Artist[]} artists список исполнителей для добавления
* @returns {ItemHotList[]} специальный список для встраивания напрямую
*/
export function addArtist(artists: Artist[]): ItemHotList[] {
    return artists.map(artist => {
        const image = artist.image?.find(img => img.size === 'large');
        const imgURL = image?.['#text'] || "";
        return {
            artist,
            imgURL,
            id: Math.random()
        };
    });
}

/**
* Формирование элемента списка топа треков
* @param {Track[]} tracks список треков для добавления
* @returns {ItemPopularList[]} специальный список для встраивания напрямую
*/
export function addTrack(tracks: Track[]): ItemPopularList[] {
    return tracks.map(track => {
        const image = track.image?.find(img => img.size === 'large');
        const imgURL = image?.['#text'] || "";
        const artist = track.artist as Artist;
        return {
            track,
            artist,
            imgURL,
            id: Math.random()
        };
    });
}

/**
* Запрос топа тегов заданного исполнителя
*
* @param {string} artist имя исполнителя для поиска
* @returns {Promise<any>} 
*/
export async function fetchTags(artist: string) {
    try {
        const response = await fetch(`${$API_path}artist.gettoptags&artist=${artist}&api_key=${$API_key}&format=json`);
        if (response.status !== 200) {
            throw new Error('Something went wrong');
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(`Ошибка получения тегов для исполнителя ${artist}`);
        return null;
    }
}

/**
* Формирование списка тегов
* @param { Tag[]} tags список тегов
* @returns {Tag[]} отредактированный список тегов
*/
export function addTag(tags: Tag[]): Tag[] {
    return tags.map(tag => {
        return {
            name: tag.name,
            url: tag.url,
            id: Math.random()
        };
    });
}

/**
* Запрос тегов заданного трека данного исполнителя
*
* @param {string} track название трека для поиска
* @param {string} artist имя исполнителя для поиска
* @returns {Promise<any>} 
*/
export async function fetchTrackTags(track: string, artist: string) {
    try {
        const response = await fetch(`${$API_path}track.gettoptags&artist=${artist}&track=${track}&api_key=${$API_key}&format=json`);
        if (response.status !== 200) {
            throw new Error('Something went wrong');
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(`Ошибка получения тегов для трека ${track}`);
        return null;
    }
}

/**
* Запрос списка топ 12 треков
*
* @returns {Promise<any>} 
*/
export async function fetchPopularList() {
    try {
        const response = await fetch(`${$API_path}chart.gettoptracks&format=json&api_key=${$API_key}&limit=12`);
        if (response.status !== 200) {
            throw new Error('Something went wrong');
        }
        const trackList = await response.json();
        if (trackList) {
            return trackList;
        }
        else {
            console.log("Ошибка получения топ 12 треков");
            return null;
        }
    } catch (err) {
        return null;
    }
}

/**
* Запрос списка исполнителей, соответствующих введённой строке
*
* @param {string} text_search Введённая строка для поиска
* @returns {Promise<any>} 
*/
export async function fetchArtistList(text_search: string) {
    try {
        const response = await fetch(`${$API_path}artist.search&artist=${text_search}&api_key=${$API_key}&format=json&limit=8`);
        if (response.status !== 200) {
            throw new Error('Something went wrong');
        }
        const artistList = await response.json();
        if (artistList) {
            return artistList;
        }
        else {
            return null;
        }
    } catch (err) {
        console.log("Ошибка получения исполнителей");
        return null;
    }
}

/**
* Формирование списка исполнителей
* @param {Artist[]} artists список исполнителей
* @returns {Promise<ItemArtistList[]>} 
*/
export async function addArtistItem(artists: Artist[]): Promise<ItemArtistList[]> {
    return artists.map(artist => {
        const image = artist.image?.find(img => img.size === 'large');
        const imgURL = image?.['#text'] || "nullArtistImage.webp";
        return {
            artist,
            imgURL,
            id: Math.random()
        };
    });
}

/**
* Запрос списка альбомов, соответствующих введённой строке
*
* @param {string} text_search Введённая строка для поиска
* @returns {Promise<any>} 
*/
export async function fetchAlbumList(text_search: string) {
    try {
        const response = await fetch(`${$API_path}album.search&album=${text_search}&api_key=${$API_key}&format=json&limit=8`);
        if (response.status !== 200) {
            throw new Error('Something went wrong');
        }
        const albumList = await response.json();
        if (albumList) {
            return albumList;
        }
        else {
            return null;
        }
    } catch (err) {
        console.log("Ошибка получения альбомов");
        return null;
    }
}

/**
* Формирование списка альбомов
* @param {Album[]} albums список альбомов
* @returns {Promise<ItemAlbumList[]>} 
*/
export async function addAlbumItem(albums: Album[]): Promise<ItemAlbumList[]> {
    const results = await Promise.all(
        albums.map(async album => {
            const image = album.image?.find(img => img.size === 'large');
            const imgURL = image?.['#text'] || 'nullAlbumImage.webp';
            const artistData = await fetchArtist(album.artist);
            const artist = artistData?.artist || null;
            return {
                album,
                artist,
                imgURL,
                id: Math.random()
            };
        })
    );
    return results;
}

/**
* Запрос информации об исполнителе
*
* @param {string} artist имя исполнителя для поиска
* @returns {Promise<any>} 
*/
async function fetchArtist(artist: string) {
    try {
        const response = await fetch(`${$API_path}artist.getinfo&artist=${artist}&api_key=${$API_key}&format=json`);
        if (response.status !== 200) {
            throw new Error('Something went wrong');
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(`Ошибка получения информации для ${artist}`);
        return null;
    }
}

/**
* Запрос списка треков, соответствующих введённой строке
*
* @param {string} text_search Введённая строка для поиска
* @returns {Promise<any>} 
*/
export async function fetchTrackList(text_search: string) {
    try {
        const response = await fetch(`${$API_path}track.search&track=${text_search}&api_key=${$API_key}&format=json&limit=10`);
        if (response.status !== 200) {
            throw new Error('Something went wrong');
        }
        const trackList = await response.json();
        if (trackList) {
            return trackList;
        }
        else {
            return null;
        }
    } catch (err) {
        console.log("Ошибка получения треков");
        return null;
    }
}
/**
* Формирование строки таблицы поиска треков
*
* @param {Track[]} tracks список треков для добавления
* @returns {Promise<ItemTrackTable[]>} 
*/
export async function addTrackItem(tracks: Track[]): Promise<ItemTrackTable[]> {
    const results = await Promise.all(
        tracks.map(async (track) => {
            const info: Track = (await fetchInfo(track)).track;
            const album = info?.album;
            const artist = info.artist as Artist;
            const image = album?.image.find(img => img.size === 'small');
            const imgURL = image?.['#text'] || "nullAlbumImage.webp";
            let time = "";
            if (info.duration && info.duration !== '0') {
                const ms = parseInt(info.duration, 10);
                const totalSec = Math.floor(ms / 1000);
                const minutes = Math.floor(totalSec / 60);
                const seconds = totalSec % 60;
                time = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            }
            return {
                album,
                artist,
                track,
                imgURL,
                time,
                id: Math.random(),
            };
        })
    );
    return results;
}

/**
* Запрос информации о треке заданного исполнителя
*
* @param {Track} track трек для поиска
* @returns {Promise<any>} 
*/
async function fetchInfo(track: Track) {
    try {
        if (track.name[0] === "#") {
            track.name = track.name.slice(1);
        }
        const response = await fetch(`${$API_path}track.getInfo&artist=${(track.artist as string)}&track=${track.name}&api_key=${$API_key}&format=json`);
        if (response.status !== 200) {
            throw new Error('Something went wrong');
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(`Ошибка получения информации для трека ${track.name}`);
        return null;
    }
}