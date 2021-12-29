import {
  BiPlay as PlayIcon,
  BiLoader as LoaderIcon,
  BiHeadphone as HeadphoneIcon,
  BiStop as StopIcon,
} from "react-icons/bi";
import { Howl } from "howler";
import { Fragment, useEffect, useState } from "react";
import { Container } from "~/components/Container";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import { Heading } from "~/components/Heading";
import { json, LoaderFunction, useLoaderData } from "remix";
import { usePrevious } from "react-use";

type Radio = {
  uid_rad: string;
  uid_ref: string;
  id_radet: string;
  sc_rad: string;
  nama: string;
  status: string;
  info: string;
  pendengar: string;
  judul: string;
  logo: string;
  url: string;
  kab: string;
  prop: string;
  neg: string;
  alias: string;
};

export const loader: LoaderFunction = async () => {
  const response = await fetch(
    "https://hirsh.radioislam.or.id/radio/lrii.php?model=lima"
  );
  const radios: Radio[] = await response.json();
  const sortedRadios = radios.sort((a, b) =>
    Number(a.pendengar) > Number(b.pendengar) ? -1 : 1
  );
  const limitedRadios = sortedRadios.slice(0, 20);
  return json({ radios: limitedRadios });
};

type AudioState =
  | { type: "idle" }
  | { type: "loading"; url: string }
  | { type: "loaded"; url: string }
  | { type: "playing"; url: string };

export default function Radio() {
  const { radios } = useLoaderData<{ radios: Radio[] }>();

  const [audioState, setAudioState] = useState<AudioState>({ type: "idle" });

  const isLoading = audioState.type === "loading";
  const currentURL = audioState.type !== "idle" ? audioState.url : undefined;

  const prevURL = usePrevious(currentURL);

  const playStop = (url: string) => {
    switch (audioState.type) {
      case "idle": {
        setAudioState({ type: "loading", url });
        break;
      }
      default: {
        if (audioState.url === url) {
          setAudioState({ type: "idle" });
        } else {
          setAudioState({ type: "loading", url });
        }
      }
    }
  };

  useEffect(() => {
    let sound: Howl | undefined;
    if (currentURL) {
      sound = new Howl({
        src: `${currentURL}/;stream.mp3u`,
        html5: true,
        format: ["mp3", "mp3u"],
        onload: () => {
          setAudioState({ type: "loaded", url: currentURL });
        },
        onplay: () => {
          setAudioState({ type: "playing", url: currentURL });
        },
      });
      sound.play();
    }
    return () => {
      sound?.stop();
      sound?.unload();
    };
  }, [currentURL]);

  return (
    <div className="flex h-full flex-col bg-gray-100">
      <Header />
      <main className="flex flex-1 flex-col h-full overflow-auto">
        <Container>
          <section className="py-4 px-2">
            <Heading as="h2">Radio Islam Indonesia</Heading>
            {radios.map((radio) => (
              <article
                key={radio.uid_rad}
                className={`mt-4 py-3 px-4 rounded-md flex gap-4 border shadow-sm bg-white border-gray-200 ${
                  currentURL === radio.url
                    ? "border-orange-400"
                    : "border-gray-200"
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
                    {radio.pendengar}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{radio.nama}</h3>
                  <p className="line-clamp-2">{radio.judul}</p>
                </div>
                <div className="self-center">
                  <button
                    className={`flex items-center py-1 px-2 shadow-sm text-sm rounded-md border ${
                      !isLoading && currentURL === radio.url
                        ? "bg-red-400 text-white border-none shadow-sm"
                        : ""
                    }`}
                    onClick={() => {
                      playStop(radio.url);
                    }}
                  >
                    {isLoading && currentURL === radio.url ? (
                      <LoaderIcon className="animate-spin" size={16} />
                    ) : currentURL === radio.url ? (
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
            ))}
          </section>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
