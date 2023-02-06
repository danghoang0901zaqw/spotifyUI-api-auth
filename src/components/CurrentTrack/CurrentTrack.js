import axios from 'axios';
import classNames from 'classnames/bind';
import React, { useEffect } from 'react';
import { reducerCases } from '~/utils/constants';
import { useStateProvider } from '~/utils/StateProvider';
import styles from './CurrentTrack.module.scss';
const cx = classNames.bind(styles);
const CurrentTrack = () => {
    const [{ token, currentPlaying }, dispatch] = useStateProvider();
    useEffect(() => {
        const getCurrentTrack = async () => {
            try {
                const { data } = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
                    headers: {
                        Authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json',
                    },
                });
                console.log(data);
                const currentPlaying = {
                    id: data.item.id,
                    name: data.item.name,
                    duration: data.item.duration_ms,
                    artists: data.item.artists.map((artist) => artist.name),
                    image: data.item.album.images[2].url,
                };
                dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
            } catch (error) {
                console.log(error);
            }
        };
        getCurrentTrack();
    }, [dispatch, token]);
    return (
        <div className={cx('wrapper')}>
            {currentPlaying && (
                <div className={cx('track')}>
                    <div className={cx('track-image')}>
                        <img src={currentPlaying.image} alt="" />
                    </div>
                    <div className={cx('info')}>
                        <h4 className={cx('song')}>{currentPlaying.name}</h4>
                        <h6 className={cx('singer')}>{currentPlaying.artists.join(', ')}</h6>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CurrentTrack;
