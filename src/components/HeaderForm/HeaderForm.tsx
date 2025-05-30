interface IHeaderForm {
    onSubmit: (value: string) => void;
}

export const HeaderForm = (props: IHeaderForm) => {
    const {onSubmit} = props;
    const handleSubmit = (event: any) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const text = formData.get('search') as string || '';
        if (text.length < 1)
        {
            return;
        }
        onSubmit(text);
        form.reset();
    };
    return (
        <form className="header__form" method="get" onSubmit={handleSubmit}>
            <input type="search" name="search" className="header__input" placeholder="Search" />
            <button type="submit" className="search__button"></button>
        </form>
    );
};