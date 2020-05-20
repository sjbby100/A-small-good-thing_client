const BUG_ADDED = "bugAdded";

export const bugAdded = (itemname: string, price: number, desc: string) => ({
  type: BUG_ADDED,
  payload: {
    itemname,
    price,
    desc,
  },
});

let lastId = 0;

const reducer = (state: [] = [], action: any) => {
  switch (action.type) {
    case BUG_ADDED:
      return [
        ...state,
        {
          id: ++lastId,
          itemname: action.payload.itemname,
          price: action.payload.price,
          desc: action.payload.desc,
        },
      ];
    default:
      return state;
  }
};

export default reducer;
