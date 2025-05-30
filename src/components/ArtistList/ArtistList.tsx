import { ItemArtistList } from "../../types/ItemArtistList";
import { ArtistListItem } from "./ArtistListItem";

interface IArtistList{
    artistList: ItemArtistList[]
}

export const ArtistList = (props: IArtistList) => {
    const {artistList} = props;
    return (
        <ol className="artistList">  
            {artistList.map((item)=>{
                return <ArtistListItem item = {item} key={item.id} />
            })}
        </ol>
    );
}