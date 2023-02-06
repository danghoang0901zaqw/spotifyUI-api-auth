import classNames from 'classnames/bind';
import { BsFillPauseCircleFill, BsFillPlayCircleFill, BsShuffle } from 'react-icons/bs';
import { CgPlayTrackNext, CgPlayTrackPrev } from 'react-icons/cg';
import { FiRepeat } from 'react-icons/fi';

import axios from 'axios';
import { reducerCases } from '~/utils/constants';
import { useStateProvider } from '~/utils/StateProvider';
import styles from './PlayerControls.module.scss';

const cx = classNames.bind(styles);

export default function PlayerControls() {
    const [{ token, playerState }, dispatch] = useStateProvider();

    const changeState = async () => {
        const state = playerState ? 'pause' : 'play';
        await axios.put(
            `https://api.spotify.com/v1/me/player/${state}`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            },
        );
        dispatch({
            type: reducerCases.SET_PLAYER_STATE,
            playerState: !playerState,
        });
    };
    const changeTrack = async (type) => {
        await axios.post(
            `https://api.spotify.com/v1/me/player/${type}`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            },
        );
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
        const response1 = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        });
        if (response1.data !== '') {
            const currentPlaying = {
                id: response1.data.item.id,
                name: response1.data.item.name,
                artists: response1.data.item.artists.map((artist) => artist.name),
                image: response1.data.item.album.images[2].url,
            };
            dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
        } else {
            dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className="shuffle">
                <BsShuffle />
            </div>
            <div className="previous">
                <CgPlayTrackPrev onClick={() => changeTrack('previous')} />
            </div>
            <div className="state">
                {playerState ? (
                    <BsFillPauseCircleFill onClick={changeState} />
                ) : (
                    <BsFillPlayCircleFill onClick={changeState} />
                )}
            </div>
            <div className="next">
                <CgPlayTrackNext onClick={() => changeTrack('next')} />
            </div>
            <div className="repeat">
                <FiRepeat />
            </div>
        </div>
    );
}
