import client from '../client';
import uuid from 'uuidv4';
import store from '../store';

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
      
      return !omit ? state : {
        ...state,
        tasks: { ...newTasks, [payload.id]: { ...payload, saved: true }}
      }
    },

    remove(state, payload) {
      const id = payload.id ? payload.id : payload.localID;

      let newTasks = { ...state.tasks };
      delete newTasks[id];
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
      // add locally
      dispatch.list.add({ ...payload, localID });
      // save
      const { data: savedTask} = await client.post('/todos', payload);
      // get current state to check if changes happened
      const { list: { tasks }} = store.getState();
      // update sate with saved task info
      dispatch.list.addSaved({ ...savedTask, localID });

      const updatedTask = tasks[localID];
      // remove from remote if task was deleted locally
      if(!updatedTask) {
        return await dispatch.list.removeAsync(savedTask);
      }
      // update remotely if changes have happened
      if(updatedTask.text !== savedTask.text) {
        await dispatch.list.updateAsync({ ...updatedTask, id: savedTask.id });
      }
    },

    async updateAsync(payload, state) {
      dispatch.list.update({ ...payload, saved: false });
      if(payload.id) {
        const res = await client.put(`/todos/${payload.id}`, payload);
        dispatch.list.update({ ...res.data, saved: true });
      }
    },

    async removeAsync(payload, state) {
      dispatch.list.remove(payload);

      if(payload.id) {
        try {
          await client.delete(`/todos/${payload.id}`);
        } catch(e) {
          alert(`couldn't remove task`);
          dispatch.list.addSaved(payload);
        }
      }
    }
  })
}
