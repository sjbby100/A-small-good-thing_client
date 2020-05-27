import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useItems from "../hooks/useItems";
import useAuth from "../hooks/useAuth";
import { RouteComponentProps } from "react-router-dom";
import ListComponent from "../components/listComponent";
import Search from "../common/search";
import Filter from "../common/filter";
import util from "../services/util/index";
import ItemModal from "../components/item_modal";
import "./css/list.css";

const { onFormat, onOrder, onSearch, validUserId } = util;

interface props extends RouteComponentProps {}

const List: React.SFC<props> = ({ history }) => {
  let {
    items_total,
    getMonthlyItem,
    getTotalyItem,
    items_monthly,
    multiDelete,
  } = useItems();

  let [state, setState] = useState<any>({
    viewDateOption: "",
    curPage: 1,
    pageSize: 6,
    isEditable: false,
    multiSelect: {},
    value: "",
    curItem: {},
    curItems: [],
  });

  const { user_id, onLogin } = useAuth();

  let [orderBy, setOrderBy] = useState(["latest", "asc"]);

  useEffect(() => {
    handleDate();
    if (user_id === 0) {
      validUserId(vaildUserSucess, validUserFailed);
    } else {
      requestMonthlyItem(user_id);
    }
  }, []);

  useEffect(() => {
    user_id > 0 && user_id !== undefined && requestMonthlyItem(user_id);
  }, [user_id]);

  useEffect(() => {
    state.curItems.length === 0
      ? handleCurItem(items_monthly, state.viewDateOption)
      : handleCurItem(items_total, state.viewDateOption);
  }, [state.viewDateOption]);

  const handleDate = () => {
    console.log(" handleDate");
    let now = new Date();
    let month: string | number = now.getMonth() + 1;
    if (month.toString().length === 1) month = `0${month}`;
    let year = now.getFullYear();
    let date = year + "-" + month;
    setState({ ...state, viewDateOption: date });
  };
  const requestMonthlyItem = async (user_id: number) => {
    let url = `http://18.217.232.233:8080/monthly_list?user_id=${user_id}`;
    try {
      const res = await axios.get(url);
      const { items } = res.data.monthly_list;
      res.status === 201 && (await getMonthlyItem(items));
      await handleCurItem(items, state.viewDateOption);
    } catch (err) {
      console.log(err);
    } finally {
      requestTotalItem(user_id);
    }
  };

  const requestTotalItem = async (user_id: number) => {
    let url = `http://18.217.232.233:8080/total_list?user_id=${user_id}`;
    try {
      let res = await axios.get(url);
      console.log(" 토탈 리퀘스트");
      res.status === 201 && getTotalyItem(res.data.total_list.items);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCurItem = (targetItems: any, dateOption: "") => {
    let curItems = targetItems.filter((item: any) =>
      item.date.startsWith(dateOption),
    );
    setState({ ...state, curPage: 1, curItems });
  };

  const vaildUserSucess = (res: any) => onLogin(res.data);
  const validUserFailed = () => history.replace("/login");

  let pageSizing = (items: any, pageSize: number) => {
    return Math.ceil(items.length / pageSize);
  };

  let handlePageStyle = (target: number) => {
    if (target === state.curPage) {
      return { backgroundColor: "#7e7e7e", color: "#fff" };
    }
  };

  let renderPage = (size: number) => {
    let elements = [];
    for (let i = 1; i <= size; i++) {
      elements.push(
        <div
          key={`page_${i}`}
          onClick={() => setState({ ...state, curPage: i })}
          className="listpage_page"
          style={handlePageStyle(i)}
        >
          {i}
        </div>,
      );
    }
    return elements;
  };

  let filteredList = onOrder(onSearch(state.curItems, state.value), orderBy);

  let pagination = (items: any, currentPage: number, pageSize: number) => {
    const startIndex = (currentPage - 1) * pageSize;
    let result = items.slice(startIndex, startIndex + pageSize);
    return result;
  };

  const handleDelete = (items: any) => {
    return items.map((item: any) => {
      return item.id in state.multiSelect
        ? { ...item, isSelected: true }
        : item;
    });
  };

  let page = handleDelete(
    pagination(filteredList, state.curPage, state.pageSize),
  );

  const handleEdit = (id: number) => {
    let multiSelect = { ...state.multiSelect };
    id in multiSelect ? delete multiSelect[id] : (multiSelect[id] = true);
    setState({ ...state, multiSelect });
  };

  const handleClick = ({ id }: any) => {
    let curItem = state.curItems.filter((item: any) => item.id === id);
    curItem = { ...curItem[0] };
    setState({ ...state, curItem });
  };

  const handleEditModeClick = () => {
    let isEditable = state.isEditable ? false : true;
    setState({ ...state, isEditable, multiSelect: {} });
  };

  const handleEditBtnStyle = () => {
    if (state.isEditable === true) {
      return { boxShadow: "0 0 0 2.5px #ff7272 inset", border: "none" };
    }
  };

  const handelMultiDelete = async (user_id: number) => {
    let { multiSelect } = state;
    let obj = Object.keys(multiSelect);
    let items = obj.map((item) => Number(item));
    let url = `http://18.217.232.233:8080/items`;

    try {
      let res = await axios.delete(url, {
        headers: { "content-type": "application/json" },
        data: { user_id, multipleItems: items },
      });
      if (res.status === 202) {
        multiDelete(multiSelect);
        let curItems = [...state.curItems];

        let items = curItems.filter(
          (item: any) => !(item.id + "" in multiSelect),
        );
        setState({ ...state, curItems: items, multiSelect: {} });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleViewOption = (date: string) => {
    setState({ ...state, viewDateOption: date });
  };

  const devideDate = (items: any) => {
    let monthList: any = {};
    for (let item of items) {
      let date = item.date.slice(0, 7);
      if (!(date in monthList)) monthList[date] = true;
    }
    return monthList;
  };

  const renderMonthList = (list: any) => {
    let elements = [];
    for (const key in list) {
      elements.push(
        <li key={key} onClick={() => handleViewOption(key)}>{`${key.slice(
          6,
          7,
        )}월`}</li>,
      );
    }
    return elements;
  };

  return (
    <div className="listpage_container">
      <Link to={"/home"}>뒤로가기 </Link>
      <button onClick={() => handelMultiDelete(user_id)}></button>
      <div>{renderMonthList(devideDate(items_total))}</div>
      <ItemModal item={state.curItem} onClose={setState} state={state} />
      <div className="listpage_filter_zone"></div>
      <div className="listpage_items_modal">
        <ListComponent
          onFormat={onFormat}
          items={page}
          location="listpage"
          isEditable={state.isEditable}
          handleEdit={handleEdit}
          handleClick={handleClick}
        />
        <div className="listpage_page_group">
          {renderPage(pageSizing(filteredList, state.pageSize))}
        </div>
      </div>
      <div className="listpage_search_zone">
        <Search onChange={setState} location="listpage" state={state} />
        <Filter onChange={setOrderBy} orderBy={orderBy} location="listpage" />
        <button
          onClick={handleEditModeClick}
          className="listpage_editmode_btn"
          style={handleEditBtnStyle()}
        >
          편집하기
        </button>
      </div>
    </div>
  );
};

export default List;
