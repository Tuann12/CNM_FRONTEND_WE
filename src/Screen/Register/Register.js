import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faMobileAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "./Register.module.scss";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Register = () => {
  //   const history = useHistory();
  //   const dispatch = useDispatch();
  const schema = yup.object().shape({
    phone: yup
      .string()
      .trim()
      .matches(
        /^(?:\d{10}|(84|0[3|5|7|8|9])+([0-9]{8})\b|\w+@\w+\.\w{2,3})$/,
        "Số điện thoại hoặc email không hợp lệ"
      )
      .required(),
    password: yup.string().min(8, "Mật khẩu phải trên 8 kí tự").required(),
  });
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [pass, setPass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [repeatPass, setRepeatPass] = useState("");

  //   const user = useSelector((state) => state.user);
  //   const { error } = user;

  //   const onSubmit = async (data) => {
  //     if (pass === repeatPass) {
  //       await dispatch(registerUserRequest(data, () => {
  //         history.push('/login');
  //       }));
  //     } else {
  //       setErrorMessage('Mật khẩu không khớp');
  //       setTimeout(() => {
  //         setErrorMessage('');
  //       }, 2000);
  //     }
  //   };

  return (
    <div className={styles.container}>
      <div className={styles.register}>
        <div className={styles.register_title}>
          Đăng kí tài khoản Zalo <br></br>để kết nối với ứng dụng Zalo Chat
        </div>
        <form>
          <div className={styles.register_form_input}>
            <input
              type="text"
              placeholder="Họ và tên"
              required
              {...register("name")}
            ></input>
            <span>
              <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
            </span>
          </div>
          <div className={styles.register_form_input}>
            <input
              type="text"
              placeholder="Số điện thoại hoặc email"
              {...register("phone")}
            ></input>
            <span>
              <FontAwesomeIcon icon={faMobileAlt}></FontAwesomeIcon>
            </span>
            {errors.phone ? (
              <div className={styles.error}>{errors.phone?.message}</div>
            ) : (
              ""
            )}
            {/* {error ? <div className={styles.error}>{error}</div> : ""} */}
          </div>
          <div className={styles.register_form_input}>
            <input
              type="password"
              placeholder="Mật khẩu"
              required
              {...register("password")}
              onChange={(e) => setPass(e.target.value)}
            ></input>
            <div className={styles.error}>{errors.password?.message}</div>
            {errors.password ? (
              <div className={styles.error}>{errors.password?.message}</div>
            ) : (
              ""
            )}
            <span>
              <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
            </span>
          </div>
          <div className={styles.register_form_input}>
            <input
              type="password"
              placeholder="Nhập lại mật khẩu"
              required
              onChange={(e) => setRepeatPass(e.target.value)}
            ></input>
            <span>
              <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
            </span>
            {errorMessage ? (
              <div className={styles.error}>{errorMessage}</div>
            ) : (
              ""
            )}
          </div>

          <button className={styles.btn}>Đăng kí</button>

          <div className={styles.toLogin}>
            <Link to="/login">Đăng nhập!</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
