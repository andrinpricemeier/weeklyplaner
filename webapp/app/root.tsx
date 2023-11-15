import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import tailwindStylesheetUrl from "./styles/output_tailwind.css";

export const links: LinksFunction = () => {
  return [
      {
        rel: "stylesheet", href: tailwindStylesheetUrl
      },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
      sizes: "180x180",
    },
    {
      rel: "icon",
      href: "/wucheplaner-logo.svg",
      type: "image/svg+xml",
    },
    {
      rel: "icon",
      href: "/favicon-32x32.png",
      type: "image/png",
      sizes: "32x32",
    },
    {
      rel: "icon",
      href: "/favicon-16x16.png",
      type: "image/png",
      sizes: "16x16",
    },
    {
      rel: "manifest",
      href: "/site.webmanifest",
    },
    {
      rel: "mask-icon",
      href: "/safari-pinned-tab.svg",
      color: "#5bbad5",
    },
    {

      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
      sizes: "180x180",
    }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Wucheplaner",
  description: "Erstelle einfach und schnell einen Wochenplan für deine Primarschulklasse!",
  viewport: "width=device-width,initial-scale=1",
  "msapplication-TileColor": "#da532c",
  "theme-color": "#ffffff",
});

export default function App() {
  return (
    <html lang="de" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-offwhite p-7">
        <Outlet />
        <ScrollRestoration />
        <script defer data-domain="wucheplaner.kibunifu.com" src="https://plausible.io/js/plausible.js"></script>
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
