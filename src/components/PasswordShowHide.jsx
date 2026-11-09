import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"
export default function PasswordShowHide() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  function checkPassword() {
    const len = password.length;
    if (len === 0) {
      setError("Password is required");
      return;
    }
    if (len < 8) {
      setError("Password is short - must be at least 8 characters");
      return;
    }
    if (len > 16) {
      setError("Password is long - max 16 characters");
      return;
    }
    setError("");
  }

  return (
    <div className="min-h-screen bg-zinc-800 grid place-items-center bg-zinc-50 p-6">
      <div className="w-full max-w-sm text-white bg-zinc-950 border border-zinc-950 rounded-xl p-5 space-y-3">
        <h2 className="text-center">Password Show/Hide Toggle</h2>
        <div>
          <AnimatePresence mode="popLayout" initial={false}>
            <div className="flex gap-2">


              <motion.input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                type={show ? "text" : "password"}
                className="py-2 px-3 border"
                placeholder="enter your password"
              />
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer border flex-1 py-2 px-3"
                onClick={() => setShow((prev) => !prev)}
              >
                {!show ? "Show" : "Hide"}
              </motion.button>
            </div>
          </AnimatePresence>
          <div>
            <button
              onClick={checkPassword}
              className="cursor-pointer w-full mt-2 py-2 px-3 bg-zinc-900 text-white"
            >
              Check Password
            </button>
          </div>
        </div>
        <p className="mt-3 rounded-md bg-red-200 text-1xl text-center text-red-500">
          {error}
        </p>
      </div>
    </div >
  );
}
