import { Tag } from "../../types/Tag";

interface ITagListItemProps {
    item: Tag;
}

export const TagListItem = (props: ITagListItemProps) => {
    const {item} = props;
    return (
        <li className="main__tagItem">
            <a href={`${item.url}`} className="main__linkCard main__tag">{item.name}</a>
            {' '}
        </li>
    );
};