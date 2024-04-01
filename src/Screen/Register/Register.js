import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faMobileAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';

const cx = classNames.bind(styles);

const Register = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [otp, setOtp] = useState(Array(6).fill(''));
    const [formData, setFormData] = useState({});
    const updateFormData = (data) => {
        setFormData(data);
    };

    const onSendOTP = async (data) => {
        updateFormData(data);

        const response = await fetch('http://localhost:4000/user/sendotp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + btoa('voongocminhan20072002@gmail.com' + ':' + 'merh xvmu gjsr ghtg'), // Thay thế 'username' và 'password' bằng thông tin đăng nhập của bạn
            },
            body: JSON.stringify({ email: data.email }),
        });

        if (response.ok) {
            setShowPopup(true);
        } else {
            console.error('Failed to send OTP');
        }
    };

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await fetch('http://localhost:4000/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    gender: data.gender === 'male' ? 1 : 0,
                    otp: otp.join(''),
                }),
            });

            if (response.ok) {
                console.log('Registration successful!');
                // Reset form fields or redirect to a success page
            } else {
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('Error occurred during registration:', error);
        }
    };

    const schema = yup.object().shape({
        email: yup
            .string()
            .trim()
            .matches(
                /^(?:\d{10}|(84|0[3|5|7|8|9])+([0-9]{8})\b|\w+@\w+\.\w{2,3})$/,
                'Số điện thoại hoặc email không hợp lệ',
            )
            .required(),
        password: yup.string().min(8, 'Mật khẩu phải trên 8 kí tự').required(),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp')
            .required('Nhập lại mật khẩu'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleChange = (index, value) => {
        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        const otpValue = otp.join('');
        console.log('OTP submitted:', otpValue);
        // Call onSubmit to register user with the data from form
        onSubmit(formData);
        // Close the popup after OTP is submitted successfully
        setShowPopup(false);
    };

    return (
        <div className={cx('container')}>
            <div className={cx('register')}>
                <form onSubmit={handleSubmit(onSendOTP)}>
                    <div className={cx('register_form_input')}>
                        <input type="text" placeholder="Họ và tên" required {...register('name')} />
                        <span>
                            <FontAwesomeIcon icon={faUser} />
                        </span>
                    </div>
                    <div className={cx('register_form_input')}>
                        <input type="text" placeholder="Email" {...register('email')} />
                        <span>
                            <FontAwesomeIcon icon={faMobileAlt} />
                        </span>
                        {errors.email && <div className={cx('error')}>{errors.email.message}</div>}
                    </div>
                    <div className={cx('register_form_input')}>
                        <input type="password" placeholder="Mật khẩu" required {...register('password')} />
                        <span>
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        {errors.password && <div className={cx('error')}>{errors.password.message}</div>}
                    </div>

                    <div className={cx('register_form_input')}>
                        <input
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            required
                            {...register('confirmPassword')}
                        />
                        <span>
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        {errors.confirmPassword && <div className={cx('error')}>{errors.confirmPassword.message}</div>}
                    </div>
                    <div className={cx('radio-group')}>
                        <label>
                            <input type="radio" defaultChecked value="male" {...register('gender')} /> Nam
                        </label>
                        <label>
                            <input type="radio" value="female" {...register('gender')} /> Nữ
                        </label>
                        {errors.gender && <div className={cx('error')}>{errors.gender.message}</div>}
                    </div>
                    <br />
                    <button type="submit" className={cx('btn')}>
                        Đăng kí
                    </button>
                    <div className={cx('toLogin')}>
                        <Link to="/">Đăng nhập!</Link>
                    </div>
                </form>
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
    );
};

export default Register;
