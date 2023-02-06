import classNames from 'classnames/bind';
import { CgProfile } from 'react-icons/cg';
import { FaSearch } from 'react-icons/fa';

import styles from './Navbar.module.scss';

import { useStateProvider } from '~/utils/StateProvider';

const cx = classNames.bind(styles);

const Navbar = ({navbarBg}) => {
    const [{ userInfo }] = useStateProvider();
    return (
        <div className={cx('wrapper',{'active':navbarBg})}>
            <div className={cx('search')}>
                <FaSearch className={cx('icon')} />
                <input className={cx('search-input')} placeholder="Artists, songs, or podcats" />
            </div>
            <div className={cx('avatar')}>
                <a href="#123">
                    <CgProfile className={cx('icon')} />
                    <span className={cx('username')}>{userInfo?.userName}</span>
                </a>
            </div>
        </div>
    );
};

export default Navbar;
