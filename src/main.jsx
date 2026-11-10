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
import CounterAnimated from "./components/CounterAnimated";
import KanbanBoard from "./components/KanbanBoard";
import Slider from "./components/Slider"
import MagneticButton from "./components/MagneticButton"
import TabPill from "./components/TabPill"
import FetchData from "./components/FetchData";
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/counter", element: <Counter /> },
  { path: "/notes", element: <Notes /> },
  { path: "/tabpill", element: <TabPill /> },
  { path: "/clock", element: <Clock /> },
  { path: "/signup", element: <SignUpForm /> },
  { path: "/password", element: <PasswordShowHide /> },
  { path: "/otp", element: <OtpPin /> },
  { path: "/faq", element: <Faq /> },
  { path: "/kanban", element: <KanbanBoard /> },
  { path: "/counter-animated", element: <CounterAnimated /> },
  { path: "/slider", element: <Slider /> },
  { path: "/magnetic-button", element: <MagneticButton /> },
]);
const links = [
  { link: "/counter", text: "Counter", desc: "Slide + fade counter with hold-to-repeat" },
  { link: "/notes", text: "Notes App", desc: "Create, edit and delete notes" },
  { link: "/clock", text: "Clock", desc: "Live clock with smooth updates" },
  { link: "/tabpill", text: "Tab Pills", desc: "Animated Tab with pills" },
  { link: "/signup", text: "Signup Page", desc: "Form with validation and states" },
  { link: "/password", text: "Password Show / Hide", desc: "Toggle password visibility" },
  { link: "/otp", text: "OTP Pin", desc: "6-digit OTP, shakes on wrong code" },
  { link: "/faq", text: "AI Powered FAQ", desc: "FAQ with smooth expand animation" },
  { link: "/kanban", text: "Kanban Board", desc: "Drag and drop tasks" },
  { link: "/counter-animated", text: "Counter Animated", desc: "Number roller with spring animation" },
  { link: "/slider", text: "Animated Slider", desc: "Slider with sprint animation" },
  { link: "/magnetic-button", text: "Magnetic Button", desc: "Button that follows the cursor" },
];
export function App() {
  return (
    <div className="min-h-screen w-full bg-zinc-950 px-6 py-12 text-zinc-100 md:px-12">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="border-b border-zinc-800/80 pb-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
            Pawan Hirumina — Playground
          </p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight">
            Components
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500">
            Small React + Framer Motion experiments. Click a card to try it.
          </p>
        </div>
        {/* Grid */}
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {links.map((l) => (
            <Link
              key={l.link}
              to={l.link}
              className="group rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 transition-colors hover:border-zinc-700 hover:bg-zinc-800/50"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-sm font-medium text-zinc-100">
                  {l.text}
                </span>
                <span className="text-sm text-zinc-500 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-zinc-300">
                  →
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">
                {l.desc}
              </p>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-xs text-zinc-600">
          {links.length} components
        </p>
      </div>
    </div>
  );
}
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);