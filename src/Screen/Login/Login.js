import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styles from './Login.module.scss';

const useLoginController = () => {
    const [option, setOption] = useState({
        qr_code: false,
        phone: true,
    });

    return {
        option,
        setOption,
    };
};

const Login = () => {
    const { option, setOption } = useLoginController();
    const { register } = useForm();

    return (
        <section className={styles.container}>
            <div className="bg-svg" style={{ position: 'fixed', top: '0', left: 0, width: '100%' }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 810"
                    preserveAspectRatio="xMinYMin slice"
                    style={{ minHeight: '100vh' }}
                >
                    <path
                        fill="#aad6ff"
                        d="M592.66 0c-15 64.092-30.7 125.285-46.598 183.777C634.056 325.56 748.348 550.932 819.642 809.5h419.672C1184.518 593.727 1083.124 290.064 902.637 0H592.66z"
                    ></path>
                    <path
                        fill="#e8f3ff"
                        d="M545.962 183.777c-53.796 196.576-111.592 361.156-163.49 490.74 11.7 44.494 22.8 89.49 33.1 134.883h404.07c-71.294-258.468-185.586-483.84-273.68-625.623z"
                    ></path>
                    <path
                        fill="#cee7ff"
                        d="M153.89 0c74.094 180.678 161.088 417.448 228.483 674.517C449.67 506.337 527.063 279.465 592.56 0H153.89z"
                    ></path>
                    <path fill="#e8f3ff" d="M153.89 0H0v809.5h415.57C345.477 500.938 240.884 211.874 153.89 0z"></path>
                    <path
                        fill="#e8f3ff"
                        d="M1144.22 501.538c52.596-134.583 101.492-290.964 134.09-463.343 1.2-6.1 2.3-12.298 3.4-18.497 0-.2.1-.4.1-.6 1.1-6.3 2.3-12.7 3.4-19.098H902.536c105.293 169.28 183.688 343.158 241.684 501.638v-.1z"
                    ></path>
                    <path
                        fill="#eef4f8"
                        d="M1285.31 0c-2.2 12.798-4.5 25.597-6.9 38.195C1321.507 86.39 1379.603 158.98 1440 257.168V0h-154.69z"
                    ></path>
                    <path
                        fill="#e8f3ff"
                        d="M1278.31,38.196C1245.81,209.874 1197.22,365.556 1144.82,499.838L1144.82,503.638C1185.82,615.924 1216.41,720.211 1239.11,809.6L1439.7,810L1439.7,256.768C1379.4,158.78 1321.41,86.288 1278.31,38.195L1278.31,38.196z"
                    ></path>
                </svg>
            </div>
            <div className={styles.login}>
                <h1 className={styles.title}>Zalo</h1>

                <div className={styles.login_title}>
                    Đăng nhập tài khoản Zalo <br />
                    để kết nối với ứng dụng Zalo Chat
                </div>

                <div className={styles.login_main}>
                    <div className={styles.login_main_option}>
                        <li
                            className={option.qr_code ? styles.active : ''}
                            onClick={() => setOption({ qr_code: true, phone: false })}
                        >
                            với mã qr
                        </li>
                        <li
                            className={option.phone ? styles.active : ''}
                            onClick={() => setOption({ qr_code: false, phone: true })}
                        >
                            với số điện thoại
                        </li>
                    </div>

                    {option.qr_code ? (
                        <div className={styles.login_main_content}>
                            <div className={styles.login_main_content_img}>
                                <img src="https://i.imgur.com/dPr3SMX.png" alt="QR Code" />
                            </div>
                            <div className={styles.qr_content}>
                                <span style={{ color: 'blue' }}>Chỉ dùng để đăng nhập</span>
                                <br></br>
                                <br></br>
                                <span>Zalo trên máy tính</span>
                            </div>
                            <div className={styles.login_main_content_text}>
                                <span>Sử dụng ứng dụng Zalo để quét mã QR</span>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.login_main_content}>
                            <form>
                                <div className={styles.login_form_input}>
                                    <input type="text" placeholder="Số điện thoại" {...register('phone')} required />
                                    <span>
                                        <FontAwesomeIcon icon={faMobileAlt} />
                                    </span>
                                </div>
                                <div className={styles.login_form_input}>
                                    <input type="password" placeholder="Mật khẩu" {...register('password')} required />
                                    <span>
                                        <FontAwesomeIcon icon={faLock} />
                                    </span>
                                </div>
                                <button className={styles.btn_login}>Đăng nhập với mật khẩu</button>
                                <span className={styles.login_by_phone}>Đăng nhập bằng thiết bị di động</span>
                                <Link to="/forgotpass" className={styles.forgot_password}>
                                    Quên mật khẩu?
                                </Link>
                            </form>
                        </div>
                    )}
                </div>

                <div>
                    <p className={styles.action_more}>
                        Bạn chưa có tài khoản? <Link to="/register">Đăng ký ngay!</Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Login;
