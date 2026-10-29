import { useState } from "react";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [setTouched] = useState(false);

  const validation = {
    name: name.trim().length >= 2,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    // length: password.length >= 8 && password.length <= 16,
    // upper: /[A-Z]/.test(password),
    // number: /[0-9]/.test(password),
    // special: /[!@#$%^&*]/.test(password),
    match: password !== "" && password === confirm,
  };
  const isFormValid = Object.values(validation).every(Boolean);
  function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (!isFormValid) return;
    alert("ok");
  }
  return (
    <main className="flex w-full h-screen">
      {/* left side */}
      <div className="hidden md:flex md:w-[50%] items-center justify-center bg-zinc-900">
        <div className="text-center">
          <h1 className="text-4xl text-white font-bold">Create Account</h1>
          <p className="text-zinc-400 mt-2">Test your validation logic here</p>
        </div>
      </div>

      {/* form */}
      <div className="flex w-full md:w-[50%] items-center justify-center bg-slate-100">
        <form className="flex flex-col w-[300px] gap-4" onSubmit={handleSubmit}>
          {/* name */}
          <div className="w-full flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              className="py-2 px-3 border   "
              placeholder="Enter your name"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* email */}
          <div className="w-full flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              className="py-2 px-3 border   "
              placeholder="Enter your email"
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* password */}
          <div className="w-full flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              className="py-2 px-3 border   "
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-start items-center mt-2 gap-2">
              <input
                id="showpass"
                onChange={(e) => setShowPassword(e.target.checked)}
                type="checkbox"
                className="cursor-pointer"
                checked={showPassword}
              />
              <label htmlFor="showpass" className="text-sm">
                Show Password
              </label>
            </div>
          </div>

          {/* confirm password */}
          <div className="w-full flex flex-col">
            <label htmlFor="cpassword">Confirm your password</label>
            <input
              className="py-2 px-3 border   "
              placeholder="Enter your password"
              type="password"
              id="cpassword"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
          <button
            // onClick={handleSubmit}
            disabled={!isFormValid}
            className={`cursor-pointer bg-zinc-900 py-2 px-3 w-full text-white disabled:opacity-30 disabled:cursor-not-allowed`}
          >
            Signup
          </button>
        </form>
      </div>
    </main>
  );
}
