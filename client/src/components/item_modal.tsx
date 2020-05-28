import React, { useState, useEffect } from "react";
//import { Link } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import useItems from "../hooks/useItems";
import onFormat from "../services/util/onFormat";
import DatePicker from "react-datepicker";
import { newDate } from "./add_Item";
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
  //let [currentItem, setCurrentItem] = useState(state.curItem);
  const [modalIsOpen, setIsOpen] = useState(false);
  const { purchaseItem } = useItems();
  const { deleteItem } = useItems();
  const { deleteList } = useItems();
  const [editMode, seteditMode] = useState(false);
  //* 모달 설정
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

  //* 모달 버튼 - purchased
  const onPurchased = () => {
    //! 왜 처음에 undefined가 나올까?
    if (item.purchased === true) {
      onClose({ ...state, curItem: { ...item, purchased: false } });
    } else {
      onClose({ ...state, curItem: { ...item, purchased: true } });
    }
  };

  const handlePurchased = async () => {
    onPurchased();
    let data = { ...item };
    console.log(item);
    purchaseItem(item.id);
    let opt = { headers: { "content-type": "application/json" } };
    let url = `http://18.217.232.233:8080/item?item_id=${item.id}`;
    try {
      const res = await axios.patch(url, data, opt);
      if (res.status === 201) {
      }
    } catch ({ response: { status } }) {
      if (status === 404) {
        alert("해당 아이템이 없습니다.");
      }
    }
  };

  //* 모달 버튼 - 구매 하기
  const handleLink = () => {
    if (item.link.length === 0) {
      alert("링크가 없습니다.");
    } else {
      return window.open(item.link, "_blank");
    }
  };

  // * 삭제하기 : 상태변화
  const handleDelete = async () => {
    if (window.confirm("해당 아이템을 삭제하시겠습니까?")) {
      let url = `http://18.217.232.233:8080/item?item_id=${item.id}`;
      try {
        const res = await axios.delete(url, {
          headers: { "content-type": "application/json" },
          data: { user_id: item.user_id, image_file: item.image_file },
        });
        if (res.status === 202) {
          if (
            item.date.slice(5, 7) === String("0" + (new Date().getMonth() + 1))
          ) {
            deleteItem(item.id);
          } else {
            deleteList(item.id);
          }
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
  // todo 수정하기 : 어려울듯 .. 제일 마지막에
  const [editState, setEditState] = useState(item);

  const handleChange = ({ currentTarget }: any) => {
    const { value, name } = currentTarget;
    if (name === "item_price") {
      setEditState({
        ...editState,
        [name]: onFormat(Number(value.replace(/[^\.0-9]/g, ""))),
      });
    } else {
      setEditState({
        ...editState,
        [name]: value,
      });
    }
  };
  const dateChange = (date: any) => {
    setEditState({
      ...editState,
      date: date,
    });
  };
  const handleEdit = () => {
    if (editMode === false) {
      seteditMode(true);
    } else {
      //! 내용 종합해서 patch 요청 보내기
      seteditMode(false);
    }
  };
  const editItem_name = () => {
    return <input value={item.item_name} type="text" />;
  };
  const viewItem_name = () => {
    return <h2>{item.item_name}</h2>;
  };
  const editImage = () => {
    return <input type="file" />;
  };
  const viewImage = () => {
    return (
      <img
        style={{ width: "300px" }}
        src="https://asmallgoodthing.s3.ap-northeast-2.amazonaws.com/image/1590635473284.png"
      />
    );
  };
  const editMemo = () => {
    return <input type="text" placeholder={item.memo} />;
  };
  const viewMemo = () => {
    return <p>{item.memo}</p>;
  };
  const viewWorry = () => {
    return <p>{item.worry}</p>;
  };
  const editWorry = () => {
    return <input type="number" placeholder={item.worry} />;
  };
  const viewItem_price = () => {
    return <p>{`${onFormat(Number(item.item_price))}원`}</p>;
  };
  const editItem_price = () => {
    return (
      <input
        type="number"
        placeholder={`${onFormat(Number(item.item_price))}원`}
      />
    );
  };
  const viewDate = () => {
    return <p>{item.date}</p>;
  };
  const editDate = () => {
    return <DatePicker selected={editState.date} onChange={dateChange} />;
  };
  const editButton = () => {
    return <button onClick={handleEdit}>수정하기</button>;
  };
  const editCompleteButton = () => {
    return <button onClick={handleEdit}>수정완료</button>;
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
        <form onChange={handleChange}>
          <>
            <h2>item_name</h2>
            {editMode === true ? editItem_name() : viewItem_name()}
          </>
          <>
            <h2>image</h2>
            {editMode === true ? editImage() : viewImage()}
          </>
          <>
            <h2>고민하는 이유</h2>
            {editMode === true ? editMemo() : viewMemo()}
          </>
          <>
            <h2>고민의 정도</h2>
            {editMode === true ? editWorry() : viewWorry()}
          </>
          <>
            <h2>가격</h2>
            {editMode === true ? editItem_price() : viewItem_price()}
          </>
          <>
            <h2>등록일자</h2>
            {editMode === true ? editDate() : viewDate()}
          </>
        </form>
        <button
          onClick={() => {
            handlePurchased();
          }}
        >
          구매완료
        </button>
        <button onClick={handleLink}>구매하기</button>
        <button onClick={handleEdit}>수정하기</button>
        <button onClick={handleDelete}>삭제하기</button>
        <button onClick={closeModal}>닫기</button>
      </Modal>
    </div>
  );
};
export default ItemModal;
