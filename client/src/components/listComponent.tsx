import React from "react";

const ListComponent: React.SFC<any> = ({ items }) => {
  const renderList = (items: any) => (
    <ul>
      {items.map((item: any) => (
        <li key={item.item_id}>
          <h1>{item.item_name}</h1>
          <h2>{item.item_price}</h2>
          <h2>{item.memo}</h2>
        </li>
      ))}
    </ul>
  );
  return <div>{renderList(items)}</div>;
};

export default ListComponent;
