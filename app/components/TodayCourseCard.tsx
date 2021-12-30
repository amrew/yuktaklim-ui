import {
  BiBroadcast as LiveIcon,
  BiStop as StopIcon,
  BiChevronRight as ChevronRightIcon,
  BiUserCircle as UserIcon,
  BiTime as TimeIcon,
} from "react-icons/bi";

type Props = {
  title: string;
  author: string;
  startTime: string;
  endTime: string;
  disabled?: boolean;
};

export function TodayCourseCard(props: Props) {
  const { title, author, startTime, endTime, disabled } = props;
  const buttonClass = disabled
    ? "cursor-not-allowed bg-gray-100 text-gray-400"
    : "bg-red-400 border-red-500 text-white";
  const colorClass = disabled ? "text-gray-400" : "";
  return (
    <article
      className={`mt-4 py-3 px-4 rounded-md flex gap-4 border shadow-sm bg-white border-gray-200`}
    >
      <div className={`${colorClass} flex-1 whitespace-nowrap overflow-hidden`}>
        <div className="flex gap-2 items-center">
          <h3 className="font-semibold text-lg whitespace-nowrap overflow-hidden text-ellipsis">
            {title}
          </h3>
          {disabled ? (
            <StopIcon
              size={24}
              className="rounded-full border border-orange-300 p-1 text-orange-300"
            />
          ) : (
            <LiveIcon
              size={24}
              className="rounded-full border border-orange-400 p-1 text-orange-400"
            />
          )}
        </div>
        <div className="flex items-center gap-1 font-light">
          <div className="w-4">
            <UserIcon className="text-teal-500" />
          </div>
          <p className="whitespace-nowrap overflow-hidden text-ellipsis">
            {author}
          </p>
        </div>
        <div className="flex gap-1 mt-1">
          <div className="w-4">
            <TimeIcon className="text-teal-500" />
          </div>
          <time className="font-semibold text-xs">
            {startTime} - {endTime} WIB
          </time>
          <span className="text-xs whitespace-nowrap overflow-hidden text-ellipsis font-light">
            ({!disabled ? "Sedang berlangsung" : "Belum mulai"})
          </span>
        </div>
      </div>
      <div className="self-center flex flex-col">
        <button
          disabled={disabled}
          className={`flex items-center py-1 px-2 shadow-sm text-sm rounded-md border ${buttonClass}`}
        >
          Gabung
          <ChevronRightIcon size={16} />
        </button>
      </div>
    </article>
  );
}
