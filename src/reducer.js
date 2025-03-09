const initaialState = {
  sorted: [],
  respondedVacancies: 0,
  currentCard: {},
  fullCurrentCard: {},
  message: "",
};

export const reducer = (state = initaialState, action) => {
  switch (action.type) {
    case "SORTED_VACANCIES":
      return { ...state, sorted: action.sorted };
    case "RESPONDED_VACANCIES": 
      return {...state, respondedVacancies: action.respondedVacancies}
    case "FULL_CURRENT_CARD":
      return { ...state, fullCurrentCard: action.fullCurrentCard };
    case "CURRENT_CARD":
      return { ...state, currentCard: action.currentCard };
    case "MESSAGE":
      return { ...state, message: action.message };
    default:
      return state;
  }
};
