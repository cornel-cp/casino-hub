import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";

//assets
import { AppContext } from "../../context/AppContext";
import { ReactComponent as STEAM } from "../../assets/images/Frame (22).svg";
import { ReactComponent as TWITCH } from "../../assets/images/Frame (23).svg";
import { ReactComponent as METAMASK } from "../../assets/images/Frame (24).svg";
import TringleButton from "../../assets/images/Vector.png";
import SocialMediaButton from "../Common/Buttons/SocialMediaButton/SocialMediaButton";

const Login = (props) => {
  const { updateLoggedIn } = useContext(AppContext);

  const [FaCodeInput, setFaCodeInput] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission (e.g., login request)
      updateLoggedIn(true);
    },
  });

  return (
    <>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group spacing-inputs">
            <label htmlFor="email" className="form-label">
              EMAIL <span className="required">*</span>
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="form-input"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="youremail@domain.com"
            />
            {formik.errors.email && (
              <div className="error-message">{formik.errors.email}</div>
            )}
          </div>

          <div className="form-group spacing-inputs">
            <label htmlFor="password" className="form-label">
              PASSWORD <span className="required">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="********"
            />

            <span
              style={{
                color: "#B1B6C6",
                fontSize: "13px",
                cursor: "pointer",
                marginTop: "8px",
              }}
            >
              Forget Password?
            </span>
            {formik.errors.password && (
              <div className="error-message">{formik.errors.password}</div>
            )}
          </div>

          <div className="form-group">
            <div
              class="toggle-fa-code-input"
              onClick={() => setFaCodeInput(true)}
            >
              <span class="toggle-fa-code-text">2FA CODE</span>
              {FaCodeInput ? null : (
                <img
                  class="toggle-fa-code-image"
                  src={TringleButton}
                  alt="triangle-btn"
                />
              )}
            </div>

            {FaCodeInput ? (
              <input type="text" class="fa-code-input" placeholder="Code" />
            ) : null}

            {FaCodeInput ? (
              <span class="required-message">
                Required if you enabled two-factor authentication
              </span>
            ) : null}
          </div>

          <div class="info-text-container">
            <p class="info-text">
              This site is protected by reCAPTCHA and the Google Privacy Policy
              and Terms of Service apply.
            </p>
          </div>

          <button type="submit" className="register-button uppercase">
            Login
          </button>
        </form>
      </div>

      <span
        style={{
          fontSize: "15px",
          justifyContent: "center",
          color: "#B1B6C6",
          width: "100%",
          display: "flex",
        }}
      >
        Or continue with
      </span>
      <div className="social-media-container">
        <SocialMediaButton socialIcon={STEAM} socialName={"Steam"} />
        <SocialMediaButton socialIcon={TWITCH} socialName={"Twitch"} />
        <SocialMediaButton socialIcon={METAMASK} socialName={"Metamask"} />
      </div>
    </>
  );
};

export default Login;
