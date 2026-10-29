import { useState, useRef } from "react";

export default function OtpPin() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  // validation - same pattern as your signup
  const isComplete = otp.every((digit) => digit !== "");
  const otpValue = otp.join("");

  function handleChange(e, index) {
    const value = e.target.value;

    // only allow numbers - your regex practice
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto-focus next input if typed
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(e, index) {
    // if backspace on empty, go back
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e) {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, 6);
    if (!/^[0-9]+$/.test(paste)) return; // only numbers

    const newOtp = paste
      .split("")
      .concat(new Array(6 - paste.length).fill(""))
      .slice(0, 6);
    setOtp(newOtp);
    inputRefs.current[Math.min(paste.length, 5)]?.focus();
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!isComplete) return;
    alert(`OTP: ${otpValue}`);
  }

  return (
    <main className="w-full h-screen flex flex-col gap-6 items-center justify-center bg-slate-50">
      <form onSubmit={handleSubmit} className="flex gap-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            className="w-12 h-12 border text-center text-xl font-bold rounded-md focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
            maxLength={1}
            type="text"
            inputMode="numeric"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
          />
        ))}
      </form>

      <div className="text-center">
        <p className="text-sm text-zinc-500">
          {isComplete ? `Code: ${otpValue}` : "Enter 6 digit code"}
        </p>
        <button
          onClick={handleSubmit}
          disabled={!isComplete}
          className="mt-3 bg-zinc-900 text-white py-2 px-6 rounded-md disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Verify
        </button>
      </div>
    </main>
  );
}
