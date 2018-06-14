import client from '../client';

export default {
  state: {
    list: {},
    loading: true
  },

  reducers: {
    add(state, payload) {
      return {
        ...state,
        list: {
          ...state.list,
          [payload.index]: payload
        }
      }
    },

    remove(state, payload) {
      let newState = {...state};
      delete newState[payload.index];
      return newState;
    },

    load(state, payload) {
      let list = {...state.list};
      payload.forEach(t => list[t.id] = t);
      return {...state, list, loading: false };
    },

    isLoading(state) {
      return { ...state, loading: true };
    }
  },

  effects: dispatch => ({
    async loadAsync(state) {
      dispatch.todos.isLoading();
      const res = await client.get('/todos');
      dispatch.todos.load(res.data);
    }
  })
}

