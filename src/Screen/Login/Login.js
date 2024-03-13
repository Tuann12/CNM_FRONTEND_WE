import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styles from "./Login.module.scss";

const Login = () => {
  return (
    <section className={styles.container}>
      <div className={styles.login}>
        <h1 className={styles.title}>Zalo</h1>

        <div className={styles.login_title}>
          Đăng nhập tài khoản Zalo <br /> để kết nối với ứng dụng Zalo Chat
        </div>

        <div className={styles.login_main}>
          <div className={styles.login_main_option}>
            <li>với mã qr</li>
            <li>với số điện thoại</li>
          </div>

          <div className={styles.login_main_content}>
            <div className={styles.login_main_content_img}>
              <img src="https://i.imgur.com/dPr3SMX.png" alt="QR Code" />
            </div>
            <div className={styles.qr_content}>
              <span style={{color:"blue" }}>Chỉ dùng để đăng nhập</span><br></br>
              <span>Zalo trên máy tính</span>
            </div>
            <div className={styles.login_main_content_text}>
              <span>Sử dụng ứng dụng Zalo để quét mã QR</span>
            </div>
          </div>
        </div>

        <div className={styles.login_main_content}>
          <form>
            <div className={styles.login_form_input}>
              <input type="text" placeholder="Số điện thoại" required />
              <span>
                <FontAwesomeIcon icon={faMobileAlt} />
              </span>
            </div>
            <div className={styles.login_form_input}>
              <input type="password" placeholder="Mật khẩu" required />
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

        <div>
          <p className={styles.action_more}>
            Bạn chưa có tài khoản?{" "}
            <Link to="/register">Đăng ký ngay!</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
