import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './UpdateInfo.module.scss';

const cx = classNames.bind(styles);

function UpdateInfo({ onCancel, onClose }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('profileHeader')}>
                <div className={cx('boxIcon')} onClick={onCancel}>
                    <FontAwesomeIcon className={cx('icon')} icon={faChevronLeft} />
                </div>
                <h3 className={cx('title')}>Cập nhật thông tin cá nhân</h3>
                <div className={cx('boxIcon')} onClick={onClose}>
                    <FontAwesomeIcon className={cx('icon')} icon={faXmark} />
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('boxName')}>
                    <h3 className={cx('lblName')}> Tên hiển thị</h3>
                    <input className={cx('inpName')} type="text" />
                </div>

                <div className={cx('boxInfo')}>
                    <h3 className={cx('lblInfo')}>Thông tin cá nhân</h3>
                    <div className={cx('boxGender')}>
                        <label>
                            <input className={cx('inpGender')} defaultChecked value="male" type="radio" name="gender" />{' '}
                            Nam
                        </label>

                        <label>
                            <input className={cx('inpGender')} value="female" type="radio" name="gender" /> Nữ
                        </label>
                    </div>
                </div>
            </div>
            <div className={cx('bottomUpdate')}>
                <button className={cx('btnCancel')} onClick={onCancel}>
                    Hủy
                </button>
                <button className={cx('btnUpdate')}>Cập nhật</button>
            </div>
        </div>
    );
}
export default UpdateInfo;
