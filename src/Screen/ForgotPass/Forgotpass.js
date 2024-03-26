import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ForgotPass.module.scss';

const cx = classNames.bind(styles);

const ForgotPass = () => {
    return (
        <div className={cx('container')}>
            <div className={cx('login')}>
                <h1 className={cx('title')}>Zalo</h1>
                <div className={cx('login_title')}>
                    Khôi phục mật khẩu Zalo <br></br>để kết nối với ứng dụng Zalo Chat
                </div>
                <div className={cx('login_main')}>
                    <div className={cx('login_main_content')}>
                        <form>
                            <li>Nhập email để nhận mã xác thực</li>
                            <div className={cx('login_form_input')}>
                                <input type="text" placeholder="Email" />
                                <span>
                                    <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                                </span>
                            </div>
                            <button type="submit" className={cx('btn_login')}>
                                Tiếp tục
                            </button>
                        </form>
                        <Link to="/" className={cx('back')}>
                            Quay lại
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPass;
