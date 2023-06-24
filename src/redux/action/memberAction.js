export const MEMBERTYPES = {
  ADD: "ADD",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
};

export const addMember = (data) => (dispatch) => {
  dispatch({ type: MEMBERTYPES.ADD, payload: data });
};

export const updateMember = (data) => (dispatch) => {
  dispatch({ type: MEMBERTYPES.UPDATE, payload: data });
};

export const deleteMember = (id) => (dispatch) => {
  dispatch({ type: MEMBERTYPES.DELETE, payload: id });
};
