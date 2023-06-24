import { MEMBERTYPES } from "../action/memberAction";

const initialState = localStorage.getItem("members")
  ? JSON.parse(localStorage.getItem("members"))
  : [];

const memberReducer = (state = initialState, action) => {
  switch (action.type) {
    case MEMBERTYPES.ADD:
      localStorage.setItem(
        "members",
        JSON.stringify([...state, action.payload])
      );
      return [...state, action.payload];
    case MEMBERTYPES.UPDATE:
      let arr = state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
      localStorage.setItem("members", JSON.stringify([...arr]));
      return [...arr];
    case MEMBERTYPES.DELETE:
      let tempArr = state.filter((item) => item._id !== action.payload);
      localStorage.setItem("members", JSON.stringify([...tempArr]));
      return [...tempArr];
    default:
      return state;
  }
};

export default memberReducer;
