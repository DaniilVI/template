import { ItemAlbumList } from "../../types/ItemAlbumList";
import { AlbumListItem } from "./AlbumListItem";

interface IAlbumList{
    albumList: ItemAlbumList[]
}

export const AlbumList = (props: IAlbumList) => {
    const {albumList} = props;
    return (
        <ol className="albumList">  
            {albumList.map((item)=>{
                return <AlbumListItem item = {item} key={item.id} />
            })}
        </ol>
    );
}