export const ITEMS_GET = "ITEMS_GET" as const;
export const ITEMS_SUM_ALL_SAVED_MONTHLY_AMOUNT = "ITEMS_SUM_ALL_SAVED_MONTHLY_AMOUNT" as const;
export const getItems = (data: any) => ({
  type: ITEMS_GET,
  payload: data,
});

export const sumAllSaved = () => ({
  type: ITEMS_SUM_ALL_SAVED_MONTHLY_AMOUNT,
});

const initialItemState: any = {
  items: [],
  mothlySaved: 0,
};

type ItemsAction = ReturnType<typeof getItems> | ReturnType<typeof sumAllSaved>;

const reducer = (state = initialItemState, action: ItemsAction) => {
  switch (action.type) {
    case ITEMS_GET:
      return { ...state, items: [...state.items, ...action.payload] };
    case ITEMS_SUM_ALL_SAVED_MONTHLY_AMOUNT:
      let mothlySaved = state.items.reduce(
        (acc: number, { item_price }: any) => (acc += item_price),
        0,
      );
      return { ...state, mothlySaved };
    default:
      return state;
  }
};

export default reducer;
