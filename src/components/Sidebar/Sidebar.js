import React from 'react';

import classNames from 'classnames/bind';
import { IoLibrary } from 'react-icons/io5';
import { MdHomeFilled, MdSearch } from 'react-icons/md';

import LogoCMYKWhite from '~/assets/img/Spotify_Logo_CMYK_White-768x230.png';

import styles from './Sidebar.module.scss';
import Playlists from '../Playlists';

const cx = classNames.bind(styles);

const Sidebar = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('top')}>
                <div className={cx('logo')}>
                    <img className={cx('logo-image')} src={LogoCMYKWhite} alt="" />
                </div>
                <ul className={cx('list')}>
                    <li className={cx('item')}>
                        <MdHomeFilled className={cx('icon')}/>
                        <span className={cx('item-desc')}>Home</span>
                    </li>
                    <li className={cx('item')}>
                        <MdSearch className={cx('icon')}/>
                        <span className={cx('item-desc')}>Search</span>
                    </li>
                    <li className={cx('item')}>
                        <IoLibrary  className={cx('icon')}/>
                        <span className={cx('item-desc')}>Your Library</span>
                    </li>
                </ul>
            </div>
            <Playlists/>
        </div>
    );
};

export default Sidebar;
