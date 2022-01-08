import { useEffect, useMemo, useState } from "react";
import { useFetcher, useLoaderData } from "remix";

const getCurrentURL = () => {
  const location = window.location;
  return `${location.pathname}${location.search}${location.hash}`;
};

type Params = {
  refetchInterval?: number;
};

export function useRefetchLoaderData<T>({
  refetchInterval = 10 * 1000,
}: Params = {}) {
  const loaderData = useLoaderData<T>();
  const [state, setState] = useState(loaderData);
  const fetcher = useFetcher<T>();

  const isRefetching = fetcher.state === "loading";

  const refetch = () => {
    const currentURL = getCurrentURL();
    fetcher.load(currentURL);
  };

  useEffect(() => {
    const intervalFetchID = setInterval(() => {
      refetch();
    }, refetchInterval);
    return () => {
      clearInterval(intervalFetchID);
    };
  }, []);

  useEffect(() => {
    if (fetcher.data) {
      setState(fetcher.data);
    }
  }, [fetcher.data]);

  return { ...state, isRefetching, refetch };
}
