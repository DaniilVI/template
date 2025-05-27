import { ItemTrackTable } from "../../types/ItemTrackTable";

interface ITrackTableProps {
    item: ItemTrackTable;
}

export const TracksTableRow = (props: ITrackTableProps) => {
    const {item} = props;
    return (
        <tr className="trackList__row">
            <td>
                <a href={item.album?.url || "https://www.last.fm"} className="trackList__album">
                    <img src={item.imgURL} alt={item.album?.title} loading="lazy" />
                </a>
            </td>
            <td className="trackList__name">
                <a href={item.track.url} className="trackList__nameLink">{item.track.name}</a>
            </td>
            <td className="trackList__artist">
                <a href={item.artist.url} className="trackList__artistLink">{item.track.artist}</a>
            </td>
            <td className="trackList__duration">{item.time}</td>
        </tr>
    );
};