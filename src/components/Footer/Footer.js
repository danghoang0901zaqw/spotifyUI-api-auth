import React from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import CurrentTrack from '../CurrentTrack';
import PlayerControls from '../PlayerControls';

const cx = classNames.bind(styles);

const Footer = () => {
    return (
        <div className={cx('wrapper')}>
            <CurrentTrack />
            <PlayerControls/>
        </div>
    );
};

export default Footer;
