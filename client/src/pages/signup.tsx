import React from "react";
import { Input } from "../common/input";
import "./css/signup.css";
import { Link, RouteComponentProps } from "react-router-dom";
// import axios from "axios";

interface values {
  email: string;
  username: string;
  password: string;
  passwordCheck: string;
  err: any;
  [key: string]: any;
}
interface Props extends RouteComponentProps {}

export default class extends React.Component<Props, values> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      passwordCheck: "",
      err: {},
    };
  }
  componentDidMount() {
    console.log("회원가입 렌더됨");
  }

  validateSubmit = (): {} => {
    let err: any = {};
    const { state } = this;
    const { password: p, passwordCheck: pc } = this.state;
    for (let key in state) {
      if (state[key] === "") {
        if (key === "email") err[key] = "empty" + key;
        if (key === "username") err[key] = "empty" + key;
        if (key === "password") err[key] = "empty" + key;
        if (key === "passwordCheck") err[key] = "empty" + key;
      } else if (key === "passwordCheck") {
        if (p !== pc && p !== "") err[key] = "diffPassword";
      }
    }
    this.setState({ ...state, err });
    return err;
  };

  handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    let err = this.validateSubmit();
    this.handlePost(err);
  };
  handlePost = (err: {}) => {
    if (Object.keys(err).length === 0) {
      this.props.history.push("/signin");
    } else {
      console.table(err);
    }
    // axios
    //   .post("http://localhost:8080/user/signup", {
    //     data: {
    //       email,
    //       username,
    //       password,
    //     },
    //   })
    //   .then((res) => {
    //     if (res.status === 201) {
    //       this.props.history.push("/signin");
    //     } else if (res.status === 409) {
    //       let err = { ...this.state.err };
    //       err.submit = "alreadyExistsEmail";
    //       this.setState({ ...this.state, err });
    //     }
    //   });
  };

  handleChange = ({ currentTarget }: any): void => {
    const { value, name } = currentTarget;
    this.setState({ ...this.state, [name]: value });
  };
  renderBtn = (e: any) => {
    e.preventDefault();
    const { err } = this.state;
    console.log(!err);
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
    const { handleSubmit, renderInput, state, renderBtn } = this;
    return (
      <div className="container">
        <div className="wrapper">
          <div className="textbox">
            <h1>
              간단한 회원 가입을 <br /> 진행해주세요
            </h1>
          </div>

          <form onSubmit={renderBtn} className="form" autoComplete="off">
            {renderInput(state)}
            <button className="submit">가입하기</button>
          </form>
          <Link to={"/signin"} className="back">
            로그인으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }
}
