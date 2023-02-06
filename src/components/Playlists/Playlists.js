import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Playlists.module.scss';
import axios from 'axios';
import { useStateProvider } from '~/utils/StateProvider';
import { reducerCases } from '~/utils/constants';

const cx = classNames.bind(styles);

const Playlists = () => {
    const [{ token, playlists }, dispatch] = useStateProvider();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getDatatPlaylists = async () => {
            try {
                setLoading(true);
                const res = await axios.get('https://api.spotify.com/v1/me/playlists ', {
                    headers: {
                        Authorization: 'Bearer ' + token,
                        ' Content-Type': 'application/json',
                    },
                });
                setLoading(false);
                const { items } = res.data;
                const playlists = items.map(({ name, id }) => {
                    return { name, id };
                });
                dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
            } catch (error) {
                console.log(error);
            }
        };
        getDatatPlaylists();
    }, [token, dispatch]);
    return (
        <div className={cx('wrapper')}>
            <ul className={cx('list')}>
                {loading
                    ? 'loading'
                    : playlists.map(({ name, id }) => (
                          <li className={cx('item')} key={id}>
                              {name}
                          </li>
                      ))}
            </ul>
        </div>
    );
};

export default Playlists;
