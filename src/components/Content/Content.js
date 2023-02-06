import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { AiFillClockCircle } from 'react-icons/ai';
import { reducerCases } from '~/utils/constants';
import { useStateProvider } from '~/utils/StateProvider';
import styles from './Content.module.scss';

const cx = classNames.bind(styles);

const Content = ({playlistBg}) => {
    const changeDurationToMinSec=(duration)=>{
        const min=Math.floor(duration / 60000)
        const sec=((duration %60000 ) /1000).toFixed(0)
        return `${min}:` + `0${sec}`.slice(-2)
    }
    const [{ token, selectedPlaylistId, selectedPlaylist }, dispatch] = useStateProvider();
    useEffect(() => {
        const getInitialPlaylist = async () => {
            try {
                const { data } = await axios.get(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}`, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                        ' Content-Type': 'application/json',
                    },
                });
                const selectedPlaylist = {
                    id: data.id,
                    name: data.name,
                    description: data.description.startsWith('<a') ? '' : data.description,
                    image: data.images[0].url,
                    tracks: data.tracks.items.map(({ track }) => ({
                        id: track.id,
                        name: track.name,
                        artists: track.artists.map((artist) => artist.name),
                        image: track.album.images[2].url,
                        duration: track.duration_ms,
                        album: track.album.name,
                        context_uri: track.album.uri,
                        track_number: track.track_number,
                    })),
                };
                dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
            } catch (error) {
                console.log(error);
            }
        };
        getInitialPlaylist();
    }, [dispatch, token, selectedPlaylistId]);
    return (
        <div className={cx('wrapper')}>
            {selectedPlaylist && (
                <>
                    <div className={cx('playlist')}>
                        <div className={cx('image')}>
                            <img src={selectedPlaylist.image} alt="" />
                        </div>
                        <div className={cx('details')}>
                            <span className={cx('type')}>PLAYLIST </span>
                            <h1 className={cx('title')}>{selectedPlaylist.name}</h1>
                            <p className={cx('desc')}>{selectedPlaylist.description}</p>
                        </div>
                    </div>
                    <div className={cx('list')}>
                        <div className={cx('header-row',{'active':playlistBg })}>
                            <div className={cx('col')}>
                                <span>#</span>
                            </div>
                            <div className={cx('col')}>
                                <span>TITLE</span>
                            </div>
                            <div className={cx('col')}>
                                <span>ALBUM</span>
                            </div>
                            <div className={cx('col')}>
                                <span>
                                    <AiFillClockCircle />
                                </span>
                            </div>
                        </div>
                        <div className={cx('tracks')}>
                            {selectedPlaylist.tracks.map(
                                ({ id, name, artists, image, duration, album, context_uri, track_number }, idx) => {
                                    return (
                                        <div className={cx('row')} key={id}>
                                            <div className={cx('col')}>
                                                <span>{idx + 1}</span>
                                            </div>
                                            <div className={cx('col', 'detail')}>
                                                <div className={cx('track-image')}>
                                                    <img src={image} alt="" />
                                                </div>
                                                <div className={cx('info')}>
                                                    <span>{name}</span>
                                                    <span>{artists}</span>
                                                </div>
                                            </div>
                                            <div className={cx('col')}>
                                                <span>{album}</span>
                                            </div>
                                            <div className={cx('col')}>
                                                <span>{changeDurationToMinSec(duration)}</span>
                                            </div>
                                        </div>
                                    );
                                },
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Content;
