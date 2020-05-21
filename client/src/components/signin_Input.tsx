import React from "react";
//import {} from "../common/input";
//import './css
interface valueProps {
  email: string;
  password: string;
  onChange: any;
}
export const Input = ({ email, password, onChange }: valueProps) => {
  return (
    <div className="input">
      <div>
        <label> Email </label>
        <input name="email" value={email} onChange={onChange} />
      </div>
      <div>
        <label> password </label>
        <input name="password" value={password} onChange={onChange} />
      </div>
    </div>
  );
};

export const validateInput = (email: string, password: string) => {
  let errors = { emailErr: "", pwErr: "" };
  // . check validate : email
  //* email undefined || null
  if (email === "") {
    errors.emailErr = "이메일을 입력해주세요.";
  }
  //* email '@', '.', 형식
  if (email.indexOf("@") > email.indexOf(".")) {
    errors.emailErr = "이메일 형식이 맞지 않습니다.";
  }
  let countAtDot = (AtOrDot: string) => {
    let count = 0;
    email.split("").forEach((el) => {
      if (el === AtOrDot) {
        count++;
      }
    });
    return count;
  };
  if (countAtDot("@") !== 1) {
    errors.emailErr = "이메일 형식이 맞지 않습니다.";
  }
  if (countAtDot(".") !== 1) {
    errors.emailErr = "이메일 형식이 맞지 않습니다.";
  }
  //* @ 앞에 아이디 없는 경우 (@로 시작)
  if (email.indexOf("@") === 0) {
    errors.emailErr = "이메일 형식이 맞지 않습니다.";
  }
  if (email[email.indexOf("@") + 1] === ".") {
    errors.emailErr = "이메일 형식이 맞지 않습니다.";
  }
  if (email.indexOf(".") === email.length) {
    errors.emailErr = "이메일 형식이 맞지 않습니다.";
  }
  // . check validate : password
  //* 길이 제한 8~15
  if (password === "") {
    errors.pwErr = "비밀번호를 입력해주세요.";
  }
  if (password.length < 8 || password.length > 15) {
    errors.pwErr = "비밀번호는 8자에서 15자 사이입니다.";
  }

  return {
    errors,
  };
};
