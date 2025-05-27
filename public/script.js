"use strict";
const $musicButton = document.querySelector('.header__music');
const $seachButton = document.querySelector('.search__button');
const $headerInput = document.querySelector('.header__input');
const $searchPage = document.querySelector('.main__searchSpace');
const $musicPage = document.querySelector('.main__music');
const $searchHead = document.querySelector('.main__searchHead1');
const $hotList = document.querySelector('.main__hotList');
const $popularList = document.querySelector('.main__popularList');
const $artistList = document.querySelector('.artistList');
const $albumList = document.querySelector('.albumList');
const $trackTable = document.querySelector('.trackList');
const $form = document.querySelector('.search__form');
const $formHeader = document.querySelector('.header__form');
const $formInput = document.querySelector('.search__field');
const $API_key = "402edf32f4223834b83b71ccb849f0e0";
$musicButton.addEventListener('click', (event) => {
    event.preventDefault();
    mainMusic();
    $searchPage.classList.add('hide');
    $musicPage.classList.remove('hide');
});
$formHeader.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = $headerInput.value;
    if (text.length < 1) {
        return;
    }
    $searchHead.textContent = `Search results for “${text}”`;
    $searchPage.classList.remove('hide');
    $musicPage.classList.add('hide');
    $headerInput.value = "";
    $formInput.value = text;
    mainSearch(text);
});
$form.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = $formInput.value;
    if (text.length < 1) {
        return;
    }
    $searchHead.textContent = `Search results for “${text}”`;
    mainSearch(text);
});
/**
* Формирование элемента списка топа исполнителей
* @param {Artist} artist исполнитель для добавления
* @returns {Promise<string>}
*/
async function addArtist(artist) {
    const image = artist.image.find(img => img.size === 'large');
    const imgURL = (image === null || image === void 0 ? void 0 : image['#text']) || "";
    const tags = await fetchTags(artist.name);
    const tagsTemplate = tags.toptags.tag.slice(0, 3)
        .map((tag) => `
            <li class="main__tagItem">
            <a href="${tag.url}" class="main__linkCard main__tag">${tag.name}</a>
            </li>
        `)
        .join('<span class="tag-separator">•</span>');
    const template = `
        <li class="main__artistsListItem">
            <div class="main__artistCard">
              <h3 class="main__head3">
                <a href="${artist.url}" class="main__linkCard">${artist.name}</a>
              </h3>
              <ul class="main__tagList">
                ${tagsTemplate}
              </ul>
              <div class="main__mediaItem">
                <span class="avatar">
                  <img src="${imgURL}" alt="Avatar for ${artist.name}" loading="lazy">
                </span>
              </div>
              <a href="${artist.url}" tabindex="-1" class="avatarLink"></a>
            </div>
        </li>
            `;
    return template;
}
/**
* Формирование элемента списка топа треков
* @param {Track} track трек для добавления
* @returns {Promise<string>}
*/
async function addTrack(track) {
    const image = track.image.find(img => img.size === 'medium');
    const imgURL = (image === null || image === void 0 ? void 0 : image['#text']) || "";
    const artist = track.artist;
    const tags = await fetchTrackTags(track.name, artist.name);
    const tagsTemplate = tags.toptags.tag.slice(0, 3)
        .map((tag) => `
            <li class="main__tagItem">
            <a href="${tag.url}" class="main__linkCard main__tag">${tag.name}</a>
            </li>
        `)
        .join('<span class="tag-separator">•</span>');
    const template = `
    <li class="main__popularListItem">
            <h3 class="main__head3">
              <a href="${track.url}" class="main__linkCard">${track.name}</a>
            </h3>
            <p>
              <span><a href="${artist.url}" class="main__linkCard main__artistTag">${artist.name}</a></span>
            </p>
            <ul class="main__tagList">
              ${tagsTemplate}
            </ul>
            <div class="avatarKvadro">
              <span>
                <img src="${imgURL}" alt="echo" loading="lazy">
              </span>
            </div>
            <a href="${track.url}" tabindex="-1" class="avatarKvadroLink"></a>
          </li>
            `;
    return template;
}
/**
* Формирование элемента списка поиска исполнителей
* @param {Artist} artist исполнитель для добавления
* @returns {Promise<string>}
*/
async function addArtistItem(artist) {
    const image = artist.image.find(img => img.size === 'large');
    const imgURL = (image === null || image === void 0 ? void 0 : image['#text']) || "nullArtistImage.webp";
    const template = `
        <li class="artistListItem">
            <img src="${imgURL}" alt="Image for ${artist.name}" loading="lazy">
            <div class="artistListItemDetails">
                <p>
                  <a href="${artist.url}" class="artistLink" title="${artist.name}">
                    ${artist.name}
                  </a>
                </p>
                <p>
                  ${artist.listeners}
                  <span>listeners</span>
                </p>
            </div>
            <a href="${artist.url}" class="avatarLink" tabindex="-1" aria-hidden="true"></a>
        </li>
            `;
    return template;
}
/**
* Формирование элемента списка поиска альбомов
* @param {Album} album альбом для добавления
* @returns {Promise<string>}
*/
async function addAlbumItem(album) {
    const image = album.image.find(img => img.size === 'large');
    const imgURL = (image === null || image === void 0 ? void 0 : image['#text']) || "nullAlbumImage.webp";
    const artist = (await fetchArtist(album.artist)).artist;
    const template = `
        <li class="albumListItem">
            <img src="${imgURL}" alt="Image for ${album.name}" loading="lazy">
            <div class="albumListItemDetails">
                <p>
                  <a href="${album.url}" class="albumLink" title="${album.name}">
                    ${album.name}
                  </a>
                </p>
                <p>
                  <a href="${artist.url}" class="artistLinkSecond" title="${artist.name}">
                    ${artist.name}
                  </a>
                </p>
            </div>
            <a href="${album.url}" class="avatarLink" tabindex="-1" aria-hidden="true"></a>
        </li>
            `;
    return template;
}
/**
* Формирование строки таблицы поиска треков
*
* @param {Track} track трек для добавления
* @returns {Promise<string>}
*/
async function addTrackItem(track) {
    const info = (await fetchInfo(track)).track;
    const album = info.album;
    const artist = info.artist;
    const image = album === null || album === void 0 ? void 0 : album.image.find(img => img.size === 'small');
    const imgURL = (image === null || image === void 0 ? void 0 : image['#text']) || "nullAlbumImage.webp";
    let time = "";
    if (info.duration && info.duration != '0') {
        const ms = parseInt(info.duration, 10);
        const totalSec = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSec / 60);
        const seconds = totalSec % 60;
        time = `${minutes}:${seconds}`;
    }
    const template = `
            <tr class="trackList__row">
                <td>
                  <a href="${(album === null || album === void 0 ? void 0 : album.url) || "https://www.last.fm"}" class="trackList__album">
                    <img src="${imgURL}" alt="${album === null || album === void 0 ? void 0 : album.title}" loading="lazy">
                  </a>
                </td>
                <td class="trackList__name">
                  <a href="${track.url}" class="trackList__nameLink">${track.name}</a>
                </td>
                <td class="trackList__artist">
                  <a href="${artist.url}" class="trackList__artistLink">${track.artist}</a>
                </td>
                <td class="trackList__duration">${time}</td>
            </tr>
            `;
    return template;
}
/**
* Запрос информации о треке заданного исполнителя
*
* @param {Track} track трек для поиска
* @returns {Promise<any>}
*/
async function fetchInfo(track) {
    try {
        if (track.name[0] == "#") {
            track.name = track.name.slice(1);
        }
        const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&artist=${track.artist}&track=${track.name}&api_key=${$API_key}&format=json`);
        if (response.status !== 200) {
            throw new Error('Something went wrong');
        }
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.log(`Ошибка получения информации для трека ${track}`);
        return null;
    }
}
/**
* Запрос топа тегов заданного исполнителя
*
* @param {string} artist имя исполнителя для поиска
* @returns {Promise<any>}
*/
async function fetchTags(artist) {
    try {
        const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist=${artist}&api_key=${$API_key}&format=json`);
        if (response.status !== 200) {
            throw new Error('Something went wrong');
        }
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.log(`Ошибка получения тегов для исполнителя ${artist}`);
        return null;
    }
}
/**
* Запрос тегов заданного трека данного исполнителя
*
* @param {string} track название трека для поиска
* @param {string} artist имя исполнителя для поиска
* @returns {Promise<any>}
*/
async function fetchTrackTags(track, artist) {
    try {
        const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=track.gettoptags&artist=${artist}&track=${track}&api_key=${$API_key}&format=json`);
        if (response.status !== 200) {
            throw new Error('Something went wrong');
        }
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.log(`Ошибка получения тегов для трека ${track}`);
        return null;
    }
}
/**
* Запрос информации об исполнителе
*
* @param {string} artist имя исполнителя для поиска
* @returns {Promise<any>}
*/
async function fetchArtist(artist) {
    try {
        const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=${$API_key}&format=json`);
        if (response.status !== 200) {
            throw new Error('Something went wrong');
        }
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.log(`Ошибка получения информации для ${artist}`);
        return null;
    }
}
/**
* Запрос списка топ 12 исполнителей
*
* @returns {Promise<any>}
*/
async function fetchHotList() {
    try {
        const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&format=json&api_key=${$API_key}&limit=12`);
        if (response.status !== 200) {
            throw new Error('Something went wrong');
        }
        const data = await response.json();
        return data;
    }
    catch (err) {
        return null;
    }
}
/**
* Запрос списка топ 12 треков
*
* @returns {Promise<any>}
*/
async function fetchPopularList() {
    try {
        const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&format=json&api_key=${$API_key}&limit=12`);
        if (response.status !== 200) {
            throw new Error('Something went wrong');
        }
        const data = await response.json();
        return data;
    }
    catch (err) {
        return null;
    }
}
/**
* Запрос списка исполнителей, соответствующих введённой строке
*
* @param {string} text_search Введённая строка для поиска
* @returns {Promise<any>}
*/
async function fetchArtistList(text_search) {
    try {
        const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${text_search}&api_key=${$API_key}&format=json&limit=8`);
        if (response.status !== 200) {
            throw new Error('Something went wrong');
        }
        const data = await response.json();
        return data;
    }
    catch (err) {
        return null;
    }
}
/**
* Запрос списка альбомов, соответствующих введённой строке
*
* @param {string} text_search Введённая строка для поиска
* @returns {Promise<any>}
*/
async function fetchAlbumList(text_search) {
    try {
        const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${text_search}&api_key=${$API_key}&format=json&limit=8`);
        if (response.status !== 200) {
            throw new Error('Something went wrong');
        }
        const data = await response.json();
        return data;
    }
    catch (err) {
        return null;
    }
}
/**
* Запрос списка треков, соответствующих введённой строке
*
* @param {string} text_search Введённая строка для поиска
* @returns {Promise<any>}
*/
async function fetchTrackList(text_search) {
    try {
        const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${text_search}&api_key=${$API_key}&format=json&limit=10`);
        if (response.status !== 200) {
            throw new Error('Something went wrong');
        }
        const data = await response.json();
        return data;
    }
    catch (err) {
        return null;
    }
}
/**
* Получение и заполнение топ 12 исполнителей и треков на главной странице.
*
* @returns {Promise<void>}
*/
async function mainMusic() {
    const artistList = await fetchHotList();
    const trackList = await fetchPopularList();
    if (artistList) {
        while ($hotList.firstChild) {
            $hotList.removeChild($hotList.firstChild);
        }
        const promises = artistList.artists.artist.map((artist) => addArtist(artist));
        const templates = await Promise.all(promises);
        const template = templates.join('');
        $hotList.insertAdjacentHTML('beforeend', template);
    }
    else {
        console.log("Ошибка получения топ 12 исполнителей");
    }
    if (trackList) {
        while ($popularList.firstChild) {
            $popularList.removeChild($popularList.firstChild);
        }
        const promises = trackList.tracks.track.map((track) => addTrack(track));
        const templates = await Promise.all(promises);
        const template = templates.join('');
        $popularList.insertAdjacentHTML('beforeend', template);
    }
    else {
        console.log("Ошибка получения топ 12 треков");
    }
}
/**
* Получение и заполнение результатов поиска.
*
* @param {string} text Введённая строка для поиска.
* @returns {Promise<void>}
*/
async function mainSearch(text) {
    const artists = await fetchArtistList(text);
    const albums = await fetchAlbumList(text);
    const tracks = await fetchTrackList(text);
    if (artists) {
        while ($artistList.firstChild) {
            $artistList.removeChild($artistList.firstChild);
        }
        const listArtists = artists.results.artistmatches.artist;
        if (listArtists.length == 0) {
            const template = `<p class="message">No artist found.</p>`;
            $artistList.insertAdjacentHTML('beforeend', template);
            return;
        }
        const promises = listArtists.map((artist) => addArtistItem(artist));
        const templates = await Promise.all(promises);
        const template = templates.join('');
        $artistList.insertAdjacentHTML('beforeend', template);
    }
    else {
        console.log("Ошибка получения исполнителей");
    }
    if (albums) {
        while ($albumList.firstChild) {
            $albumList.removeChild($albumList.firstChild);
        }
        const listAlbums = albums.results.albummatches.album;
        if (listAlbums.length == 0) {
            const template = `<p class="message">No albums found.</p>`;
            $albumList.insertAdjacentHTML('beforeend', template);
            return;
        }
        const promises = listAlbums.map((album) => addAlbumItem(album));
        const templates = await Promise.all(promises);
        const template = templates.join('');
        $albumList.insertAdjacentHTML('beforeend', template);
    }
    else {
        console.log("Ошибка получения альбомов");
    }
    if (tracks) {
        while ($trackTable.firstChild) {
            $trackTable.removeChild($trackTable.firstChild);
        }
        const listTracks = tracks.results.trackmatches.track;
        if (listTracks.length == 0) {
            const template = `<p class="message">No tracks found.</p>`;
            $trackTable.insertAdjacentHTML('beforeend', template);
            return;
        }
        const promises = listTracks.map((track) => addTrackItem(track));
        const templates = await Promise.all(promises);
        const template = templates.join('');
        $trackTable.insertAdjacentHTML('beforeend', template);
    }
    else {
        console.log("Ошибка получения треков");
    }
}
mainMusic();
//# sourceMappingURL=script.js.map