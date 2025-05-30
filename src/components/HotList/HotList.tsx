import { ItemHotList } from "../../types/ItemHotList";
import { HotListItem } from "./HotListItem";

interface IHotList{
    hotList: ItemHotList[]
}

export const HotList = (props: IHotList) => {
    const {hotList} = props;
    return (
        <ol className="main__hotList">
            {hotList.map((item)=>{
                return <HotListItem item = {item} key={item.id} />
            })}
        </ol>
    );
}