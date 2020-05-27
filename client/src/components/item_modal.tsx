import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import useItems from "../hooks/useItems";
import onFormat from "../services/util/onFormat";
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
const ItemModal = ({ item, onClose, state }: any) => {
  //! 변경은 스토어로<!DOCTYPE html>
  // const [purchased, setPurchased] = useState(item.purchased);

  const [modalIsOpen, setIsOpen] = useState(false);
  const { purchaseItem } = useItems();
  const openModal = () => {
    setIsOpen(true);
  };
  const afterOpenModal = () => {};
  const closeModal = () => {
    onClose({ ...state, curItem: {} });
    setIsOpen(false);
  };
  useEffect(() => {
    Object.keys(item).length > 0 && openModal();
  }, [state]);
  // todo 구매하기 : 링크로 연결
  // const handleLink = () => {
  //   return;
  // };
  // todo 구매완료 : setState purchased true
  const handlePurchased = async () => {
    // ! 현재 상태 구매로 바꿔주기
    // ! post 보내기
    let data = {
      //? 지은님과 상의 후 간략하게 수정 가능 할 것 으로 예상
      user_id: item.user_id,
      item_name: item.item_name,
      item_price: item.item_price,
      memo: item.memo,
      purchased: item.purchased,
      date: item.date,
      worry: item.worry,
      category_id: item.category_id,
    };
    purchaseItem(item.id);

    // let opt = { headers: { "content-type": "application/json" } };
    // let url = `http://18.217.232.233:8080/item?item_id=${item.item_id}`;
    // try {
    //   const res = await axios.post(url, data, opt);
    //   if (res.status === 201) {
    //     //console.log(res.body);
    //     // Todo resbody로 상태 변경
    //     //새로고침? 카드 삭제?
    //   }
    // } catch ({ response: { status } }) {
    //   if (status === 404) {
    //     alert("해당 아이템이 없습니다.");
    //   }
    // }
  };
  // todo 수정하기 : 어려울듯 .. 제일 마지막에
  // todo 삭제하기 : axios post /delete data={userid, item id}
  const deleteItem = async () => {
    let data = { user_id: item.userid, image_id: item.image_id };
    console.log(data);
    let opt = {
      headers: { "content-type": "application/json" },
    };
    let url = `http://18.217.232.233:8080/item?item_id=${item.item_id}`;
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

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>{item.item_name}</h2>
        <img src="https://res.cloudinary.com/dgggcrkxq/image/upload/v1579705687/noticon/k1amz2nqzg6pgowfuchn.gif" />
        <img src="https://res.cloudinary.com/dgggcrkxq/image/upload/v1567062612/noticon/fqdjmxuq27tt7o4umaoy.gif" />
        <div>{item.memo}</div>
        <div>{item.worry}</div>
        <div>{`${onFormat(Number(item.item_price))}원`}</div>
        <form>
          <input />
          <a
            className="modal_link"
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.naver.com"
          >
            구매하기
          </a>
        </form>
        <button
          onClick={() => {
            handlePurchased();
          }}
        >
          구매완료
        </button>
        <button>수정하기</button>
        <button onClick={deleteItem}>삭제하기</button>
        <button onClick={closeModal}>닫기</button>
      </Modal>
    </div>
  );
};
export default ItemModal;
