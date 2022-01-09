import { Container } from "~/components/Container";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import { Heading } from "~/components/Heading";
import { json, Link, LoaderFunction, MetaFunction } from "remix";
import { getRadios, Radio } from "~/services/radioService";
import { useAudioState } from "~/hooks/useAudioState";
import { useLoaderData } from "~/hooks/useLoaderData";
import { RadioItem } from "~/components/RadioItem";
import { BiRefresh as RefreshIcon, BiStop } from "react-icons/bi";
import { useMemo, useState } from "react";

type LoaderData = {
  items: Radio[];
  page: number;
  totalItem: number;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") || 1);
  const limit = Number(url.searchParams.get("limit") || 15);

  const { radios: items, totalItem } = await getRadios({ page, limit });
  return json({ items, page, totalItem });
};

export const meta: MetaFunction = () => {
  return {
    title: "Radio Islam Indonesia - Yuktaklim!",
    description:
      "Radio Islam Indonesia. Radio Sunnah. Radio Ahlussunnah. Kajian Sunnah",
  };
};

export default function Radio() {
  const { items, isRefetching, totalItem, page, fetchMore } =
    useLoaderData<LoaderData>({
      update: (prev, next) => ({
        ...next,
        items: [...prev.items, ...next.items],
      }),
    });
  const [selectedID, setRadioID] = useState<string>();

  const selectedRadio = useMemo(() => {
    if (selectedID) {
      return items.find((item) => item.id === selectedID);
    }
    return undefined;
  }, [selectedID]);

  const hasMore = items.length < totalItem;
  const { currentURL, isLoading, playOrStop } = useAudioState();

  return (
    <div className="flex h-full flex-col bg-gray-100">
      <Header />

      <main className="flex flex-1 flex-col h-full overflow-auto">
        <Container>
          <section className="py-4 px-2">
            <Heading
              as="h2"
              badge={
                <Link
                  to="/radio"
                  className="ml-2 bg-white border border-gray-200 p-1 rounded-full"
                >
                  <RefreshIcon size={20} />
                </Link>
              }
            >
              Radio Islam
            </Heading>
            {items.map((item) => {
              const audioURL = `${item.audioInfo.url}/;stream.mp3u`;
              const selected = currentURL === audioURL;
              const handlePlayOrStop = (url: string) => {
                const isPlaying = playOrStop(url);
                isPlaying ? setRadioID(undefined) : setRadioID(item.id);
              };
              return (
                <RadioItem
                  key={item.id}
                  name={item.name}
                  selected={selected}
                  logo={item.logo}
                  audioTitle={item.audioInfo.title}
                  audioURL={audioURL}
                  listener={item.audioInfo.listener}
                  isLoading={isLoading}
                  onPlayOrStop={handlePlayOrStop}
                />
              );
            })}
            {hasMore ? (
              <div className="mt-2 text-center">
                <Link
                  to={`/radio?page=${page + 1}`}
                  className="py-1 px-2 shadow-sm text-sm rounded-md border bg-white"
                  onClick={(e) => {
                    e.preventDefault();
                    fetchMore({ page: page + 1 });
                  }}
                >
                  {isRefetching ? "Memuat..." : "Selanjutnya"}
                </Link>
              </div>
            ) : null}
          </section>
        </Container>
      </main>

      {selectedRadio ? (
        <div className="p-4 flex gap-3 items-center bg-red-400 border-t border-t-red-500 text-white">
          <div>
            <button
              className="bg-white rounded-full p-2"
              onClick={() => {
                playOrStop(undefined);
                setRadioID(undefined);
              }}
            >
              <BiStop className="text-gray-600" size={20} />
            </button>
          </div>
          <div>
            <div className="font-bold">{selectedRadio.name}</div>
            <span className="line-clamp-1">
              {selectedRadio.audioInfo.title}
            </span>
          </div>
        </div>
      ) : null}

      <Footer />
    </div>
  );
}
