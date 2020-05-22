import React from "react";

interface inputProps {
  name: string;
  value: string;
  onChange: any;
}
export const Input = ({ name, value, onChange }: inputProps) => {
  const renderLable = (name: string) => {
    if (name === "email") return "이메일";
    if (name === "password") return "비밀번호";
    if (name === "user_name") return "이름";
    if (name === "passwordCheck") return "비밀번호";
  };
  const renderPlaceHolder = (name: string) => {
    if (name === "email") return "gildong123@mail.com";
    if (name === "password") return "단순한 비밀번호는 피해주세요";
    if (name === "user_name") return "홍길동";
    if (name === "passwordCheck") return "비밀번호를 확인해주세요";
  };
  const renderType = (name: string) => {
    if (name === "passwordCheck") return "password";
    else return name;
  };
  const checkLabel = (name: string) => {
    if (name === "password") {
      return "password_label";
    }
    if (name === "passwordCheck") {
      return "passwordC_label";
    }
  };
  const handleLength = (name: string) => {
    if (name === "user_name") {
      return { maxLength: 10, minLength: 2 };
    }
    if (name === "password") {
      return { maxLength: 14, minLength: 8 };
    }
  };
  return (
    <div>
      <label htmlFor={name} className={checkLabel(name)}>
        {renderLable(name)}
      </label>
      <input
        type={renderType(name)}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={renderPlaceHolder(name)}
        {...handleLength(name)}
        autoCapitalize="off"
      />
    </div>
  );
};
