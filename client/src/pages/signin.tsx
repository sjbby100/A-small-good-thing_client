import React from "react";
import axios from "axios";

import { connect, useDispatch } from "react-redux";
import { Redirect, Link, RouteComponentProps } from "react-router-dom";

import * as SigninInput from "../components/signin_Input";
import "../pages/css/signin.css";
import rootReducer from "../modules/reducer";
import { signin_Success } from "../modules/signin";

//* fake data
// import { fake } from "../services/fakeData";

interface state {
  email: string;
  password: string;
  err: any;
  errors: {};
}
interface Props extends RouteComponentProps {}
//state type 지정 : interface 사용

class Signin extends React.Component<Props, state> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      err: null,
      errors: {},
    };
  }

  handleChange = ({ currentTarget }: any) => {
    //email 변경
    const { value, name } = currentTarget;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  //check =()=>{}

  handleSignin = (e: any) => {
    e.preventDefault();
    const { email, password, errors } = this.state;
    const { vali_error } = SigninInput.validateInput(password);
    console.log(this.state);

    if (vali_error === "" && Object.keys(errors).length === 0) {

      let data = { email, password };
      let opt = { headers: { "content-type": "application/json" } };
      axios.post("http://18.217.232.233:8080/login", data, opt).then((res) => {
        if (res.status === 200) {
          //reducer
          const Dispatch = useDispatch();
          Dispatch(signin_Success(0, "test", "token"));

          console.log("%c 로그인 성공!", "color : green");
          this.props.history.replace("/home");
        } else if (res.status === 403) {
          //! replace?
          alert("이메일을 확인해주세요.");
          this.props.history.replace("/signin");
          // let err: number = res.status;
          // this.setState({ ...this.state, err });
          // console.log(this.state);
          // console.log("%c 이메일을 확인해주세요.", "color:red");
        } else if (res.status === 401) {
          alert("비밀번호를 확인해주세요.");
          this.props.history.replace("signin");
          // let err: number = res.status;
          // this.setState({ ...this.state, err });
          // console.log("%c비밀번호를 확인해주세요.", "color:red");
        }
      });

    }
  };
  render() {
    const { email, password } = this.state;
    const { handleChange, handleSignin } = this;

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
  }
}
export default Signin;
