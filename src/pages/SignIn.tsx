import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../App";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with real API validation
    if (email && password) {
      login();
      navigate("/dashboard"); // ✅ Redirect to dashboard
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center"
         style={{ backgroundImage: "url('/back.jpg')" }}>
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            required
          />
          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white p-2 rounded">
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don’t have an account? <Link to="/signup" className="text-red-500">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
