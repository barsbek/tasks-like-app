import client from '../client'
import uuid from 'uuidv4'

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
          [payload.localID]: { ...payload, saved: false }
        }
      }
    },

    addSaved(state, payload) {
      let {[payload.localID]: omit, ...newList} = state.list;
      return {
        ...state,
        list: {
          ...newList,
          [payload.id]: { ...payload, saved: true }
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
      payload.forEach(t => {
        t.saved = true;
        list[t.id] = t;
      });
      return {...state, list, loading: false };
    },

    isLoading(state) {
      return { ...state, loading: true };
    }
  },

  effects: dispatch => ({
    async loadAsync(state) {
      const res = await client.get('/todos');
      dispatch.todos.load(res.data);
    },

    async addAsync(payload, state) {
      const localID = uuid();
      dispatch.todos.add({ ...payload, localID });
      const res = await client.post('/todos', payload);
      dispatch.todos.addSaved({ ...res.data, localID });
    }
  })
}
