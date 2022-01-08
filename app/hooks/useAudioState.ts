import { Howl } from "howler";
import { useEffect, useState } from "react";

type AudioState =
  | { type: "idle" }
  | { type: "loading"; url: string }
  | { type: "loaded"; url: string }
  | { type: "playing"; url: string };

export function useAudioState() {
  const [audioState, setAudioState] = useState<AudioState>({ type: "idle" });

  const isLoading = audioState.type === "loading";
  const isPlaying = audioState.type === "playing";
  const isLoaded = audioState.type === "loaded";
  const currentURL = audioState.type !== "idle" ? audioState.url : undefined;

  const playOrStop = (url: string) => {
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
        src: currentURL,
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

  return {
    currentURL,
    isLoading,
    isPlaying,
    isLoaded,
    playOrStop,
  };
}
