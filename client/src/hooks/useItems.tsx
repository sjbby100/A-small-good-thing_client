import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules/reducer";
import { getMonthlyItems, sumAllSaved } from "../modules/items";
import { useCallback } from "react";

export default function useItems() {
  const items_monthly = useSelector(
    (state: RootState) => state.items.items_monthly,
  );
  const monthlySaved = useSelector(
    (state: RootState) => state.items.mothlySaved,
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
  return {
    items_monthly,
    getMonthlyItem,
    monthlySaved,
    SumAllMonthly,
  };
}
