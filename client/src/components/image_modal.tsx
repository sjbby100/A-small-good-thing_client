import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

//? 모달을 사용할 곳을 입력
Modal.setAppElement("body");

// todo state받아오기
export const ItemModal = (props: any) => {
  const [purchased, setPurchased] = useState(props.purchased);
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const afterOpenModal = () => {};
  const closeModal = () => {
    setIsOpen(false);
  };

  // todo 구매하기 : 링크로 연결
  // const handleLink = () => {
  //   return;
  // };
  // todo 구매완료 : setState purchased true
  const handlePurchased = async () => {
    // ! 현재 상태 구매로 바꿔주기
    // ! post 보내기
    let data = {
      user_id: props.user_id,
      item_name: props.item_name,
      item_price: props.item_price,
      memo: props.memo,
      purchased: props.purchased,
      date: props.date,
      worry: props.worry,
      category_id: props.category_id,
    };
    let opt = { headers: { "content-type": "application/json" } };
    let url = `http://18.217.232.233:8080/item?item_id=${props.item_id}`;
    try {
      const res = await axios.post(url, data, opt);
      if (res.status === 201) {
        //console.log(res.body);
        // Todo resbody로 상태 변경
        //새로고침? 카드 삭제?
      }
    } catch ({ response: { status } }) {
      if (status === 404) {
        alert("해당 아이템이 없습니다.");
      }
    }
  };
  // todo 수정하기 : 어려울듯 .. 제일 마지막에
  // todo 삭제하기 : axios post /delete data={userid, item id}
  const deleteItem = async () => {
    let data = { user_id: props.userid, image_id: props.image_id };
    console.log(data);
    let opt = {
      headers: { "content-type": "application/json" },
    };
    let url = `http://18.217.232.233:8080/item?item_id=${props.item_id}`;
    try {
      const res = await axios.post(url, data, opt);
      if (res.status === 202) {
        console.log("delete item");
        //! 상태변화
      }
    } catch ({ response: { status } }) {
      if (status === 404) {
        alert("해당 아이템이 없습니다.");
      }
    }
  };
  return <div></div>;
};