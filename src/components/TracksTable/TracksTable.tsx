import { ItemTrackTable } from "../../types/ItemTrackTable";
import { TracksTableRow } from "./TracksTableRow";

interface ITrackTable{
    trackTable: ItemTrackTable[];
}

export const TracksTable = (props: ITrackTable) =>{
    const {trackTable} = props;
    return (
        <tbody className="trackList">
            {trackTable.map((item)=>{
                return <TracksTableRow item = {item} key={item.id} />
            })}
        </tbody>
    );
}