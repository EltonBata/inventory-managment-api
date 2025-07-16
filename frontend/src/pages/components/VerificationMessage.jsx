export default function VerificationMessage() {
  return (
    <div className="w-dvw min-h-screen absolute top-0 left-0 bg-gray-100/60 z-20 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4 text-sky-800">
          Verify Your Email
        </h2>
        <p className="mb-6 text-gray-600 text-center">
          A verification email has been sent to your address. Please check your
          inbox and follow the instructions to verify your account.
        </p>
        <button
          className="btn btn-neutral"
          type="button"
        >
          Resend Email
        </button>
      </div>
    </div>
  );
}
