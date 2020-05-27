import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules/reducer";
import {
  getMonthlyItems,
  sumAllSaved,
  itemsInit,
  purchasedItem,
  deletedItem,
} from "../modules/items";
import { useCallback } from "react";

export default function useItems() {
  const items_monthly = useSelector(
    (state: RootState) => state.items.items_monthly,
  );
  const monthlySaved = useSelector(
    (state: RootState) => state.items.mothlySaved,
  );
  const items_total = useSelector(
    (state: RootState) => state.items.items_total,
  );

  const dispatch = useDispatch();

  const getMonthlyItem = useCallback(
    (items: any) => {
      dispatch(getMonthlyItems(items));
    },
    [dispatch],
  );
  const SumAllMonthly = useCallback(() => {
    dispatch(sumAllSaved());
  }, [dispatch]);
  const itemStoreInit = useCallback(() => {
    dispatch(itemsInit());
  }, [dispatch]);
  const purchaseItem = useCallback(
    (item_id) => {
      dispatch(purchasedItem(item_id));
    },
    [dispatch],
  );
  const deleteItem = useCallback(
    (item_id) => {
      dispatch(deletedItem(item_id));
    },
    [dispatch],
  );

  return {
    items_total,
    itemStoreInit,
    items_monthly,
    getMonthlyItem,
    monthlySaved,
    SumAllMonthly,
    purchaseItem,
    deleteItem,
  };
}
