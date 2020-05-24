import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import "./css/main.css";
import List from "../components/listComponent";
import useItems from "../hooks/useItems";
import useUserInfo from "../hooks/useAuth";
import response from "../services/fakeData";
import Card from "../common/monthlySum";
// import Axios from "axios";
import Search from "../common/search";
import Filter from "../common/filter";
const { signInSuccess } = response;
const { items } = response.monthly_list;

interface Props extends RouteComponentProps {}

const Main: React.SFC<Props> = ({ history }) => {
  const { getItem, items_monthly, monthlySaved, SumAllMonthly } = useItems();
  const { user_id, user_name, onLogin, onLogout } = useUserInfo();
  const [value, setValue] = useState("");
  const [orderBy, setOrderBy] = useState(["latest", "asc"]);

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
    {
      // checkUserId();
    }
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

  const numberWithCommas = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const checkUserId = () => {
    if (user_id === 0) {
      alert("로그인이 필요합니다!");
      history.replace("/login");
    }
  };
  const handleLogOut = () => {
    history.replace("/login");
    onLogout();
  };
  const handleSeacrh = (items: any, value: string) => {
    if (value !== "") {
      let query: string = value.trim();
      let filtered = items.filter(({ item_name }: any) =>
        item_name.startsWith(query),
      );
      return filtered;
    } else {
      return items;
    }
  };
  const handleFilter = (items: any) => {
    let orderValue = orderBy[0] === "latest" ? "item_id" : "item_price";
    return items.sort((a: any, b: any) => {
      return orderBy[1] === "asc"
        ? a[orderValue] - b[orderValue]
        : b[orderValue] - a[orderValue];
    });
  };
  let filteredList = handleFilter(handleSeacrh(items_monthly, value));
  console.log(filteredList);
  return (
    <div className="main_wrapper">
      <div className="main_grid">
        {renderGreet()}
        <div className="main_logout_box">
          <button onClick={() => handleLogOut()} className="main_logout">
            로그아웃
          </button>
        </div>
        <Card
          sum={monthlySaved}
          user_name={user_name}
          onFormat={numberWithCommas}
        />
        <List items={filteredList} onFormat={numberWithCommas} />
        <div className="filterZone">
          {items_monthly && <Search onChange={setValue} />}
          {items_monthly && <Filter onChange={setOrderBy} />}
        </div>
      </div>
    </div>
  );
};

export default Main;
