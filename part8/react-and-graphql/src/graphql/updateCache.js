import { ALL_AUTHORS, ALL_BOOKS } from "./queries";

export const updateCacheOnNewBook = (cache, newBook) => {
  const updateCacheForQuery = (query, key, newValue) => {
    cache.updateQuery(query, (data) => {
      if (data === null || data[key].some((k) => k.id === newValue.id)) {
        return data;
      }

      return { ...data, [key]: data[key].concat(newValue) };
    });
  };

  updateCacheForQuery({ query: ALL_BOOKS }, "allBooks", newBook);
  updateCacheForQuery({ query: ALL_AUTHORS }, "allAuthors", newBook.author);

  newBook.genres.forEach((g) => {
    updateCacheForQuery(
      { query: ALL_BOOKS, variables: { genre: g } },
      "allBooks",
      newBook
    );
  });
};
