import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { NavLink } from "react-router";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

const navLinks = [
  {label: "Головна", path: '/'},
  {label: "Усі змінні", path: '/variables'}
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <main className="flex items-center justify-center flex-col pt-16 pb-4">
          <header className="flex fixed top-0 inset-x-0 items-center justify-between px-6 py-3 bg-zinc-950/80 backdrop-blur border-b border-zinc-800 z-50">

            <span className="font-mono text-sm font-bold text-zinc-100">
              VIN<span className="text-orange-500">decoder</span>
            </span>

            <nav className="flex items-center gap-1">
              {navLinks.map(link => (
                <NavLink
                  to={link.path}
                  key={link.path}
                  className={({ isActive }) =>
                    `text-xs font-mono px-3 py-1.5 rounded transition-all duration-150 ${
                      isActive
                        ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                        : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

          </header>

          <div className="container px-3 w-full">
            {children}
          </div>
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}


export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
