import React, { useState } from "react";
import axios from "axios";
import { Input } from "../common/input";
import useItems from "../hooks/useItems";
//: request에 해당 user_id, item_name, item_price, date 필수
interface valueProps {
  user_id: number;
  item_name: string;
  item_price: string;
  //date: any;
  memo?: string;
  link?: string;
  purchased?: boolean;
  worry?: number;
  category_id?: number;
  //image_id?: number;
  onChange: any;
}

let newDate = () => {
  //yyyy-mm-dd
  let date = new Date();
  let year: number = date.getFullYear();
  let month: any = date.getMonth() + 1;
  month = month >= 10 ? month : "0" + month;
  let day: any = date.getDate();
  day = day >= 10 ? day : "0" + day;
  return year + "-" + month + "-" + day;
};

export const AddItem = ({ user_id }: any) => {
  const [state, setState] = useState({
    item_name: "",
    item_price: "",
    memo: "",
    link: "",
    purchased: false,
    date: "2020-05-25",
    worry: 0,
  });
  const { item_name, item_price, memo, link, purchased, worry } = state;
  const { getMonthlyItem, items_monthly } = useItems();
  const handleChange = ({ currentTarget }: any) => {
    const { value, name } = currentTarget;
    setState({
      ...state,
      [name]: value,
    });
  };

  const validateItem = (item_name: string, item_price: string) => {
    let vali_error = "";
    if (item_name === "") {
      vali_error = "제품명을 입력해주세요";
    }
    if (item_price === "") {
      vali_error = "가격을 입력해주세요";
    }
    // if(date === ""){
    //   vali_error = "날짜를 입력해주세요"
    // }
    return { vali_error };
  };

  const handleAddItem = async (e: any) => {
    e.preventDefault();

    const { vali_error } = validateItem(item_name, item_price);
    if (vali_error == "") {
      let data = {
        user_id,
        item_name,
        item_price: Number(item_price),
        memo,
        link,
        purchased,
        worry,
        date: newDate(),
      };
      console.log(data);
      let opt = {
        headers: { "content-type": "application/json" },
      };
      let url = "http://18.217.232.233:8080/item";
      try {
        const res = await axios.post(url, data, opt);
        if (res.status === 201) {
          // await history.replace("/home");
          // console.log(res);
          getMonthlyItem([...items_monthly, res.data]);
          console.log("%c 아이템 추가 완료", "color: green");
        }
      } catch ({ response: { status } }) {
        if (status === 409) {
          alert("이미 존재하는 아이템입니다.");
          //history.replace("/home");
        }
      }
    }
  };
  const renderInput = (state: any) => {
    let renderArr = [];
    for (let key in state) {
      if (
        key === "item_name" ||
        key === "memo" ||
        key === "item_price" ||
        key === "link" ||
        key === "worry"
      ) {
        renderArr.push(
          <Input
            name={key}
            key={`Add_item_${key}`}
            value={state[key]}
            location="addItem"
            onChange={handleChange}
          />,
        );
      }
    }
    return renderArr;
  };

  return (
    <form onSubmit={handleAddItem} className="addItem" autoComplete="off">
      {renderInput(state)}
      {/* <div>
        <label>날짜를 입력해주세요(기본값: 현재)</label>
        <input name="date" value={date} /> */}
      {/*<div>
        <button>이미지 넣기</button>
      </div> */}
      <button className="addImg_button">이미지 넣기</button>
      <button className="addItem_button">추가</button>
    </form>
  );
};
