import bookRepo from './bookRepo.js';
import userRepo from './userRepo.js';
import bookingRepo from './bookingRepo.js';

export default (model) => ({
  userRepo: userRepo(model.User),
  bookRepo: bookRepo(model.Book),
  bookingRepo: bookingRepo(model.Booking),
});