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
import arrow from "../img/arrow.svg";
import "./css/list.css";
import { url } from "inspector";

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
    viewDateOption: "2020-05",
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
    let now = new Date();
    let month: string | number = now.getMonth() + 1;
    if (month.toString().length === 1) month = `0${month}`;
    let year = now.getFullYear();
    let viewDateOption = year + "-" + month;
    setState({ ...state, viewDateOption });
  };
  const requestMonthlyItem = async (user_id: number) => {
    let url = `http://18.217.232.233:8080/monthly_list?user_id=${user_id}`;
    try {
      const res = await axios.get(url);
      const { items } = res.data.monthly_list;
      res.status === 201 && (await getMonthlyItem(items));
      await handleCurItem(items, state.viewDateOption);
    } catch (err) {

    } finally {
      requestTotalItem(user_id);
    }
  };

  const requestTotalItem = async (user_id: number) => {
    let url = `http://18.217.232.233:8080/total_list?user_id=${user_id}`;
    try {
      let res = await axios.get(url);

      res.status === 201 && getTotalyItem(res.data.total_list.items);
    } catch (err) {

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
  const handleMonthCardStyle = (curMonth: string) => {
    let style: any = {};
    let month = state.viewDateOption;

    let now = new Date().getMonth() + 1;
    if (curMonth === month) {
      style.backgroundColor = "#ff7272";
      style.width = "148px";
      style.color = "#fff";
      style.height = "113px";
    }
    if (month === "") {
      if (now === Number(curMonth.slice(-2))) {
        style.backgroundColor = "#ff7272";
        style.width = "148px";
        style.color = "#fff";
        style.height = "113px";
      }
    }
    return style;
  };

  handleMonthCardStyle("4");
  const renderMonthList = (list: any) => {
    let elements = [];
    for (const key in list) {
      elements.push(
        <li
          key={key}
          onClick={() => handleViewOption(key)}
          className="listpage_month"
          style={handleMonthCardStyle(key)}
          // style={{ backgroundColor: "#ff7272" }}
        >{`${key.slice(6, 7)}월`}</li>,
      );
    }
    return elements;
  };
  const renderDeleteBtn = (isEditable: boolean) =>
    isEditable && (
      <button
        onClick={() => handelMultiDelete(user_id)}
        className="listpage_delete"
      >
        삭제
      </button>
    );
  const handleAllViewBtn = () => {
    setState({ ...state, curItems: items_total, viewDateOption: "" });
  };
  const handleMonthlyViewBtn = () => {};
  return (
    <div className="listpage_container">
      <ItemModal item={state.curItem} onClose={setState} state={state} />
      <div className="listpage_filter_zone">
        <Link
          to={"/home"}
          className="listpage_back"
          style={{ background: `url(${arrow}) no-repeat` }}
        />
        <div className="listpage_view_select">
          <div className="listpage_view_option" onClick={handleAllViewBtn}>
            <span
              className="listpage_view_checkbox"
              style={
                state.viewDateOption === "" ? { background: "#646464" } : {}
              }
            />
            <div className="listpage_view_text">전체보기</div>
          </div>
          <div className="listpage_view_option" onClick={handleDate}>
            <span
              className="listpage_view_checkbox"
              style={
                state.viewDateOption !== "" ? { background: "#646464" } : {}
              }
            />
            <div className="listpage_view_text">월 별</div>
          </div>
        </div>
        <div className="listpage_flex_line"></div>
        <div className="listpage_month_box">
          {state.viewDateOption ? renderMonthList(devideDate(items_total)) : ""}
        </div>
      </div>
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
        {renderDeleteBtn(state.isEditable)}
      </div>
    </div>
  );
};

export default List;
