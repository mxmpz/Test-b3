
export default (Book) => {
  const books = [
    new Book('9782744005084', 'UML et C++', 'Richard C. Lee, William M. Tepfenhart', 'CampusPress', 'FR', 29.95),
    new Book('9782746035966', 'Cree su primer sitio web con dreamweaver 8', 'B.A. GUERIN', 'ENI', 'ES', 10.02)
  ];

  const listBooks = () => {
    return books;
  };

  const createBook = (book) => {
    books.push(new Book(
      book.isbn13,
      book.title,
      book.authors,
      book.editor,
      book.langCode,
      book.price
    ));
    return book;
  }

  const findBook = (id) => {
    return books.find((book) => book.isbn13 === id);
  }

  const updateBook = (id, book) => {
    let foundBookIdx = 0;
    books.forEach((book, idx) => {
      if (book.isbn13 === id) {
        foundBookIdx = idx;
      }
    });
    
    if (foundBookIdx > 0) {
      books[foundBookIdx] = new Book(
        book.isbn13,
        book.title,
        book.authors,
        book.editor,
        book.langCode,
        book.price
      );
      return book;
    }

    return null;
  }

  const deleteBook = (id) => {
    let deletedBook = null;
    books.forEach((book, idx) => {
      if (book.isbn13 === id) {
        deletedBook = Object.assign({}, book);
        books.splice(idx, 1);
      }
    });

    return deletedBook;
  }

  return {
    listBooks,
    createBook,
    findBook,
    updateBook,
    deleteBook
  };
};
