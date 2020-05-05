import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";

const CHANGE_EVENT = "change";
let _users = [];

class UserStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getUsers() {
    return _users;
  }
}

const store = new UserStore();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.LOAD_USERS:
      _users = action.users;
      store.emitChange();
      break;
    case actionTypes.ADD_USERS:
      _users.push(action.user);
      store.emitChange();
      break;
    default:
    // nothing to do here
  }
});

export default store;
