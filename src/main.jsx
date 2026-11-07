import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import "./index.css";
import Counter from "./components/Counter";
import Notes from "./components/Notes";
import Clock from "./components/Clock";
import PasswordShowHide from "./components/PasswordShowHide";
import SignUpForm from "./components/SignUpForm";
import OtpPin from "./components/OtpPin";
import Faq from "./components/Faq";
import KanbanBoard from "./components/KanbanBoard";
import FetchData from "./components/FetchData";
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/counter", element: <Counter /> },
  { path: "/notes", element: <Notes /> },
  { path: "/clock", element: <Clock /> },
  { path: "/signup", element: <SignUpForm /> },
  { path: "/password", element: <PasswordShowHide /> },
  { path: "/otp", element: <OtpPin /> },
  { path: "/faq", element: <Faq /> },
  // { path: "/kanban", element: <KanbanBoard /> },
  // { path: "/datafetch", element: <FetchData /> },
]);

const links = [
  { link: "/counter", text: "Counter" },
  { link: "/notes", text: "Notes App" },
  { link: "/clock", text: "Clock" },
  { link: "/signup", text: "Signup Page" },
  { link: "/password", text: "Password Show/Hide" },
  { link: "/otp", text: "Otp Pin" },
  { link: "/faq", text: "Ai Powerd Faq Component" },
  { link: "/kanban", text: "Kanban Board" },
  { link: "/datafetch", text: "Fetch Data" },
];

export function App() {
  return (
    <div className="flex flex-col justify-center w-full h-screen text-slate-100 bg-zinc-900 p-6 md:p-12">
      <div className="mx-auto flex flex-col gap-2 text-center">
        <h1>React Components</h1>
        {links.map((l) => (
          <div key={l.link}>
            <Link
              className="w-full inline-block px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors"
              to={l.link}
            >
              {l.text}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
