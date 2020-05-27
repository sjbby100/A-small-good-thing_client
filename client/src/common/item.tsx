import React from "react";
import onFormat from "../services/util/onFormat";
interface Props {
  location?: string;
  isEditable: boolean;
  handleEdit?: Function;
  handleClick: Function;
  item: any;
}
const Item: React.SFC<Props> = ({
  item,
  location,
  isEditable,
  handleClick,
  handleEdit,
}) => {
  const renderDeletableItem = (item: any) => {
    let style: any = {};

    if (item.isSelected && isEditable) {
      // style.boxShadow = "0 0 0 1.5px #F8F8F8 inset";
      style.boxShadow = "0 0 0 2.5px #ff7272 inset";
      style.backgroundColor = "#fff";
    }
    if (isEditable) {
      style.cursor = "pointer";
    }
    return style;
  };
  const handleBtnClickEvent = (item?: any) => {
    isEditable && handleEdit && handleEdit(item.id);
    isEditable === false && handleClick(item);
  };

  return (
    <li
      key={item.id}
      className={`${location}_list_item`}
      onClick={() => handleBtnClickEvent(item)}
      style={renderDeletableItem(item)}
    >
      <div className={`${location}_list_image`}></div>
      <h1 className={`${location}_list_name`}>{item.item_name}</h1>
      {item.memo && <h2 className={`${location}_list_memo`}>{item.memo}</h2>}
      <h2 className={`${location}_list_price`}>
        {`${onFormat(item.item_price)}원`}
      </h2>
    </li>
  );
};

export default Item;
