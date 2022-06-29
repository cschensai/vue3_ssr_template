import { defineStore } from 'pinia';

const useUser = defineStore('user', {
  state: () => {
    return {
      number: 0,
    };
  },
  actions: {
    addNumber() {
      this.number++;
    },
    logUserOut() {
      // todo
    },
  },
  getters: {},
})

export default useUser;