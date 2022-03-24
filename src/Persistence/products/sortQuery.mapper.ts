export const SortQueryMapper = (field = 'title', order = 'asc') => {
  const sortQueries = {};
  sortQueries[field] = order;
  return sortQueries;
};
