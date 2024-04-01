import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
    const { option, setOption } = useLoginController();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (formData) => {
        const { email, password } = formData;
        try {
            const response = await fetch('http://localhost:4000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const responseData = await response.json();
            if (response.ok) {
                console.log('Đăng nhập thành công');
                console.log('data', responseData);

                localStorage.setItem('loginData', JSON.stringify(responseData));
                navigate('/home');
            } else {
                alert(responseData.message || 'Đăng nhập thất bại! Vui lòng thử lại.');
                console.error('Đăng nhập thất bại');
            }
        } catch (error) {
            console.error('Đã xảy ra lỗi khi gọi API đăng nhập:', error);
        }
    };

    return (
        <section className={styles.container}>
            <div className="bg-svg" style={{ position: 'fixed', top: '0', left: 0, width: '100%' }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 810"
                    preserveAspectRatio="xMinYMin slice"
                    style={{ minHeight: '100vh' }}
                >
                    {/* Replace or remove this comment with actual SVG paths */}
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
                        <div className={styles.login_main_content}>{/* QR code content */}</div>
                    ) : (
                        <div className={styles.login_main_content}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className={styles.login_form_input}>
                                    <input type="text" placeholder="Email" {...register('email', { required: true })} />
                                    {errors.email && <span>Email is required</span>}
                                    <span>
                                        <FontAwesomeIcon icon={faMobileAlt} />
                                    </span>
                                </div>
                                <div className={styles.login_form_input}>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        {...register('password', { required: true })}
                                    />
                                    {errors.password && <span>Password is required</span>}
                                    <span>
                                        <FontAwesomeIcon icon={faLock} />
                                    </span>
                                </div>
                                <button type="submit" className={styles.btn_login}>
                                    Đăng nhập với mật khẩu
                                </button>
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
