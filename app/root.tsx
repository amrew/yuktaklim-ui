import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useTransition,
} from "remix";
import type { MetaFunction, LinksFunction } from "remix";
import globalStyles from "./tailwind.css";
import Nprogress from "nprogress";
import nprogressStyles from "nprogress/nprogress.css";
import { useEffect } from "react";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: nprogressStyles,
    },
    {
      rel: "stylesheet",
      href: globalStyles,
    },
  ];
};

export const meta: MetaFunction = () => {
  return {
    title: "Yuk Taklim!",
    description: "Belajar sunnah online bersama asatidzah ahlussunnah",
  };
};

export default function App() {
  const transition = useTransition();

  useEffect(() => {
    if (transition.state === "loading" || transition.state === "submitting") {
      Nprogress.start();
    } else {
      Nprogress.done();
    }
  }, [transition.state]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
