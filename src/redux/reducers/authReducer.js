import { SET_USER } from "../types/authTypes";

const initialState = {
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: {
          user: action.user,
          accessToken: action.accessToken,
        },
      };
    default:
      return state;
  }
}
