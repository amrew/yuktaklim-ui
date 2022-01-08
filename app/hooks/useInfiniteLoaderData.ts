import { useEffect, useMemo, useState } from "react";
import { useFetcher, useLoaderData } from "remix";

const buildURL = (queries: Record<string, any>) => {
  const location = window.location;
  const url = new URL(location.href);
  for (const key in queries) {
    url.searchParams.delete(key);
    url.searchParams.append(key, queries[key]);
  }
  return `${url.pathname}${url.search}${url.hash}`;
};

type Params<T> = {
  update: (prev: T, next: T) => T;
};

export function useInfiniteLoaderData<T>({ update }: Params<T>) {
  const loaderData = useLoaderData<T>();
  const [state, setState] = useState(loaderData);
  const fetcher = useFetcher<T>();

  const isRefetching = fetcher.state === "loading";

  const fetchMore = (queries: Record<string, any>) => {
    const pathname = buildURL(queries);
    fetcher.load(pathname);
  };

  useEffect(() => {
    if (fetcher.data) {
      const newState = update(state, fetcher.data);
      setState(newState);
    }
  }, [fetcher.data]);

  return {
    ...state,
    isRefetching,
    fetchMore,
  };
}
