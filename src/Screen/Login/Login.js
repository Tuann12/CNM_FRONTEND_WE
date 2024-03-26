import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

const Login = () => {
    return (
        <section className={cx('container')}>
            <div className={cx('login')}>
                <h1 className={cx('title')}>Zalo</h1>

                <div className={cx('login_title')}>
                    Đăng nhập tài khoản Zalo <br /> để kết nối với ứng dụng Zalo Chat
                </div>

                <div className={cx('login_main')}>
                    <div className={cx('login_main_option')}>
                        <li>với mã qr</li>
                        <li>với số điện thoại</li>
                    </div>

                    <div className={cx('login_main_content')}>
                        <div className={cx('login_main_content_img')}>
                            <img src="https://i.imgur.com/dPr3SMX.png" alt="QR Code" />
                        </div>
                        <div className={cx('qr_content')}>
                            <span style={{ color: 'blue' }}>Chỉ dùng để đăng nhập</span>
                            <br></br>
                            <span>Zalo trên máy tính</span>
                        </div>
                        <div className={cx('login_main_content_text')}>
                            <span>Sử dụng ứng dụng Zalo để quét mã QR</span>
                        </div>
                    </div>
                </div>

                <div className={cx('login_main_content')}>
                    <form>
                        <div className={cx('login_form_input')}>
                            <input type="text" placeholder="Số điện thoại" required />
                            <span>
                                <FontAwesomeIcon icon={faMobileAlt} />
                            </span>
                        </div>
                        <div className={cx('login_form_input')}>
                            <input type="password" placeholder="Mật khẩu" required />
                            <span>
                                <FontAwesomeIcon icon={faLock} />
                            </span>
                        </div>
                        <button className={cx('btn_login')}>Đăng nhập với mật khẩu</button>
                        <span className={cx('login_by_phone')}>Đăng nhập bằng thiết bị di động</span>
                        <Link to="/forgotpass" className={cx('forgot_password')}>
                            Quên mật khẩu?
                        </Link>
                    </form>
                </div>

                <div>
                    <p className={cx('action_more')}>
                        Bạn chưa có tài khoản? <Link to="/register">Đăng ký ngay!</Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Login;
