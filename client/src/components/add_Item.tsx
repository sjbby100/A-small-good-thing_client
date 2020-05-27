import React, { useState } from "react";
import axios from "axios";
import { Input } from "../common/input";
import useItems from "../hooks/useItems";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import onFormat from "../services/util/onFormat";

let newDate = (date: Date) => {
  //* yyyy-mm-dd
  let year: number = date.getFullYear();
  let month: any = date.getMonth() + 1;
  month = month >= 10 ? month : "0" + month;
  let day: any = date.getDate();
  day = day >= 10 ? day : "0" + day;
  return year + "-" + month + "-" + day;
};
const initialState = {
  item_name: "",
  item_price: "",
  memo: "",
  link: "",
  purchased: false,
  date: new Date(),
  worry: "",
  img: Image,
};
export const AddItem = ({ user_id }: any) => {
  const [state, setState] = useState(initialState);
  const { item_name, item_price, memo, link, purchased, worry } = state;
  const { getMonthlyItem, items_monthly } = useItems();

  // * img 업로드 관련
  const [img, setImage] = useState({ fileName: "", filePath: "" });
  const [content, setContent] = useState("");

  const handleImg = (e: any) => {
    setImage(e.target.files[0]);
  };
  const onSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", content);
    const url: string =
      "http://asmallgoodthing.s3-website.ap-northeast-2.amazonaws.com/";
    //axios.post(url, formdata)
  };

  const handleChange = ({ currentTarget }: any) => {
    const { value, name } = currentTarget;
    if (name === "item_price") {
      setState({
        ...state,
        [name]: onFormat(Number(value.replace(/[^-\.0-9]/g, ""))),
      });
    } else {
      setState({
        ...state,
        [name]: value,
      });
    }
  };
  //! util- 1000단위 , 입력 , 보낼때는 , 지워서 보내기
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

  const toRealNum = (str: any) => {
    return Number(str.replace(/,/gi, ""));
  };

  const handleAddItem = async (e: any) => {
    e.preventDefault();
    const { vali_error } = validateItem(item_name, item_price);
    if (vali_error === "") {
      let data = {
        user_id,
        item_name,
        item_price: toRealNum(item_price),
        memo,
        link,
        purchased,
        worry: Number(worry),
        date: newDate(state.date),
      };
      console.log("post data");
      console.log(data);
      let opt = {
        headers: { "content-type": "application/json" },
      };
      let url = "http://18.217.232.233:8080/item";
      try {
        const res = await axios.post(url, data, opt);
        if (res.status === 201) {
          setState({
            ...state,
            item_name: "",
            item_price: "",
            memo: "",
            link: "",
            purchased: false,
            date: new Date(),
            worry: "",
          });
          console.log(
            data.date.slice(5, 7),
            String("0" + (new Date().getMonth() + 1)),
          );
          if (
            data.date.slice(5, 7) === String("0" + (new Date().getMonth() + 1))
          ) {
            getMonthlyItem([...items_monthly, res.data]);
          }

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

  const dateChange = (date: any) => {
    setState({
      ...state,
      date: date,
    });
  };

  return (
    <form
      onSubmit={handleAddItem}
      style={{ display: "none" }}
      className="addItem"
      autoComplete="off"
    >
      <div className="innerBox">
        {renderInput(state)}
        <label>날짜</label>
        <DatePicker selected={state.date} onChange={dateChange} />
      </div>
      <div>
        <button className="addImg_button" onChange={handleImg}>
          이미지 넣기
        </button>
        <button className="addItem_button">추가</button>
      </div>
    </form>
  );
};
