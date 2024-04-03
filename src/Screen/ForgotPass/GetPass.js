import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import classNames from 'classnames/bind';
import styles from './ForgotPass.module.scss';

const cx = classNames.bind(styles);

const GetPass = () => {
    const onSubmit = async (data) => {};

    const schema = yup.object().shape({
        oldPassword: yup.string().required('Vui lòng nhập mật khẩu cũ'),
        newPassword: yup.string().min(8, 'Mật khẩu mới phải có ít nhất 8 ký tự').required('Vui lòng nhập mật khẩu mới'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('newPassword'), null], 'Mật khẩu không khớp')
            .required('Nhập lại mật khẩu'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleFormSubmit = (data) => {
        onSubmit(data);
    };

    return (
        <div className={cx('container')}>
            <div className={cx('register')}>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className={cx('register-form-input')}>
                        <input type="password" placeholder="Mật khẩu cũ" required {...register('oldPassword')} />
                    </div>
                    <div className={cx('register-form-input')}>
                        <input type="password" placeholder="Mật khẩu mới" required {...register('newPassword')} />
                        {errors.newPassword && <div className={cx('error')}>{errors.newPassword.message}</div>}
                    </div>
                    <div className={cx('register-form-input')}>
                        <input
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            required
                            {...register('confirmPassword')}
                        />
                        {errors.confirmPassword && <div className={cx('error')}>{errors.confirmPassword.message}</div>}
                    </div>
                    <button type="submit" className={cx('btn')}>
                        Đổi mật khẩu
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GetPass;
