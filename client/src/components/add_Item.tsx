import React from "react";
//: request에 해당 user_id, item_name, item_price, date 필수
interface valueProps {
  user_id: number;
  item_name: string;
  item_price: number;
  //date: any;
  memo?: string;
  link?: string;
  purchased?: boolean;
  worry?: number;
  category_id?: number;
  //image_id?: number;
  //onChange: any;
}
let newDate = (date: Date) => {
  let year: number = date.getFullYear();
  let month: any = date.getMonth() + 1;
  month = month >= 10 ? month : "0" + month;
  let day: any = date.getDate();
  day = day >= 10 ? day : "0" + day;
  return year + "-" + month + "-" + day;
};
export const Add_Item = ({
  user_id,
  item_name,
  item_price,
  //date,
  memo,
  link,
  purchased,
  worry,
  category_id,
}: //onChange,
//image_id,
valueProps) => {
  return (
    <div>
      <div>
        <label>제품명을 적어주세요</label>
        <input
          name="item_name"
          value={item_name}
          // onChange={onChange}
          placeholder="제품명"
        />
      </div>
      <div>
        <label>가격을 적어주세요</label>
        <input
          name="item_price"
          value={item_price}
          // onChange={onChange}
          placeholder="가격"
        />
      </div>
      <div>
        <label>고민하는 이유를 적어보세요</label>
        <input
          name="memo"
          value={memo}
          // onChange={onChange}
          placeholder="이유"
        />
      </div>
      <div>
        <label>링크를 입력해주세요</label>
        <input
          name="item_name"
          value={item_name}
          //  onChange={onChange}
          placeholder="제품명"
        />
      </div>
      <div>
        <label>날짜를 입력해주세요</label>
        <input name="date" value={newDate(new Date())} />
      </div>
      <div>
        <button>이미지 넣기</button>
      </div>
    </div>
  );
};

//export const validateAddItem = ()
