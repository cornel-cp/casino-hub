import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

// assest

import { ReactComponent as USER } from "../../../../assets/images/Frame (58).svg";
import SocialMediaButton from "../../../Common/Buttons/SocialMediaButton/SocialMediaButton";
import { StyleProfile } from "./styles";

import { ReactComponent as STEAM } from "../../../../assets/images/Frame (22).svg";
import { ReactComponent as TWITCH } from "../../../../assets/images/Frame (23).svg";
import { ReactComponent as METAMASK } from "../../../../assets/images/Frame (24).svg";
import { ReactComponent as CHECKMARK } from "../../../../assets/images/checkmark.svg";
import SwitchToggle from "../../../Common/SwitchToggle/SwitchToggle";
import AccountPageTitle from "../Common/AccountPageTitle";
import UserContainer from "./UserContainer";
import { useAuth } from "@/context/AuthContext";
import { showToast } from "@/utils/toastUtils";

const Profile = () => {
  const { user } = useAuth();

  const [useRollbotAsAvatar, setUseRollbotAsAvatar] = useState(false);
  const [isPrivateProfile, setIsPrivateProfile] = useState(false);

  // Validation schema for the username field
  const usernameValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
  });

  // Formik hook for handling form state and validation
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: usernameValidationSchema,
    onSubmit: (values, { resetForm }) => {
      // Handle form submission logic here
      showToast("Username changed successfully.");
      resetForm();
    },
  });

  return (
    <StyleProfile>
      <AccountPageTitle icon={USER} title="Profile" />

      <UserContainer />
      <div className="section-container">
        <h3 className="section-title">Profile Settings</h3>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label for="rollbit-field-62399" className="input-label">
              Change Username
            </label>
            <div>
              <div className="input-container">
                <input
                  type="text"
                  name="name"
                  placeholder={user?.displayName ?? user?.username}
                  id="rollbit-field-62399"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                <button
                  className="change-button"
                  disabled={!formik.values.name}
                  type="submit"
                  style={{ marginRight: "4px" }}
                >
                  Change
                </button>
              </div>
            </div>
          </div>
          {formik.errors.name && (
            <div className="required">{formik.errors.name}</div>
          )}
        </form>
        <div className="checkbox-container">
          <SwitchToggle
            checked={useRollbotAsAvatar}
            toggle={setUseRollbotAsAvatar}
            label={"Use profile linked rollbot as chat/lottery avatar"}
          />
        </div>
        <div className="checkbox-container">
          <SwitchToggle
            checked={isPrivateProfile}
            toggle={setIsPrivateProfile}
            label={"Use profile linked rollbot as chat/lottery avatar"}
          />
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            size="15"
            color="hsl(225.70000000000005, 15.6%, 58.8%)"
            className="svg"
            style={{ marginLeft: "8px" }}
          >
            <path
              d="M2.313 2.313A7.896 7.896 0 1 0 13.48 13.479 7.896 7.896 0 0 0 2.312 2.313zm5.9 1c.666 0 1.2.55 1.2 1.216a1.22 1.22 0 0 1-1.2 1.217c-.667 0-1.217-.55-1.217-1.234 0-.666.55-1.2 1.216-1.2zm1.716 8.15a.79.79 0 0 1-.167.283c-.433.45-.966.716-1.6.716-.3 0-.583 0-.883-.05-.483-.066-1.1-.666-1.017-1.3l.2-1.3c.134-.75.267-1.516.4-2.266 0-.05.017-.1.017-.15 0-.317-.1-.433-.416-.467-.134-.017-.267-.033-.4-.066-.15-.05-.234-.184-.217-.3.016-.134.1-.217.267-.25.083-.017.183-.017.283-.017h2.3c.283 0 .45.133.45.417 0 .233-.034.466-.084.7-.15.866-.316 1.716-.466 2.583-.05.283-.117.566-.15.85-.017.133 0 .283.033.416.05.184.184.284.367.267.15-.017.3-.066.45-.133.117-.05.216-.134.333-.167.2-.066.35.05.3.234z"
              fill="currentColor"
              fill-rule="evenodd"
            ></path>
          </svg>
        </div>
      </div>

      <div className="section-container">
        <h3 className="section-title">Link Account</h3>
        <div className="social-media">
          <STEAM className="svg" style={{ marginRight: "12px" }} />
          <div style={{ marginRight: "auto" }}>Steam</div>
          <CHECKMARK
            className="svg"
            style={{ color: "rgb(114, 242, 56)", marginRight: "8px" }}
          />
          <div>Connected</div>
        </div>
        <div className="social-media">
          <TWITCH className="svg" style={{ marginRight: "13px" }} />
          <div style={{ marginRight: "auto" }}>Twitch</div>
          <CHECKMARK
            className="svg"
            style={{ color: "rgb(114, 242, 56)", marginRight: "8px" }}
          />
          <div>Connected</div>
        </div>
        <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
          <SocialMediaButton socialIcon={STEAM} socialName={"Steam"} />
          <SocialMediaButton socialIcon={TWITCH} socialName={"Twitch"} />
          <SocialMediaButton socialIcon={METAMASK} socialName={"Metamask"} />
        </div>
      </div>
    </StyleProfile>
  );
};

export default Profile;
