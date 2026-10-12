import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await authService.login(email, password);
      console.log("Login response:", result);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden md:flex w-1/2 bg-gray-950 text-white flex-col justify-center px-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-red-800 rounded-md flex items-center justify-center font-bold">
            IY
          </div>
          <div>
            <p className="font-bold leading-tight">IYAENE</p>
            <p className="text-xs text-gray-400">Engineering · Environment</p>
          </div>
        </div>

        <span className="inline-flex items-center gap-2 bg-gray-800 text-gray-300 text-xs px-3 py-1.5 rounded-full w-fit mb-6">
          Administrator area
        </span>

        <h1 className="text-4xl font-bold leading-tight mb-4">
          Your project pipeline, in one command centre.
        </h1>
        <p className="text-gray-400 mb-8">
          Review every quote request, read incoming messages, and publish new
          portfolio projects straight to the live website.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-900 px-4 py-3 rounded-md text-sm">Track quote requests</div>
          <div className="bg-gray-900 px-4 py-3 rounded-md text-sm">Read contact messages</div>
          <div className="bg-gray-900 px-4 py-3 rounded-md text-sm">Publish projects</div>
          <div className="bg-gray-900 px-4 py-3 rounded-md text-sm">Secure sign-in</div>
        </div>

        <p className="text-xs text-gray-500 mt-12">
          RC 937834 · #48 Old Aba Road, Port Harcourt, Rivers State, Nigeria
        </p>
      </div>

      {/* Right panel */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-24">
        <h2 className="text-2xl font-bold mb-1">Sign in to your dashboard</h2>
        <p className="text-gray-500 mb-8">
          Enter your administrator email and password to continue.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Email address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full border border-gray-300 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="w-full border border-gray-300 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-950 hover:bg-blue-900 text-white font-medium py-2.5 rounded-md transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <a href="/" className="text-blue-950 text-sm mt-6 inline-block">
          ← Back to the website
        </a>
      </div>
    </div>
  );
}