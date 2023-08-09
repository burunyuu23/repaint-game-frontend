import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "@/l5_shared/redux/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;