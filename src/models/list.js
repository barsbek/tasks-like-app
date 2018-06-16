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
      let {[payload.localID]: omit, ...newTasks} = state.tasks;
      return {
        ...state,
        tasks: {
          ...newTasks,
          [payload.id]: { ...payload, saved: true }
        }
      }
    },

    remove(state, payload) {
      let newTasks = { ...state.tasks };
      delete newTasks[payload.id];
      return { ...state, tasks: newTasks };
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
      const id = payload.id ? payload.id : payload.localID;
      return {
        ...state,
        tasks: { ...state.tasks, [id]: payload }
      }
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
      await dispatch.list.update({ ...payload, saved: false });
      if(payload.id) {
        const res = await client.put(`/todos/${payload.id}`, payload);
        await dispatch.list.update({ ...res.data, saved: true });
      }
    },

    async removeAsync(payload, state) {
      dispatch.list.remove(payload);
      try {
        await client.delete(`/todos/${payload.id}`);
      } catch(e) {
        alert(`couldn't remove task`);
        dispatch.list.addSaved(payload);
      }
    }
  })
}
