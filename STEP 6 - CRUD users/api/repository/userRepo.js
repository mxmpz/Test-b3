export default (User) => {
  const users = [
    new User('1281464365499', 'CADIEUX', 'Marius', '1985-10-27', '3 Rue Henri Hure 49300 Cholet', '0666666666', 'mariuscadieux@gmail.com'),
    new User('5643431345887', 'TALON', 'Alicia', '1992-07-26', '3 Rue Henri Hure 49300 Cholet', '0777777777', 'talonalicia@gmail.com')
  ]

  const listUsers = () => {
    return users
  }

  const createUser = (user) => {
    users.push(new User(
      user.id,
      user.lastName,
      user.firstName,
      user.birthDate,
      user.address,
      user.phone,
      user.email
    ))
    return user
  }

  const findUser = (id) => {
    return users.find((user) => user.idUser === id)
  }

  const updateUser = (id, user) => {
    let foundUserIdx = 0
    users.forEach((user, idx) => {
      if (user.idUser === id) {
        foundUserIdx = idx
      }
    })

    if (foundUserIdx > 0) {
      users[foundUserIdx] = new User(
        user.idUser,
        user.lastName,
        user.firstName,
        user.birthDate,
        user.address,
        user.phone,
        user.email
      )
      return user
    }
    return null
  }

  const deleteUser = (id) => {
    let deletedUser = null
    users.forEach((user, idx) => {
      if (user.idUser === id) {
        deletedUser = Object.assign({}, user)
        users.splice(idx, 1)
      }
    })
    return deletedUser
  }

  return {
    listUsers,
    createUser,
    findUser,
    updateUser,
    deleteUser
  }
}
