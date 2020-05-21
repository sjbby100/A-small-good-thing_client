import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
//import * as igninActions from "../modules/signin";
//import { Redirect } from "react-router-dom";
import * as SigninInput from "../components/signin_Input";
//* fake data
import { fake } from "../services/fakeData";
// todo [] error message 받는 방법 찾기

//state type 지정 : interface 사용
interface state {
  email: string;
  password: string;
  errors: {};
}

class Signin extends Component {
  state: state = {
    email: "",
    password: "",
    errors: {},
  };
  handleChange = ({ currentTarget }: any) => {
    //email 변경
    const { value, name } = currentTarget;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  handleSignin = async (e: any) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { errors } = SigninInput.validateInput(email, password);
    console.log(this.state);
    console.log(errors);
    if (errors.emailErr === "" && errors.pwErr === "") {
      let post = await axios.post("http://localhost:8080/user/login", {
        data: {
          email,
          password,
        },
      });
    }
  };
  render() {
    const { email, password } = this.state;
    const { handleChange, handleSignin } = this;

    return (
      <div>
        {/*form 안에다 넣어야 관리가 쉬워짐 */}
        <form onSubmit={handleSignin}>
          <SigninInput.Input
            email={email}
            password={password}
            onChange={handleChange}
          />
          <button>로그인</button>
        </form>
      </div>
    );
  }
}
export default Signin;
