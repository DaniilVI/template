import { HeaderForm } from "../HeaderForm/HeaderForm";

interface IHeader {
    onSubmit: (value: string) => void;
}

export const Header = (props: IHeader) => {
    const handleSubmit = (text: string) => {
        props.onSubmit(text);
    }
    return (
        <header className="header">
            <a href="https://www.last.fm/" className="header__linkCaption">
                <span>last.fm</span>
            </a>
            <div className="header__search">
                <HeaderForm onSubmit={handleSubmit} />
            </div>
            <div className="header__links">
                <a href="https://www.last.fm/dashboard" className="header__link">Live</a>
                <a href="/" className="header__link header__music">Music</a>
                <a href="https://www.last.fm/charts" className="header__link">Charts</a>
                <a href="https://www.last.fm/events" className="header__link">Events</a>
            </div>
        </header>
    );
};