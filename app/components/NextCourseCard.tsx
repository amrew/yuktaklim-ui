import {
  BiChevronRight as ChevronRightIcon,
  BiUserCircle as UserIcon,
  BiTime as TimeIcon,
} from "react-icons/bi";
import dayjs from "dayjs";
import "dayjs/locale/id";

type Props = {
  title: string;
  author: string;
  startTime: string;
  endTime: string;
  date: string;
};

export function NextCourseCard(props: Props) {
  const { title, author, startTime, endTime, date } = props;
  const dateWithI18n = dayjs(new Date(date)).locale("id");
  const dayInWeek = dateWithI18n.format("dddd");
  const dayMonth = dateWithI18n.format("DD MMM");
  return (
    <div className="flex items-center gap-4 bg-white border border-gray-200 p-4 rounded-md mt-4">
      <div className="border border-orange-400 rounded-md py-2 px-3 text-center shadow-sm w-20">
        <h3 className="text-sm text-gray-500 mb-1">
          {dayInWeek === "Minggu" ? "Ahad" : dayInWeek}
        </h3>
        <time className="font-bold">{dayMonth}</time>
      </div>
      <div className="flex flex-col flex-1 whitespace-nowrap overflow-hidden">
        <p className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
          {title}
        </p>
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
          <time className="font-semibold text-xs whitespace-nowrap overflow-hidden text-ellipsis">
            {startTime} - {endTime} WIB
          </time>
        </div>
      </div>
      <div>
        <button
          className={`flex items-center py-1 px-2 shadow-sm text-sm rounded-md border`}
        >
          Detail
          <ChevronRightIcon size={16} />
        </button>
      </div>
    </div>
  );
}
