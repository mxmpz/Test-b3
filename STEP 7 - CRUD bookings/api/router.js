
export default (controlers, app) => {
  app.get('/statusCheck', controlers.statusCheck.getStatus);
  app.get('/books', controlers.bookCtrl.listBooks);
  app.post('/books', controlers.bookCtrl.createBook);
  app.get('/books/:id', controlers.bookCtrl.getBook);
  app.put('/books/:id', controlers.bookCtrl.updateBook);
  app.delete('/books/:id', controlers.bookCtrl.deleteBook);
  //Route User
  app.get('/users', controlers.userCtrl.listUsers);
  app.post('/users', controlers.userCtrl.createUser);
  app.get('/users/:id', controlers.userCtrl.getUser);
  app.put('/users/:id', controlers.userCtrl.updateUser);
  app.delete('/users/:id', controlers.userCtrl.deleteUser);
  //Route Bookings
  app.get('/bookings', controlers.bookingCtrl.listBookings);
  app.post('/bookings', controlers.bookingCtrl.createBooking);
  app.get('/bookings/:id', controlers.bookingCtrl.getBooking);
  app.put('/bookings/:id', controlers.bookingCtrl.updateBooking);
  app.delete('/bookings/:id', controlers.bookingCtrl.deleteBooking);
}
