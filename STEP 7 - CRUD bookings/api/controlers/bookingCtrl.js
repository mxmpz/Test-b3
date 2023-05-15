export default (bookingRepo) => {
  const listBookings = (_, res) => {
    res.send({
      data: bookingRepo.listBookings()
    })
  }

  const createBooking = (req, res) => {
    const booking = bookingRepo.createBooking(req.body)
    res.status(201).send({
      data: booking
    })
  }

  const updateBooking = (req, res) => {
    const id = req.params.id
    const booking = bookingRepo.updateBooking(id, req.body)

    if (booking) {
      return res.send({
        data: booking
      })
    }

    res.status(404).send({
      error: `Booking ${id} not found`
    })
  }

  const getBooking = (req, res) => {
    const id = req.params.id
    const booking = bookingRepo.findBooking(id)

    if (booking) {
      return res.send({
        data: booking
      })
    }

    res.status(404).send({
      error: `Booking ${id} not found`
    })
  }

  const deleteBooking = (req, res) => {
    const id = req.params.id
    const deletedBooking = bookingRepo.deleteBooking(id)

    if (deletedBooking) {
      return res.send({
        meta: {
          _deleted: deletedBooking
        }
      })
    }

    res.status(404).send({
      error: `Booking ${id} not found`
    })
  }

  return {
    listBookings,
    createBooking,
    getBooking,
    updateBooking,
    deleteBooking
  }
}
