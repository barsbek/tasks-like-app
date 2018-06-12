export default {
  state: {},

  reducers: {
    add(state, payload) {
      return {
        ...state,
        [payload.index]: payload
      }
    },

    remove(state, payload) {
      let newState = {...state};
      delete newState[payload.index];
      return newState;
    }
  }
}

