import React, { useEffect, useState } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import "./css/main.css";
import List from "../components/listComponent";
import useItems from "../hooks/useItems";
import useUserInfo from "../hooks/useAuth";
import Card from "../common/monthlySum";
import axios from "axios";
import Search from "../common/search";
import Filter from "../common/filter";
import onFormat from "../services/util/onFormat";
import checker from "../services/util/urlCheck";
import { AddItem } from "../components/add_Item";

interface Props extends RouteComponentProps {}

const Main: React.SFC<Props> = ({ history }) => {
  const {
    getMonthlyItem,
    items_monthly,
    monthlySaved,
    SumAllMonthly,
    itemStoreInit,
  } = useItems();
  const { user_id, user_name, onLogout } = useUserInfo();
  const [value, setValue] = useState("");
  const [orderBy, setOrderBy] = useState(["latest", "asc"]);

  useEffect(() => {
    if (user_id !== 0) {
      console.log(user_id, typeof user_id);
      let url = `http://18.217.232.233:8080/monthly_list?user_id=${user_id}`;
      axios
        .get(url)
        .then((res: any) => {
          if (res.status === 201) {
            const { items } = res.data.monthly_list;
            getMonthlyItem(items);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  useEffect(() => {
    if (user_id !== 0) {
      SumAllMonthly();
    }
  }, [items_monthly]);

  useEffect(() => {
    // {
    //   checkUserId();
    // }
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
      history.replace("/login");
      return false;
    }
    return true;
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
    let orderValue = orderBy[0] === "latest" ? "id" : "item_price";
    return items.sort((a: any, b: any) => {
      return orderBy[1] === "asc"
        ? a[orderValue] - b[orderValue]
        : b[orderValue] - a[orderValue];
    });
  };
  const handleLogOut = async () => {
    let url = `http://18.217.232.233:8080/logout`;
    let res = await axios.post(url, { user_id });
    if (res.status === 200) {
      itemStoreInit();
      onLogout();
      // history.replace("/signin");
    }
  };
  let filteredList = handleFilter(handleSeacrh(items_monthly, value));
  console.log(filteredList);

  return !checkUserId() ? (
    <div>아이디가 필요합니다</div>
  ) : (
    <div className="main_wrapper">
      <div className="main_grid">
        {renderGreet()}
        <div className="main_logout_box">
          <button onClick={handleLogOut} className="main_logout">
            로그아웃
          </button>
        </div>
        <Card sum={monthlySaved} user_name={user_name} onFormat={onFormat} />
        <List items={filteredList} onFormat={onFormat} />
        <AddItem user_id={user_id} />
        <div className="filterZone">
          <Search onChange={setValue} />
          <Filter onChange={setOrderBy} orderBy={orderBy} />
          <Link to="/listpage" className="main_link_listpage">
            리스트 전체보기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Main;
