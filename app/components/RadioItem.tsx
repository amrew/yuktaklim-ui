import { Fragment } from "react";
import {
  BiPlay as PlayIcon,
  BiLoader as LoaderIcon,
  BiHeadphone as HeadphoneIcon,
  BiStop as StopIcon,
} from "react-icons/bi";

type Props = {
  selected: boolean;
  name: string;
  logo: string;
  audioTitle: string;
  audioURL: string;
  listener: number;
  isLoading: boolean;
  onPlayOrStop: (url: string) => void;
};

export function RadioItem(props: Props) {
  return (
    <article
      className={`mt-4 py-3 px-4 rounded-md flex gap-4 border shadow-sm bg-white border-gray-200 ${
        props.selected ? "border-red-400" : "border-gray-200"
      }`}
    >
      <div className="flex flex-col items-center">
        <img
          src={props.logo}
          width={48}
          height={48}
          className="rounded-lg"
          alt={`Logo ${props.name}`}
        />
        <span className="flex gap-1 items-center text-xs mt-2">
          <HeadphoneIcon />
          {props.listener}
        </span>
      </div>
      <div className="flex-1">
        <h3 className="font-semibold line-clamp-2">{props.name}</h3>
        <p className="line-clamp-2">{props.audioTitle}</p>
      </div>
      <div className="self-center">
        <button
          className={`flex items-center py-1 px-2 shadow-sm text-sm rounded-md border ${
            !props.isLoading && props.selected
              ? "bg-red-400 text-white border-none shadow-sm"
              : ""
          }`}
          onClick={() => {
            props.onPlayOrStop(props.audioURL);
          }}
        >
          {props.isLoading && props.selected ? (
            <LoaderIcon className="animate-spin" size={16} />
          ) : props.selected ? (
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
}
