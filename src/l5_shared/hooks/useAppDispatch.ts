import {useDispatch} from "react-redux";
import {AppDispatch} from "@/l3_features/redux/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();