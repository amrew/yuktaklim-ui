import { Tab } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  BiMicrophone as MicIcon,
  BiMicrophoneOff as MicOffIcon,
  BiPowerOff as ExitIcon,
  BiUser as UserIcon,
} from "react-icons/bi";
import { Link } from "remix";
import { Header } from "~/components/Header";

function Nav() {
  return (
    <nav className="bg-white flex flex-col xs:border-b xs:border-b-gray-200 sm:border-l sm:border-l-gray-200 sm:w-80 h-full">
      <Tab.Group>
        <Tab.List className="p-1 flex border-b border-b-gray-200">
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={`flex-1 p-2 rounded-lg mr-2 ${
                  selected ? "text-orange-500 font-semibold" : ""
                }`}
              >
                Participant
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={`flex-1 p-2 rounded-lg mr-2 ${
                  selected ? "text-orange-500 font-semibold" : ""
                }`}
              >
                Chat
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels className="relative flex-1 overflow-y-auto">
          <Tab.Panel className="absolute top-0 left-0 bottom-0 w-full">
            <div className="mt-4">
              <div className="flex border border-gray-200 m-2 rounded-lg p-3 justify-between">
                <h4 className="truncate flex-1">Ustadz Abdul Majid</h4>
                <div className="ml-2">
                  <button className="border-gray-200 border p-1 bg-white rounded-full">
                    <MicIcon />
                  </button>
                  <button className="border-red-500 border p-1 bg-red-400 rounded-full ml-2 text-white">
                    <ExitIcon />
                  </button>
                </div>
              </div>
              <div className="flex border border-gray-200 m-2 rounded-lg p-3 justify-between">
                <h4 className="truncate flex-1">Abu Faarizah</h4>
                <div className="ml-2">
                  <button className="border-red-500 border p-1 bg-red-400 rounded-full ml-2 text-white">
                    <MicOffIcon />
                  </button>
                  <button className="border-red-500 border p-1 bg-red-400 rounded-full ml-2 text-white">
                    <ExitIcon />
                  </button>
                </div>
              </div>
              <div className="flex border border-gray-200 m-2 rounded-lg p-3 justify-between">
                <h4 className="truncate flex-1">Abu Yazid</h4>
                <div className="ml-2">
                  <button className="border-red-500 border p-1 bg-red-400 rounded-full ml-2 text-white">
                    <MicOffIcon />
                  </button>
                  <button className="border-red-500 border p-1 bg-red-400 rounded-full ml-2 text-white">
                    <ExitIcon />
                  </button>
                </div>
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel className="absolute top-0 left-0 bottom-0 w-full">
            <div className="flex flex-col h-full">
              <div className="flex-1 rounded-lg overflow-y-auto pt-2 pb-2">
                <div className="m-2 flex">
                  <div className="w-4/5 bg-gray-100 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold truncate">
                        Ustadz Abdul Majid
                      </span>
                      <span className="ml-2 text-xs">21:53</span>
                    </div>
                    <div className="text-gray-600 text-sm">
                      Assalamu'alaikum
                    </div>
                  </div>
                </div>
                <div className="m-2 flex flex-row-reverse">
                  <div className="w-4/5 bg-blue-100 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold truncate">
                        Abu Faarizah
                      </span>
                      <span className="ml-2 text-xs">21:53</span>
                    </div>
                    <div className="text-gray-600 text-sm">
                      Wa'alaikumussalam
                    </div>
                  </div>
                </div>
              </div>
              <div className="m-2 flex justify-center items-center">
                <textarea
                  rows={1}
                  placeholder="Ketik pesan disini..."
                  className="border border-gray-200 p-2 w-full mr-2 rounded-lg"
                />
                <button className="border border-orange-400 p-2 rounded-lg text-sm">
                  Kirim
                </button>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </nav>
  );
}

function Main() {
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const resetSize = () => setSize({ width: 0, height: 0 });
  const boxRef = useRef<HTMLDivElement>(null);
  const setBoxSize = () => {
    resetSize();
    setTimeout(() => {
      if (boxRef.current) {
        setSize({
          width: boxRef.current.clientWidth,
          height: boxRef.current.clientHeight,
        });
      }
    }, 0);
  };

  useEffect(() => {
    setBoxSize();
    window.addEventListener("resize", setBoxSize);
    return () => {
      window.removeEventListener("resize", setBoxSize);
    };
  }, []);

  return (
    <div className="flex flex-1 flex-col sm:flex-row">
      <main className="flex flex-col flex-1 bg-gray-100">
        <div
          className="bg-white border border-gray-200 flex-1 rounded-lg h-full overflow-hidden m-4"
          ref={boxRef}
        >
          {size.width ? (
            <iframe
              src="https://excalidraw.com/#room=c999ebe08a0901f06f26,3yZ4EhdS0ofkZBSTW3LKNg"
              width={size.width}
              height={size.height}
            />
          ) : null}
        </div>
        <Footer />
      </main>
      <Nav />
    </div>
  );
}

function Footer() {
  return (
    <footer className="flex bg-gray-600 p-4 border-t border-t-gray-200 justify-center">
      <button className="border-gray-200 border p-2 bg-white rounded-full">
        <MicIcon size={20} />
      </button>
      <button className="border-red-500 border p-2 bg-red-400 rounded-full ml-2 text-white">
        <ExitIcon size={20} />
      </button>
    </footer>
  );
}

export default function Room() {
  return (
    <div className="flex h-full flex-col">
      <Header />
      <Main />
    </div>
  );
}
