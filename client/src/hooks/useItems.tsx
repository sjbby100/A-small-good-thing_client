import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules/reducer";
import { getItems, sumAllSaved } from "../modules/items";
import { useCallback } from "react";

export default function useItems() {
  const item = useSelector((state: RootState) => state.item);
  const monthlySaved = useSelector(
    (state: RootState) => state.item.mothlySaved,
  );
  const dispatch = useDispatch();
  const getItem = useCallback(
    (items: any) => {
      dispatch(getItems(items));
    },
    [dispatch],
  );
  const SumAllMonthly = useCallback(() => {
    dispatch(sumAllSaved());
  }, [dispatch]);
  return {
    item,
    getItem,
    monthlySaved,
    SumAllMonthly,
  };
}
