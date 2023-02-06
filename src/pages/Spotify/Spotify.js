import classNames from 'classnames/bind';

import styles from './Spotify.module.scss';

import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import Content from '~/components/Content';
import Footer from '~/components/Footer';
import Navbar from '~/components/Navbar';
import Sidebar from '~/components/Sidebar';
import { reducerCases } from '~/utils/constants';
import { useStateProvider } from '~/utils/StateProvider';

const cx = classNames.bind(styles);

const Spotify = () => {
    const contentRef = useRef();
    const [navbarBg, setNavbarBg] = useState(false);
    const [playlistBg, setPlaylistBg] = useState(false);

    const handleScrolled = () => {
        setNavbarBg(contentRef.current.scrollTop >= 30);
        setPlaylistBg(contentRef.current.scrollTop >= 268);
    };

    const [{ token }, dispatch] = useStateProvider();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        const getUserInfo = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get('https://api.spotify.com/v1/me ', {
                    headers: {
                        Authorization: 'Bearer ' + token,
                        ' Content-Type': 'application/json',
                    },
                });
                setLoading(false);
                const userInfo = {
                    userId: data.id,
                    userName: data.display_name,
                };
                dispatch({ type: reducerCases.SET_USER, userInfo });
            } catch (error) {
                setError(true);
                console.log(error);
            }
        };
        getUserInfo();
    }, [dispatch, token]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')} ref={contentRef} onScroll={handleScrolled}>
                    {error ? 'error' : loading ? 'loading' : <Navbar navbarBg={navbarBg}/>}
                    <div className={cx('content-body')}  >
                        <Content playlistBg={playlistBg}/>
                    </div>
                </div>
            </div>
            <div className={cx('footer')}>
                <Footer />
            </div>
        </div>
    );
};

export default Spotify;
