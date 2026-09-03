const INITIAL_STATE = {
  theme: {
    backgroundTheme: "black-background",
    headerTheme: "black-background2",
    textColor: "white",
    textColor2: "light-grey",
    textColor3: "white",
    bgColor: "dark-grey-bg",
    bgColor2: "",
    bgColor3: "black-background3",
    border: "dark-border",
  },
};

const AppReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "THEME":
      return {
        ...state,
        theme: action.theme,
      };
    default:
      return state;
  }
};

export default AppReducer;
