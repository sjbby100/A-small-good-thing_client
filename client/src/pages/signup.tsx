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
    let err = this.validate();
    this.setState({ ...this.state, err });
  }

  //실시간 유효성 검증 + 제출 유효성 검증 => 분리 필요 예상
  validate = (cur: any | null = null): {} => {
    let state;
    cur ? (state = cur) : (state = { ...this.state });
    const { password: p, passwordCheck: pc, err: e } = state;
    let err = { ...e };

    for (let key in state) {
      if (state[key] === "") {
        err[key] = "empty" + key;
      } else {
        delete err[key];
      }
      if (key === "passwordCheck") {
        if (p !== pc && p !== "") err[key] = "diffPassword";
      }
    }
    return err;
  };

  handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    let err = this.validate();
    this.handlePost(err);
  };

  handlePost = (err: any) => {
    if (Object.keys(err).length === 0) {
      console.log("%c에러가 없어요!!!", "color:orange");
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
    let cur = { ...this.state };
    cur[name] = value;
    let err = this.validate(cur);
    this.setState({ ...cur, err });
  };

  renderBtn = (): any => {
    const { err } = this.state;
    if (Object.keys(err).length !== 0) {
      return { disabled: true };
    }
    return { disabled: false };
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

          <form onSubmit={handleSubmit} className="form" autoComplete="off">
            {renderInput(state)}
            <button className="submit" {...renderBtn()}>
              가입하기
            </button>
          </form>
          <Link to={"/signin"} className="back">
            로그인으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }
}
