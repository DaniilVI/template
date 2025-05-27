import { useState } from "react";

interface IHeaderForm {
    onSubmit: (value: string) => void;
}

export const HeaderForm = (props: IHeaderForm) => {
    const {onSubmit} = props;
    const [searchText, setSearchText] = useState<string>("");
    const handleSubmit = (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const text = formData.get('search') as string || '';
        if (text.length < 1)
        {
            return;
        }
        onSubmit(text);
    };
    return (
        <form className="header__form" method="get" onSubmit={handleSubmit}>
            <input type="search" name="search" className="header__input" placeholder="Search" />
            <button type="submit" className="search__button"></button>
        </form>
    );
};