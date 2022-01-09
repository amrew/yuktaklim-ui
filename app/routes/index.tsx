import { Header } from "~/components/Header";
import { Container } from "~/components/Container";
import { Heading } from "~/components/Heading";
import { TodayCourseCard } from "~/components/TodayCourseCard";
import { NextCourseCard } from "~/components/NextCourseCard";
import { Footer } from "~/components/Footer";
import {
  json,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
  useNavigate,
} from "remix";
import { User } from "@supabase/supabase-js";

export const meta: MetaFunction = () => {
  return {
    title: "Kajian online - Yuktaklim!",
    description: "Belajar sunnah online bersama asatidzah ahlussunnah",
  };
};

export const loader: LoaderFunction = async (ctx) => {
  return json({});
};

export default function Index() {
  const { user } = useLoaderData<{ user: User | null }>();
  const navigate = useNavigate();
  const todayCourses = [
    {
      id: "1",
      title: "Durushullugoh Jilid 1",
      author: "Ustadz Abu Yazid",
      startTime: "19:00",
      endTime: "20:00",
      disabled: false,
    },
    {
      id: "2",
      title: "Aisar",
      author: "Ustadz Muhammad Hanif",
      startTime: "19:30",
      endTime: "20:30",
      disabled: false,
    },
    {
      id: "3",
      title: "Taisir Alam",
      author: "Ustadz Abu Malik",
      startTime: "20:30",
      endTime: "21:30",
      disabled: true,
    },
  ];
  const nextCourses = [
    {
      id: "4",
      title: "Kitab Tauhid",
      author: "Ustadz Abdullah TD Testing",
      startTime: "19:00",
      endTime: "20:00",
      date: "2022-01-01",
    },
    {
      id: "5",
      title: "Nahwu",
      author: "Ustadz Abdul Majid",
      startTime: "19:30",
      endTime: "20:30",
      date: "2022-01-02",
    },
  ];
  return (
    <div className="flex h-full flex-col bg-gray-100">
      <Header />
      <main className="flex flex-1 flex-col h-full overflow-auto">
        <Container>
          <section className="py-4 px-2">
            <Heading as="h2">Kajian Hari Ini</Heading>
            {todayCourses.map((course) => (
              <TodayCourseCard
                key={course.title}
                id={course.id}
                title={course.title}
                author={course.author}
                startTime={course.startTime}
                endTime={course.endTime}
                disabled={course.disabled}
                onJoin={(id) => {
                  navigate(`/room/${id}`);
                }}
              />
            ))}
          </section>
          <section className="py-2 px-2">
            <Heading as="h2" size="text-lg">
              Kajian Selanjutnya
            </Heading>
            {nextCourses.map((course) => (
              <NextCourseCard
                key={course.title}
                title={course.title}
                author={course.author}
                startTime={course.startTime}
                endTime={course.endTime}
                date={course.date}
              />
            ))}
          </section>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
