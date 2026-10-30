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
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/counter", element: <Counter /> },
  { path: "/notes", element: <Notes /> },
  { path: "/clock", element: <Clock /> },
  { path: "/signup", element: <SignUpForm /> },
  { path: "/password", element: <PasswordShowHide /> },
  { path: "/otp", element: <OtpPin /> },
  { path: "/faq", element: <Faq /> },
]);
export function App() {
  const apps = [
    { path: "/counter", name: "Counter", emoji: "🔢", desc: "useState" },
    { path: "/notes", name: "Notes App", emoji: "📝", desc: "array state" },
    { path: "/clock", name: "Digital Clock", emoji: "⏰", desc: "useEffect" },
    {
      path: "/password",
      name: "Password Toggle",
      emoji: "🔑",
      desc: "derived state",
    },
    {
      path: "/signup",
      name: "Signup Form",
      emoji: "➡️",
      desc: "form validation",
    },
    {
      path: "/otp",
      name: "Otp Pin",
      emoji: "➡️",
      desc: "otp pin input boxes",
    },
    {
      path: "/faq",
      name: "Faq Component",
      emoji: "➡️",
      // desc: "otp pin input boxes",
    },
  ];
  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight">
          Learning React Zero To Hero
        </h1>
        <p className="text-zinc-600 mt-2">
          Pick an app to open • {apps.length} apps built
        </p>
        <div className="grid gap-3 mt-8">
          {apps.map((app) => (
            <Link
              key={app.path}
              to={app.path}
              className="group flex items-center justify-between p-4 bg-white border border-zinc-200 rounded-xl hover:border-zinc-900 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl w-8 h-8 grid place-items-center bg-zinc-100 rounded-lg group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                  {app.emoji}
                </span>
                <span className="font-medium">{app.name}</span>
              </div>
              <span className="text-sm text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-full group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                {app.desc}
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-8 p-4 bg-white border border-dashed border-zinc-300 rounded-xl text-sm text-zinc-500">
          Tip: Add new app → just add one line to the{" "}
          <code className="bg-zinc-100 px-1.5 py-0.5 rounded">apps</code> array.
        </div>
      </div>
    </div>
  );
}
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
