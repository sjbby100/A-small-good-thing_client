import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import useItems from "../hooks/useItems";
import useUserInfo from "../hooks/useAuth";
import response from "../services/fakeData";
const { signInSuccess } = response;
const { items } = response.monthly_list;
// import list form "../components/listComponent";
interface Props extends RouteComponentProps {}

const Main: React.SFC<Props> = ({ history }) => {
  const { getItem, items_monthly, monthlySaved, SumAllMonthly } = useItems();
  const { user_id, user_name, onLogin, onLogout } = useUserInfo();

  useEffect(() => {
    onLogin(signInSuccess.respon);
    getItem(items);
    SumAllMonthly();
  }, []);

  useEffect(() => {
    console.log(monthlySaved);
  });

  const renderList = (list: any) => {
    return (
      <ul>
        {list.map((item: any) => (
          <li key={item.item_id}>
            <h2>{item.item_name}</h2>
            <h2>{item.item_price}</h2>
            <h2>{item.memo}</h2>
          </li>
        ))}
      </ul>
    );
  };
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
    </div>
  );
};

export default Main;
