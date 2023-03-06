export default (Booking) => {
  const bookings = [
    new Booking('1236545796533', '2023-03-02', '2023-06-21', 'Livre', '9782743007080'),
    new Booking('1234567345843', '2019-08-15', '2019-11-29', 'Film', '9782743007080')
  ];

  const listBookings = () => {
    return bookings;
  };

  const createBooking = (booking) => {
    bookings.push(new Booking(
      booking.id,
      booking.rentDate,
      booking.returnDate,
      booking.book,
      booking.user,
    ));
    return booking;
  }

  const findBooking = (id) => {
    return bookings.find((booking) => booking.id === id);
  }

  const updateBooking = (id, booking) => {
    let foundBookingIdx = 0;
    bookings.forEach((booking, idx) => {
      if (booking.isbn13 === id) {
        foundBookingIdx = idx;
      }
    });
    
    if (foundBookingIdx > 0) {
      bookings[foundBookingIdx] = new Booking(
        booking.id,
        booking.rentDate,
        booking.returnDate,
        booking.book,
        booking.user,
      );
      return booking;
    }

    return null;
  }

  const deleteBooking = (id) => {
    let deletedBooking = null;
    bookings.forEach((booking, idx) => {
      if (booking.isbn13 === id) {
        deletedBooking = Object.assign({}, booking);
        bookings.splice(idx, 1);
      }
    });

    return deletedBooking;
  }

  return {
    listBookings,
    createBooking,
    findBooking,
    updateBooking,
    deleteBooking
  };
};