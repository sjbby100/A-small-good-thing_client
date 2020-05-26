import React from "react";
import onFormat from "../services/util/onFormat";
interface Props {
  location?: string;
  isEditMod?: boolean;
  item: any;
}
const Item: React.SFC<Props> = ({ item, location }) => {
  return (
    <li key={item.id} className={`${location}_list_item`}>
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
