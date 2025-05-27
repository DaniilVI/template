import { Tag } from "../../types/Tag";
import { TagListItem } from "./TagListItem";

interface ITagList {
    tagList: Tag[]
}

export const TagList = (props: ITagList) => {
    const { tagList } = props;
    return (
        <ul className="main__tagList">
            {tagList.map((item) => {
                return <TagListItem item={item} key={item.id} />;
            })}
        </ul>
    );
};