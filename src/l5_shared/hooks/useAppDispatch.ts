import {useDispatch} from "react-redux";
import {AppDispatch} from "@/l5_shared/redux/store"

export const useAppDispatch = () => useDispatch<AppDispatch>();