import { ItemArtistList } from "../../types/ItemArtistList";

interface IArtistListProps{
    item: ItemArtistList;
}

export const ArtistListItem = (props: IArtistListProps) => {
    const { item } = props;
    return (
        <li className="artistListItem">
            <img src={item.imgURL} alt={`Image for ${item.artist.name}`} loading="lazy" />
                <div className="artistListItemDetails">
                    <p>
                        <a href={item.artist.url} className="artistLink" title={item.artist.name}>
                            {item.artist.name}
                        </a>
                    </p>
                    <p>
                        {item.artist.listeners}
                        <span>{' '}listeners</span>
                    </p>
                </div>
                <a href={item.artist.url} className="avatarLink" tabIndex={-1} aria-hidden="true"></a>
        </li>
    );
};