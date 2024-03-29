import Navbar from '../../component/Navbar/Navbar';
import Header from '../../component/BoxChat/Header/Header';
import BoxChat from '../../component/BoxChat/BoxChat';
import Chat from '../../component/Chat/Chat';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <Navbar />
            <div className={cx('container')}>
                <div className={cx('chatBox')}>
                    <Header />
                    <BoxChat />
                </div>
                <div className={cx('chatBoxDetail')}>
                    <Chat />
                </div>
            </div>
        </div>
    );
}

export default Home;
