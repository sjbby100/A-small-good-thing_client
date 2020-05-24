import React from "react";

const ListComponent: React.SFC<any> = (
  { items, onFormat }: any | null = null,
) => {
  const numberWithCommas = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const renderList = (items: any) => (
    <ul className="main_list">
      {items.map((item: any) => (
        <li key={item.item_id} className="main_list_item">
          <div className="main_list_image"></div>
          <h1 className="main_list_name">{item.item_name}</h1>
          {item.memo && <h2 className="main_list_memo">{item.memo}</h2>}
          <h2 className="main_list_price">
            {`${onFormat(item.item_price)}원`}
          </h2>
        </li>
      ))}
    </ul>
  );

  const renderEmptyList = () => {
    return (
      <ul className="main_list">
        <div className="main_empty_list">
          앗 ! 아직 이번달은 고민할 제품이 없어요.
          <br />
          좌측에 <h1 className="accent">입력하기 버튼</h1>을 사용해 제품을
          추가해보세요
        </div>
      </ul>
    );
  };
  return (
    <React.Fragment>
      {items ? renderList(items) : renderEmptyList()}
    </React.Fragment>
  );
};

export default ListComponent;
