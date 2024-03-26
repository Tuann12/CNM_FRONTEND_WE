import Navbar from '../../component/Navbar/Navbar';
import Header from '../../component/BoxChat/Header/Header';
import styles from './Home.module.scss';

function Home({ children }) {
    return (
        <div className={styles.wrapper}>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.chatBox}>
                    <Header />
                </div>
            </div>
        </div>
    );
}

export default Home;
