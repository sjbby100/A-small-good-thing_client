import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import List from "../components/listComponent";
import useItems from "../hooks/useItems";
import useUserInfo from "../hooks/useAuth";
import response from "../services/fakeData";
import Card from "../common/monthlySum";
import Axios from "axios";
import monthlySum from "../common/monthlySum";
import Search from "../common/search";
const { signInSuccess } = response;
const { items } = response.monthly_list;

interface Props extends RouteComponentProps {}

const Main: React.SFC<Props> = ({ history }) => {
  const { getItem, items_monthly, monthlySaved, SumAllMonthly } = useItems();
  const { user_id, user_name, onLogin, onLogout } = useUserInfo();
  const [value, setValue] = useState("");
  useEffect(() => {
    // Axios.get("http://localhost:8080/mainpage", {
    //   data: user_id,
    // }).then((res: any) => {
    //   const { items } = res.monthly_list;
    //   getItem(items)
    // });
    onLogin(signInSuccess.respon);
    getItem(items);
    SumAllMonthly();
  }, []);

  useEffect(() => {
    console.log(monthlySaved);
  });

  const renderGreet = () => (
    <div className="greet">
      <h1> 안녕하세요. {user_name}님</h1>
      <h2>
        공수래 공수거. 빈손으로 와서 <br />
        빈손으로 가는거니까 끌리는건 구매하세요!
      </h2>
    </div>
  );

  const checkUserId = () => {
    if (user_id === 0) {
      // alert("로그인이 필요합니다!");
      // history.replace("/login");
    }
  };
  const handleLogOut = () => {
    history.replace("/login");
    onLogout();
  };
  return (
    <div>
      {checkUserId()}
      {renderGreet()}
      <button onClick={() => handleLogOut()}>로그아웃</button>
      <Card sum={monthlySaved} />
      <Search onChange={setValue} />
      <List items={items_monthly} />
    </div>
  );
};

export default Main;
