import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import styles from "./ForgotPass.module.scss";
import { Link } from "react-router-dom";

const ForgotPass = () => {
  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <h1 className={styles.title}>Zalo</h1>
        <div className={styles.login_title}>
          Khôi phục mật khẩu Zalo <br></br>để kết nối với ứng dụng Zalo Chat
        </div>
        <div className={styles.login_main}>
          <div className={styles.login_main_content}>
            <form>
              <li>Nhập email để nhận mã xác thực</li>
              <div className={styles.login_form_input}>
                <input type="text" placeholder="Email" />
                <span>
                  <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                </span>
              </div>
              <button type="submit" className={`${styles.btn_login}`}>
                Tiếp tục
              </button>
            </form>
            <Link to="/" className={styles.back}>
              Quay lại
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
