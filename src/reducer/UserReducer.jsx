// import { AdminState } from "../../context/AdminContext";

// const initialState = [];

const userReducer = (state, action) => {
  //   const { data } = AdminState();
  //   initialState = data;
  switch (action.type) {
    case "Add_USERS": {
      return [...state, action.payload];
    }
    case "EDIT_USER": {
      return state?.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload;
        } else {
          return user;
        }
      });
    }

    case "DELETE_USER": {
      return state.filter((user) => user.id !== action.payload);
    }

    case "DELETE_SELECTED_USERS": {
      return state.filter((user) => !user.isChecked);
      //   return state.filter((user) => !action.payload.includes(user.id));
    }

    case "SELECT_USERS": {
      //   return [...state, { ...action.payload.user }];
      return state.map((user) => {
        if (user.id === action.payload.user.id) {
          return action.payload.user;
        } else {
          return user;
        }
      });

      //   return state.map((user) => ({
      //     ...user,
      //     isChecked: action.payload,
      //   }));
    }

    default:
      return action.payload;
  }
  throw Error("Unknow Error: ", action.type);
};

export default userReducer;
