import { GLOBALTYPES } from "./globalType";

export const login = (data) => (dispatch) => {
  dispatch({ type: GLOBALTYPES.AUTH, payload: data });
  localStorage.setItem("auth", JSON.stringify(data));
};
