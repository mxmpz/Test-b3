import statusCheck from './statusCheck.js';
import bookCtrl from './bookCtrl.js';
import userCtrl from './userCtrl.js';

export default (repository) => ({
  statusCheck,
  bookCtrl: bookCtrl(repository.bookRepo),
  userCtrl: userCtrl(repository.userRepo),
});