import { ItemAlbumList } from "../../types/ItemAlbumList";

interface IAlbumListProps {
    item: ItemAlbumList;
}

export const AlbumListItem = (props: IAlbumListProps) => {
    const { item } = props;
    return (
        <li className="albumListItem">
            <img src={item.imgURL} alt={`Image for ${item.album.name}`} loading="lazy" />
                <div className="albumListItemDetails">
                    <p>
                        <a href={item.album.url} className="albumLink" title={item.album.name}>
                            {item.album.name}
                        </a>
                    </p>
                    <p>
                        <a href={item.artist.url} className="artistLinkSecond" title={item.artist.name}>
                            {item.artist.name}
                        </a>
                    </p>
                </div>
                <a href={item.album.url} className="avatarLink" tabIndex={-1} aria-hidden="true"></a>
        </li>
    );
};