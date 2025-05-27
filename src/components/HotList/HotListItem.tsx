import { useEffect, useState } from "react";
import { ItemHotList } from "../../types/ItemHotList";
import { Tag } from "../../types/Tag";
import { TagList } from "../TagList/TagList";
import { fetchTags } from "../../api/api";
import { addTag } from "../../api/api";

interface IHotListItemProps {
    item: ItemHotList
}

export const HotListItem = (props: IHotListItemProps) => {
    const { item } = props;
    const [tagList, setTagList] = useState<Tag[]>([]);
    useEffect(() => {
        fetchTags(item.artist.name).then(
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
        <li className="main__artistsListItem">
            <div className="main__artistCard">
                <h3 className="main__head3">
                    <a href={`${item.artist.url}`} className="main__linkCard">{item.artist.name}</a>
                </h3>
                <ul className="main__tagList">
                    <TagList tagList={tagList} />
                </ul>
                <div className="main__mediaItem">
                    <span className="avatar">
                        <img src={`${item.imgURL}`} alt={`Avatar for ${item.artist.name}`} loading="lazy" />
                    </span>
                </div>
                <a href={`${item.artist.url}`} tabIndex={-1} className="avatarLink"></a>
            </div>
        </li>
    );
};