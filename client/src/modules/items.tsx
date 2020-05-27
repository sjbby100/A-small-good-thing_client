export const ITEMS_GET = "MONTHLY_ITEMS_GET" as const;
export const ITEMS_STORE_INIT = "ITEM_STORE_INIT" as const;
export const ITEMS_SUM_ALL_SAVED_MONTHLY_AMOUNT = "ITEMS_SUM_ALL_SAVED_MONTHLY_AMOUNT" as const;
export const getMonthlyItems = (items: any) => ({
  type: ITEMS_GET,
  payload: items,
});

export const sumAllSaved = () => ({
  type: ITEMS_SUM_ALL_SAVED_MONTHLY_AMOUNT,
});
export const itemsInit = () => ({
  type: ITEMS_STORE_INIT,
});
const initialItemState: any = {
  items_total: [],
  items_monthly: [],
  mothlySaved: 0,
};

type ItemsAction =
  | ReturnType<typeof getMonthlyItems>
  | ReturnType<typeof sumAllSaved>
  | ReturnType<typeof itemsInit>;
const reducer = (state = initialItemState, action: ItemsAction) => {
  switch (action.type) {
    case ITEMS_GET:
      return {
        ...state,
        items_monthly: [...action.payload],
      };
    case ITEMS_SUM_ALL_SAVED_MONTHLY_AMOUNT:
      let mothlySaved = state.items_monthly.reduce(
        (acc: number, { item_price, puchased }: any) =>
          !puchased && (acc += item_price),
        0,
      );
      return { ...state, mothlySaved };
    case ITEMS_STORE_INIT:
      return { ...initialItemState };
    default:
      return state;
  }
};

export default reducer;
