import { useEffect, useState } from "react";
import { useFetcher, useLoaderData as useRemixLoaderData } from "remix";
import { buildURL, getCurrentURL } from "~/utils/url";

type Params<T> = {
  update?: (prev: T, next: T) => T;
  refetchInterval?: number;
};

export function useLoaderData<T>({ update, refetchInterval }: Params<T>) {
  const loaderData = useRemixLoaderData<T>();
  const fetcher = useFetcher<T>();

  const [state, setState] = useState(loaderData);

  const isRefetching = fetcher.state === "loading";

  const fetchMore = (queries: Record<string, any>) => {
    const pathname = buildURL(queries);
    fetcher.load(pathname);
  };

  const refetch = () => {
    const currentURL = getCurrentURL();
    fetcher.load(currentURL);
  };

  useEffect(() => {
    setState(loaderData);
  }, [loaderData]);

  useEffect(() => {
    if (refetchInterval) {
      const intervalFetchID = setInterval(() => {
        refetch();
      }, refetchInterval);
      return () => {
        clearInterval(intervalFetchID);
      };
    }
  }, []);

  useEffect(() => {
    if (fetcher.data) {
      if (update) {
        const newState = update(state, fetcher.data);
        setState(newState);
      } else {
        setState(fetcher.data);
      }
    }
  }, [fetcher.data]);

  return {
    ...state,
    isRefetching,
    fetchMore,
    refetch,
  };
}
