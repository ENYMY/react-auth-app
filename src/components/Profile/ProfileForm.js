import React, { useContext, useRef, useState } from "react";
import { useHistory } from "react-router";
import AuthContext from "../../store/AuthContext";
import classes from "./ProfileForm.module.css";
const ProfileForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const passwordRef = useRef();

  const submitHandler = (event) => {
    console.log("hello");
    setIsLoading(true);
    event.preventDefault();
    const newPassword = passwordRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: authCtx.token,
          password: newPassword,
          returnSecureToken: true,
        }),
      }
    )
      .then((res) => {
        setIsLoading(false);
        if (res.ok) return res.json();
        else
          res.json().then((error) => {
            let errorMessage = "Password Change Failed";
            throw new Error(errorMessage);
          });
      })
      .then((data) => {
        history.replace("/");
      })
      .catch((err) => alert(err.message));
  };
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={passwordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
