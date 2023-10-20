import { ALL_BOOKS } from "./queries";

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

  newBook.genres.forEach((g) => {
    updateCacheForQuery(
      { query: ALL_BOOKS, variables: { genre: g } },
      "allBooks",
      newBook
    );
  });
};
