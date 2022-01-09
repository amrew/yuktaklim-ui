export const getCurrentURL = () => {
  const location = window.location;
  return `${location.pathname}${location.search}${location.hash}`;
};

export const buildURL = (queries: Record<string, any>) => {
  const location = window.location;
  const url = new URL(location.href);
  for (const key in queries) {
    url.searchParams.delete(key);
    url.searchParams.append(key, queries[key]);
  }
  return `${url.pathname}${url.search}${url.hash}`;
};
