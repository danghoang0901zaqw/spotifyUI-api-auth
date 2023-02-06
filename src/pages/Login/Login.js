import classNames from 'classnames/bind';

import LogoCMYKBlack from '~/assets/img/Spotify_Logo_CMYK_Black-768x230.png';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

const Login = () => {
    const handleClick = () => {
        const clientId = '18ccf9d30d264eafbd9ac295da3c2121';
        const redirectUrl = 'http://localhost:3000/';
        const apiUrl = 'https://accounts.spotify.com/authorize';
        const scope = [
            'user-read-email',
            ' user-read-private',
            'user-read-playback-state',
            'user-modify-playback-state',
            'user-read-currently-playing',
            'user-read-playback-position',
            'user-top-read',
            'user-read-recently-played',
        ];
        window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
            ' ',
        )}&response_type=token&show_dialog=true`;
    };
    return (
        <div className={cx('wrapper')}>
            <img className={cx('logo')} alt="spotify" src={LogoCMYKBlack} />
            <button className={cx('btn')} onClick={handleClick}>
                Connect Spotify
            </button>
        </div>
    );
};

export default Login;
