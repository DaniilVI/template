interface IMainForm {
    onSubmit: (value: string) => void;
}

export const MainForm = (props: IMainForm) => {
    const {onSubmit} = props;
    const handleSubmit = (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const text = formData.get('searchInput') as string || '';
        if (text.length < 1)
        {
            return;
        }
        onSubmit(text);
    };
    return (
        <form className="search__form" method="get" onSubmit={handleSubmit}>
            <input className="search__field" name="searchInput" type="text" placeholder="Search for music..." />
            <button className="search__reset" type="reset">Reset</button>
            <button className="search__submit" type="submit">Search</button>
        </form>
    );
}