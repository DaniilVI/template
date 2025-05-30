import logo from './footer_logo.png';

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__top">
                <div className="footer__topColumn">
                    <h2 className="footer__heading">Company</h2>
                    <ul className="footer__links">
                        <li><a href="https://www.last.fm/about" className="footer__link">About Last.fm</a></li>
                        <li><a href="https://www.last.fm/about/contact" className="footer__link">Contact Us</a></li>
                        <li><a href="https://www.last.fm/about/obs" className="footer__link">Jobs</a></li>
                        <li><a href="https://www.last.fm/features" className="footer__link">Features</a></li>
                    </ul>
                </div>
                <div className="footer__topColumn">
                    <h2 className="footer__heading">Help</h2>
                    <ul className="footer__links">
                        <li><a href="https://www.last.fm/about/trackmymusic" className="footer__link">Track My Music</a></li>
                        <li><a href="https://support.last.fm/" className="footer__link">Community Support</a></li>
                        <li><a href="https://www.last.fm/help/guidelines" className="footer__link">Community Guidelines</a></li>
                        <li><a href="https://www.last.fm/help/faq" className="footer__link">Help</a></li>
                    </ul>
                </div>
                <div className="footer__topColumn">
                    <h2 className="footer__heading">Goodies</h2>
                    <ul className="footer__links">
                        <li><a href="https://www.last.fm/about/trackmymusic" className="footer__link">Download Scrobbler</a></li>
                        <li><a href="https://www.last.fm/api" className="footer__link">Developer API</a></li>
                        <li><a href="https://www.last.fm/music/+free-music-downloads" className="footer__link">Free Music Downloads</a></li>
                        <li><a href="https://store.last.fm/" className="footer__link">Merchandise</a></li>
                    </ul>
                </div>
                <div className="footer__topColumn">
                    <h2 className="footer__heading">Account</h2>
                    <ul className="footer__links">
                        <li><a href="https://www.last.fm/join" className="footer__link">Sign Up</a></li>
                        <li><a href="https://www.last.fm/login" className="footer__link">Log In</a></li>
                        <li><a href="https://www.last.fm/pro" className="footer__link">Subscribe</a></li>
                    </ul>
                </div>
                <div className="footer__topColumn">
                    <h2 className="footer__heading">Follow Us</h2>
                    <ul className="footer__links">
                        <li><a href="https://www.facebook.com/lastfm" className="footer__link">Facebook</a></li>
                        <li><a href="https://x.com/lastfm" className="footer__link">X</a></li>
                        <li><a href="https://bsky.app/profile/last.fm" className="footer__link">Bluesky</a></li>
                        <li><a href="https://www.youtube.com/user/lastfm" className="footer__link">YouTube</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer__bottom">
                <div className="footer__data">
                    <a className="footer__smallLink" href="http://www.cbsinteractive.com/" rel="nofollow">CBS Interactive</a>
                    <span>&nbsp;© 2025 Last.fm Ltd. All rights reserved&nbsp;</span>
                    <ul>
                        <li className="footer__legalListItem">
                            &middot;
                            <a className="footer__smallLink" href="https://www.last.fm/legal/terms">Terms of Use</a>
                        </li>
                        <li className="footer__legalListItem">
                            &middot;
                            <a className="footer__smallLink" href="https://www.last.fm/legal/privacy">Privacy Policy</a>
                        </li>
                        <li className="footer__legalListItem">
                            &middot;
                            <a className="footer__smallLink" href="https://www.last.fm/legal">Legal Policies</a>
                        </li>
                        <li className="footer__legalListItem">
                            &middot;
                            <span>Cookie Details</span>
                        </li>
                        <li className="footer__legalListItem">
                            &middot;
                            <a className="footer__smallLink" href="https://careers.paramount.com/">Jobs at Paramount</a>
                        </li>
                        <li className="footer__legalListItem">
                            &middot;
                            <a className="footer__smallLink" href="http://www.last.fm/">Last.fm Music</a>
                        </li>
                    </ul>
                </div>
                <div className="footer__logo">
                    <p>Audioscrobbler</p>
                    <img src={logo} width="37" height="20" alt="Last.fm 'as' logo" loading="lazy" />
                </div>
            </div>
        </footer>
    );
};