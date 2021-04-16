const bookModel = data => {
  const books = [];

  data.items.map(book => {
    const model = {
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors ? book.volumeInfo.authors[0] : "Unknown",
      coverImageUrl: book.volumeInfo.imageLinks
        ? book.volumeInfo.imageLinks.thumbnail
        : "https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder-1024x512.png",
      id: book.id,
      pageCount: book.volumeInfo.pageCount
        ? book.volumeInfo.pageCount
        : "Unknown",
      publisher: book.volumeInfo.publisher
        ? book.volumeInfo.publisher
        : "Unknown",
      synopsis: book.volumeInfo.description
        ? book.volumeInfo.description
        : "Unknown"
    };
    books.push(model);
  });

  return books;
};
export default bookModel;
