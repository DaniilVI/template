import { useEffect, useState } from "react";
import { ItemPopularList } from "../../types/ItemPopularList";
import { Tag } from "../../types/Tag";
import { addTag } from "../../api/api";
import { TagList } from "../TagList/TagList";
import { fetchTrackTags } from "../../api/api";

interface IPopularListItemProps {
    item: ItemPopularList;
}

export const PopularListItem = (props: IPopularListItemProps) => {
    const { item } = props;
    const [tagList, setTagList] = useState<Tag[]>([]);
        useEffect(() => {
            fetchTrackTags(item.track.name, item.artist.name).then(
                (result) => {
                    if (result && result.toptags && Array.isArray(result.toptags.tag)) {
                        setTagList(addTag(result.toptags.tag.slice(0, 3)));
                    } else {
                        setTagList([]);
                    }
                }
            );
        }, []);
    return (
        <li className="main__popularListItem">
            <h3 className="main__head3">
                <a href={item.track.url} className="main__linkCard">{item.track.name}</a>
            </h3>
            <p>
                <span><a href={item.artist.url} className="main__linkCard main__artistTag">{item.artist.name}</a></span>
            </p>
            <TagList tagList={tagList}/>
            <div className="avatarKvadro">
                <span>
                    <img src={item.imgURL} alt="echo" loading="lazy" />
                </span>
            </div>
            <a href={item.track.url} tabIndex={-1} className="avatarKvadroLink"></a>
        </li>
    );
};