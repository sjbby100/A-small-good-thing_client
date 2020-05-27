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

Modal.setAppElement("body");

const ItemModal = ({ item, onClose, state }: any) => {
  let [currentItem, setCurrentItem] = useState(state.curItem);
  const [modalIsOpen, setIsOpen] = useState(false);
  const { purchaseItem } = useItems();
  const { deleteItem } = useItems();
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

  //* link연결
  const handleLink = () => {
    console.log(item.link);
    if (item.link.length === 0) {
      alert("링크가 없습니다.");
    } else {
      return window.open(item.link, "_blank");
    }
  };
  // todo 구매완료 : 체크박스
  const handlePurchased = async () => {
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

    let opt = { headers: { "content-type": "application/json" } };
    let url = `http://18.217.232.233:8080/item?item_id=${item.id}`;
    try {
      const res = await axios.patch(url, data, opt);
      if (res.status === 201) {
        console.log("구매하기로 변경");
      }
    } catch ({ response: { status } }) {
      if (status === 404) {
        alert("해당 아이템이 없습니다.");
      }
    }
  };
  // todo 수정하기 : 어려울듯 .. 제일 마지막에
  const editItem = async () => {};

  // todo 삭제하기 : 상태변화
  const handleDelete = async () => {
    if (window.confirm("해당 아이템을 삭제하시겠습니까?")) {
      let url = `http://18.217.232.233:8080/item?item_id=${item.id}`;
      try {
        const res = await axios.delete(url, {
          headers: { "content-type": "application/json" },
          data: { user_id: item.user_id, image_id: null },
        });
        if (res.status === 202) {
          console.log("delete item");
          deleteItem(item.id);
          onClose({ ...state, curItem: {} });
          setIsOpen(false);
        }
      } catch ({ response: { status } }) {
        if (status === 404) {
          alert("해당 아이템이 없습니다.");
        }
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
        </form>
        <button
          onClick={() => {
            handlePurchased();
          }}
        >
          구매완료
        </button>
        <button onClick={handleLink}>구매하기</button>
        <button>수정하기</button>
        <button onClick={handleDelete}>삭제하기</button>
        <button onClick={closeModal}>닫기</button>
      </Modal>
    </div>
  );
};
export default ItemModal;
