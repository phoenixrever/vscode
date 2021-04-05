export default {
  add(state, user) {
    state.ucenter = user;
  },
  remove(state) {
    state.ucenter = {};
  }
};
