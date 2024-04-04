import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import * as yup from 'yup';
import styles from './ForgotPass.module.scss';

const cx = classNames.bind(styles);

const ForgotPass = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [otp, setOtp] = useState(Array(6).fill(''));
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const schema = yup.object().shape({
        email: yup
            .string()
            .trim()
            .matches(
                /^(?:\d{10}|(84|0[3|5|7|8|9])+([0-9]{8})\b|\w+@\w+\.\w{2,3})$/,
                'Số điện thoại hoặc email không hợp lệ',
            )
            .required(),
    });

    const handleSendOTP = async (data) => {
        try {
            const checkGetPassEmail = false;
            const response = await fetch('http://localhost:4000/user/sendotp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: data.email, checkGetPassEmail: checkGetPassEmail }),
            });

            if (response.ok) {
                setShowPopup(true);
            } else {
                const responseData = await response.json();
                alert(responseData.message || 'Gửi mã OTP thất bại! Vui lòng thử lại.');
                console.error('Failed to send OTP');
            }
        } catch (error) {
            alert(error.message || 'An error occurred! Please try again.');
            console.error('Error occurred while sending OTP:', error);
        }
    };

    const onSubmit = async (data) => {
        handleSendOTP(data);
    };

    const handleChange = (index, value) => {
        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        // Handle OTP submission
    };

    return (
        <div className={cx('container')}>
            <div className="bg-svg" style={{ position: 'fixed', top: '0', left: 0, width: '100%' }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 810"
                    preserveAspectRatio="xMinYMin slice"
                    style={{ minHeight: '100vh' }}
                >
                    {/* SVG paths */}
                </svg>
            </div>
            <div className={cx('login')}>
                <h1 className={cx('title')}>Zalo</h1>
                <div className={cx('login_title')}>
                    Khôi phục mật khẩu Zalo <br /> để kết nối với ứng dụng Zalo Chat
                </div>
                <div className={cx('login_main')}>
                    <div className={cx('login_main_content')}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <li>Nhập email để nhận mã xác thực</li>
                            <div className={cx('login_form_input')}>
                                <input type="email" placeholder="Email" {...register('email')} name="email" />
                                <span>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </span>
                                {errors.email && <div className={cx('error')}>{errors.email.message}</div>}
                            </div>
                            <button type="submit" className={cx('btn_login')}>
                                Tiếp tục
                            </button>
                            <Link to="/" className={cx('back')}>
                                Quay lại
                            </Link>
                        </form>
                    </div>
                </div>
                {showPopup && (
                    <div className={cx('popup')}>
                        <h2>Nhập OTP</h2>
                        <form onSubmit={handleOtpSubmit}>
                            <div className={cx('otp-inputs')}>
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength="1"
                                        className={cx('otp-input')}
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onFocus={(e) => e.target.select()}
                                    />
                                ))}
                            </div>
                            <button type="submit" className={cx('btn')}>
                                Xác nhận
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPass;
