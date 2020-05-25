import React from "react";

const ListComponent: React.SFC<any> = ({
  items,
  onFormat,
  location = "main",
}: any) => {
  const renderList = (items: any) => (
    <ul className={`${location}_list`}>
      {items.map((item: any) => (
        <li key={item.item_id} className={`${location}_list_item`}>
          <div className={`${location}_list_image`}></div>
          <h1 className={`${location}_list_name`}>{item.item_name}</h1>
          {item.memo && (
            <h2 className={`${location}_list_memo`}>{item.memo}</h2>
          )}
          <h2 className={`${location}_list_price`}>
            {`${onFormat(item.item_price)}원`}
          </h2>
        </li>
      ))}
    </ul>
  );

  const renderEmptyList = () => {
    return (
      <ul className={`${location}_list`}>
        <div className={`${location}_empty_list`}>
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
      {items.length === 0 && location === "main"
        ? renderEmptyList()
        : renderList(items)}
    </React.Fragment>
  );
};

export default ListComponent;
