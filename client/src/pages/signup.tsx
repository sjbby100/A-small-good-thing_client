import React from "react";
import { Input } from "../common/input";
import "./css/signup.css";
import { Link, RouteComponentProps } from "react-router-dom";
import axios from "axios";

interface values {
  email: string;
  user_name: string;
  password: string;
  passwordCheck: string;
  err: any;
  [key: string]: any;
}
interface Props extends RouteComponentProps {}

export default class Signup extends React.Component<Props, values> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: "",
      user_name: "",
      password: "",
      passwordCheck: "",
      err: {},
    };
  }
  componentDidMount() {
    let err = this.validate();
    this.setState({ ...this.state, err });
  }

  validate = (cur?: any): {} => {
    let state = cur ? cur : { ...this.state };
    const { password: p, passwordCheck: pc, err: e } = state;
    let err = { ...e };

    for (let key in state) {
      state[key] === "" ? (err[key] = "empty" + key) : delete err[key];
      key === "user_name" && delete err.submit;

      if (key === "passwordCheck" && p !== "") {
        if (p !== pc) err[key] = "diffPassword";
      }
    }
    return err;
  };

  handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    //! 에러가 있으면 버튼 클릭을 막아서 제출시 유효성 검증이 필요한지 의문
    let err = this.validate();
    Object.keys(err).length === 0 && this.handlePost();
  };

  handlePost = async () => {
    const { email, user_name, password } = this.state;
    let url = "http://18.217.232.233:8080/signup";
    let data = { email, user_name, password };
    let opt = {
      headers: { "content-type": "application/json" },
    };

    try {
      const res = await axios.post(url, data, opt);
      if (res.status === 200) {
        this.props.history.push("/signin");
      }
    } catch ({ response: { status } }) {
      if (status === 409) {
        let err = { ...this.state.err, submit: "alreadyExistsEmail" };
        this.setState({ ...this.state, err });
        alert("이미 존재하는 이메일 입니다!!!!");
      }
    }
  };

  handleChange = ({ currentTarget: { value, name } }: any): void => {
    let cur = { ...this.state, [name]: value };
    let err = this.validate(cur);
    this.setState({ ...cur, err });
  };

  handleBtnAble = (): any => {
    const { err } = this.state;
    return Object.keys(err).length !== 0 ? true : false;
  };

  renderInput = (values: values) => {
    let renderArr: JSX.Element[] = [];
    for (let key in values) {
      if (key !== "err") {
        renderArr.push(
          <Input
            name={key}
            key={key}
            value={values[key]}
            onChange={this.handleChange}
          />,
        );
      }
    }
    return renderArr;
  };

  render() {
    const {
      handleSubmit,
      renderInput,
      state,
      handleBtnAble,
      handlePost,
    } = this;
    return (
      <div className="container">
        <div className="wrapper">
          <div className="textbox">
            <h1 className="signup_greet">
              간단한 회원 가입을 <br /> 진행해주세요
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="form" autoComplete="off">
            {renderInput(state)}
            <button
              className="submit"
              onClick={() => handlePost}
              disabled={handleBtnAble()}
            >
              가입하기
            </button>
          </form>
          <Link to={"/login"} className="back">
            이미 아이디가 있으신가요?
          </Link>
        </div>
      </div>
    );
  }
}
