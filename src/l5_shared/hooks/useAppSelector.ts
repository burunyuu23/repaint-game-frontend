import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "@/l3_features/redux/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;