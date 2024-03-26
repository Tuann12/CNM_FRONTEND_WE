import Navbar from '../../component/Navbar/Navbar';
import Header from '../../component/BoxChat/Header/Header';
import ListChat from '../../component/BoxChat/ListChat/ListChat';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Navbar />
            <div className={cx('container')}>
                <div className={cx('chatBox')}>
                    <Header />
                    <ListChat />
                </div>
            </div>
        </div>
    );
}

export default Home;
