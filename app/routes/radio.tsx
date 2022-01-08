import {
  BiPlay as PlayIcon,
  BiLoader as LoaderIcon,
  BiHeadphone as HeadphoneIcon,
  BiStop as StopIcon,
} from "react-icons/bi";
import { Fragment } from "react";
import { Container } from "~/components/Container";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import { Heading } from "~/components/Heading";
import { json, LoaderFunction, MetaFunction } from "remix";
import { getRadios, Radio } from "~/services/radioService";
import { useAudioState } from "~/hooks/useAudioState";
import { useInfiniteLoaderData } from "~/hooks/useInfiniteLoaderData";

type LoaderData = {
  items: Radio[];
  page: number;
  totalItem: number;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") || 1);

  const { radios: items, totalItem } = await getRadios({ page, limit: 10 });
  return json({ items, page, totalItem });
};

export const meta: MetaFunction = () => {
  return {
    title: "Radio Islam Indonesia - Yuktaklim!",
    description: "Radio Islam Indonesia. Radio Sunnah. Radio Ahlussunnah",
  };
};

export default function Radio() {
  const { items, isRefetching, totalItem, page, fetchMore } =
    useInfiniteLoaderData<LoaderData>({
      update: (prev, next) => ({
        ...next,
        items: [...prev.items, ...next.items],
      }),
    });
  const hasMore = items.length < totalItem;

  const { currentURL, isLoading, playOrStop } = useAudioState();

  return (
    <div className="flex h-full flex-col bg-gray-100">
      <Header />
      <main className="flex flex-1 flex-col h-full overflow-auto">
        <Container>
          <section className="py-4 px-2">
            <Heading as="h2">Radio Islam Indonesia</Heading>
            {items.map((radio) => {
              const radioURL = `${radio.audioInfo.url}/;stream.mp3u`;
              const selected = currentURL === radioURL;
              return (
                <article
                  key={radio.id}
                  className={`mt-4 py-3 px-4 rounded-md flex gap-4 border shadow-sm bg-white border-gray-200 ${
                    selected ? "border-orange-400" : "border-gray-200"
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <img
                      src={radio.logo}
                      width={48}
                      height={48}
                      className="rounded-lg"
                    />
                    <span className="flex gap-1 items-center text-xs mt-2">
                      <HeadphoneIcon />
                      {radio.audioInfo.listener}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold line-clamp-2">{radio.name}</h3>
                    <p className="line-clamp-2">{radio.audioInfo.title}</p>
                  </div>
                  <div className="self-center">
                    <button
                      className={`flex items-center py-1 px-2 shadow-sm text-sm rounded-md border ${
                        !isLoading && selected
                          ? "bg-red-400 text-white border-none shadow-sm"
                          : ""
                      }`}
                      onClick={() => {
                        playOrStop(radioURL);
                      }}
                    >
                      {isLoading && selected ? (
                        <LoaderIcon className="animate-spin" size={16} />
                      ) : selected ? (
                        <Fragment>
                          Stop <StopIcon size={16} />
                        </Fragment>
                      ) : (
                        <Fragment>
                          Play <PlayIcon size={16} />
                        </Fragment>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
            {hasMore ? (
              <div className="mt-2 text-center">
                <button
                  className="py-1 px-2 shadow-sm text-sm rounded-md border bg-white"
                  onClick={() => {
                    fetchMore({ page: page + 1 });
                  }}
                >
                  {isRefetching ? "Memuat..." : "Selanjutnya"}
                </button>
              </div>
            ) : null}
          </section>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
