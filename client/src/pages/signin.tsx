import React, { useState } from "react";
import axios from "axios";

import { Link, RouteComponentProps } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import * as SigninInput from "../components/signin_Input";
import "../pages/css/signin.css";
// import rootReducer from "../modules/reducer";
//* fake data
// import { fake } from "../services/fakeData";

interface state extends RouteComponentProps {
  email: string;
  password: string;
  err: any;
  errors: {};
}
//state type 지정 : interface 사용
const Signin: React.FC<state> = ({ history }) => {
  let [state, setState] = useState({
    email: "",
    password: "",
    err: null, //전처리
    errors: {}, //보관소
  });
  let { onLogin } = useAuth();
  const handleChange = ({ currentTarget }: any) => {
    //email 변경
    const { value, name } = currentTarget;
    setState({
      ...state,
      [name]: value,
    });
  };

  //check =()=>{}

  const handleSignin = (e: any) => {
    e.preventDefault();
    const { email, password, errors } = state;
    const { vali_error } = SigninInput.validateInput(password);
    console.log(state);

    // Dispatch(signin_Success(0, "test", "token"));
    // onLogin({ user_id: 1, user_name: "경태" });
    // history.replace("/home");

    if (vali_error === "" && Object.keys(errors).length === 0) {
      let data = { email, password };
      let opt = {
        headers: { "content-type": "application/json" },
        credentials: true,
      };
      axios.post("http://18.217.232.233:8080/login", data, opt).then((res) => {
        if (res.status === 200) {
          //reducer
          // Dispatch(signin_Success(0, "test", "token"));
          console.log(res);
          // const{use}= res.data
          // onLogin(res.data);

          console.log("%c 로그인 성공!", "color : green");
          // history.replace("/home");
        } else if (res.status === 403) {
          //! replace?
          alert("이메일을 확인해주세요.");
          history.replace("/signin");
          // let err: number = res.status;
          // setState({ ...state, err });
          // console.log(state);
          // console.log("%c 이메일을 확인해주세요.", "color:red");
        } else if (res.status === 401) {
          alert("비밀번호를 확인해주세요.");
          history.replace("signin");
          // let err: number = res.status;
          // setState({ ...state, err });
          // console.log("%c비밀번호를 확인해주세요.", "color:red");
        }
      });
    }
  };
  const { email, password } = state;

  //! form 안에다 넣어야 관리가 쉬워짐
  return (
    <div className="container">
      <div className="signin_wrapper">
        <div className="textbox">
          <h1 className="signin_greet">
            안녕하세요. 굿띵은
            <br />
            로그인이 필요한 서비스 입니다.
          </h1>
        </div>
        <form onSubmit={handleSignin} className="form" autoComplete="off">
          <SigninInput.Input
            email={email}
            password={password}
            onChange={handleChange}
          />
          <button className="submit">로그인</button>
        </form>
        <Link to={"/signup"} className="signin_back">
          아이디가 없으신가요?
        </Link>
      </div>
    </div>
  );
};
export default Signin;
