import client from '../client';
import uuid from 'uuidv4';

export default {
  state: {
    tasks: {},
    loading: true
  },

  reducers: {
    add(state, payload) {
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [payload.localID]: { ...payload, saved: false }
        }
      }
    },

    addSaved(state, payload) {
      let {[payload.localID]: omit, ...newtasks} = state.tasks;
      return {
        ...state,
        tasks: {
          ...newtasks,
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
      let tasks = {...state.tasks};
      payload.forEach(t => {
        t.saved = true;
        tasks[t.id] = t;
      });
      return {...state, tasks, loading: false };
    },

    update(state, payload) {
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [payload.id]: payload
        }
      }
    },

    isLoading(state) {
      return { ...state, loading: true };
    }
  },

  effects: dispatch => ({
    async loadAsync(state) {
      const res = await client.get('/todos');
      dispatch.list.load(res.data);
    },

    async addAsync(payload, state) {
      const localID = uuid();
      dispatch.list.add({ ...payload, localID });
      const res = await client.post('/todos', payload);
      dispatch.list.addSaved({ ...res.data, localID });
    },

    async updateAsync(payload, state) {
      const res = await client.put(`/todos/${payload.id}`, payload);
      dispatch.list.update({ ...res.data, saved: true });
    }
  })
}
