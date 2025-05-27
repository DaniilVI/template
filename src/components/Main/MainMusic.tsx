import { HotList } from "../HotList/HotList";
import { PopularList } from "../PopularList/PopularList";
import { ItemHotList } from "../../types/ItemHotList";
import { ItemPopularList } from "../../types/ItemPopularList";

interface IMainMusic{
    hotList: ItemHotList[];
    popularList: ItemPopularList[];
    hide: boolean;
}

export const MainMusic = (props: IMainMusic) => {
    const {hotList, popularList, hide} = props;
    const flag = hide ? '' : 'hide';
    return (
        <div className={`main__music ${flag}`}>
            <h1 className="main__head1">Music</h1>
            <h2 className="main__head2">Hot right now</h2>
            <HotList hotList={hotList} />
            <h2 className="main__head2">Popular tracks</h2>
            <PopularList popularList={popularList} />
        </div>
    );
};