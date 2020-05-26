import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import Modal from "react-modal";

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
//? Modal.setAppElement(".modal");

// todo state받아오기
// interface Props extends RouteComponentProps {}
export const ItemModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const afterOpenModal = () => {};
  const closeModal = () => {
    setIsOpen(false);
  };

  // todo 구매하기 : 링크로 연결
  const handleLink = () => {};
  // todo 구매완료 : setState purchased true
  // todo 수정하기 : 어려울듯 .. 제일 마지막에
  // todo 삭제하기 : axios post /delete data={userid, item id}
  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>item_name</h2>
        <img src="https://res.cloudinary.com/dgggcrkxq/image/upload/v1579705687/noticon/k1amz2nqzg6pgowfuchn.gif" />
        <img src="https://res.cloudinary.com/dgggcrkxq/image/upload/v1567062612/noticon/fqdjmxuq27tt7o4umaoy.gif" />
        <div>memo</div>
        <div>item_price</div>
        <form>
          <input />
          <button onClick={handleLink}>구매하기</button>
          <button>구매완료</button>
          <button>수정하기</button>
          <button>삭제하기</button>
          <button onClick={closeModal}>닫기</button>
        </form>
      </Modal>
    </div>
  );
};
