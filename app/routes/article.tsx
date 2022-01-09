import { Container } from "~/components/Container";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import { Heading } from "~/components/Heading";
import { json, LoaderFunction, MetaFunction } from "remix";
import { Card } from "~/components/Card";
import {
  BiHeart as HeartIcon,
  BiShare as ShareIcon,
  BiChevronRight as ChevronRightIcon,
} from "react-icons/bi";

type LoaderData = {};

export const loader: LoaderFunction = async ({ request }) => {
  return json({});
};

export const meta: MetaFunction = () => {
  return {
    title: "Artikel Islam Sunnah - Yuktaklim!",
    description: "Artikel Sunnah. Kajian Sunnah.",
  };
};

export default function Article() {
  return (
    <div className="flex h-full flex-col bg-gray-100">
      <Header />
      <main className="flex flex-1 flex-col h-full overflow-auto">
        <Container>
          <section className="py-4 px-2">
            <Heading as="h2">Artikel Sunnah</Heading>
            <Card>
              <div className="px-4 py-3 flex gap-2 items-center border-b border-b-gray-200">
                <div>
                  <img
                    src="https://i0.wp.com/asysyariah.com/wp-content/uploads/2020/01/cropped-icon-asysyariahcom.png?fit=32%2C32&ssl=1"
                    className="w-4"
                  />
                </div>
                <span>Asysyariah</span>
              </div>
              <div className="p-4">
                <img
                  src="https://i2.wp.com/asysyariah.com/wp-content/uploads/2011/11/safar-dalam-rangka-ziarah-kubur.jpeg?w=480&ssl=1"
                  className="rounded-sm"
                />
                <Heading as="h3" size="text-md" className="line-clamp-2 mt-3">
                  Safar dalam Rangka Ziarah Kubur, Apakah Disyariatkan?
                </Heading>
                <div className="mt-3 flex gap-4">
                  <button className="flex gap-2 items-center text-sm">
                    <HeartIcon size={20} className="text-gray-600" />
                    Simpan
                  </button>
                  <button className="flex gap-2 items-center text-sm">
                    <ShareIcon size={20} className="text-gray-600" />
                    Bagikan
                  </button>
                  <div className="flex-1" />
                  <button className="flex items-center border border-red-500 bg-red-400 py-1 px-2 text-sm rounded-md text-white">
                    Selengkapnya
                    <ChevronRightIcon size={16} />
                  </button>
                </div>
              </div>
            </Card>
            <Card>
              <div className="px-4 py-3 flex gap-2 items-center border-b border-b-gray-200">
                <div>
                  <img src="/problematikaumat-icon.png" className="w-4" />
                </div>
                <span>Problematika Umat</span>
              </div>
              <div className="p-4">
                <img
                  src="https://problematikaumat.com/wp-content/uploads/2021/01/IMG-20210121-WA0003-1140x570.jpg"
                  className="rounded-sm"
                />
                <Heading as="h3" size="text-md" className="line-clamp-2 mt-3">
                  Piutang Termasuk Warisan?
                </Heading>
                <div className="mt-3 flex gap-4">
                  <button className="flex gap-2 items-center text-sm">
                    <HeartIcon size={20} className="text-gray-600" />
                    Simpan
                  </button>
                  <button className="flex gap-2 items-center text-sm">
                    <ShareIcon size={20} className="text-gray-600" />
                    Bagikan
                  </button>
                  <div className="flex-1" />
                  <button className="flex items-center border border-red-500 bg-red-400 py-1 px-2 text-sm rounded-md text-white">
                    Selengkapnya
                    <ChevronRightIcon size={16} />
                  </button>
                </div>
              </div>
            </Card>
          </section>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
