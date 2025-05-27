import { ItemPopularList } from "../../types/ItemPopularList";
import { PopularListItem } from "./PopularListItem";

interface IPopularList{
    popularList: ItemPopularList[]
}

export const PopularList = (props: IPopularList) => {
    const {popularList} = props;
    return (
        <ol className="main__popularList">  
            {popularList.map((item)=>{
                return <PopularListItem item = {item} key={item.id} />
            })}
        </ol>
    );
}