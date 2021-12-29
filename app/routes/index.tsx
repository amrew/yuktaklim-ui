import { Header } from "~/components/Header";
import { Container } from "~/components/Container";
import { Heading } from "~/components/Heading";
import { TodayCourseCard } from "~/components/TodayCourseCard";
import { NextCourseCard } from "~/components/NextCourseCard";
import { Footer } from "~/components/Footer";

export default function Index() {
  const todayCourses = [
    {
      title: "Durushullugoh Jilid 1",
      author: "Ustadz Abu Yazid",
      startTime: "19:00",
      endTime: "20:00",
      disabled: false,
    },
    {
      title: "Aisar",
      author: "Ustadz Muhammad Hanif",
      startTime: "19:30",
      endTime: "20:30",
      disabled: false,
    },
    {
      title: "Taisir Alam",
      author: "Ustadz Abu Malik",
      startTime: "20:30",
      endTime: "21:30",
      disabled: true,
    },
  ];
  const nextCourses = [
    {
      title: "Kitab Tauhid",
      author: "Ustadz Abdullah TD",
      startTime: "19:00",
      endTime: "20:00",
      date: "2022-01-01",
    },
    {
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
            <Heading as="h2">Kelas Hari Ini</Heading>
            {todayCourses.map((course) => (
              <TodayCourseCard
                key={course.title}
                title={course.title}
                author={course.author}
                startTime={course.startTime}
                endTime={course.endTime}
                disabled={course.disabled}
              />
            ))}
          </section>
          <section className="py-2 px-2">
            <Heading as="h2" size="lg">
              Kelas Selanjutnya
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
