import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import {
  FaGoogle,
  FaTwitter,
  FaFacebook,
  FaEnvelope,
  FaLock,
  FaRocket,
  FaComments,
} from "react-icons/fa";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      alert(error.message);
    } else {
      setIsSent(true);
      setTimeout(() => setIsSent(false), 5000);
    }
    setLoading(false);
  };

  const handleOAuthLogin = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) alert(error.message);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 to-background text-gray-100 flex justify-center">
      {/* Left Side - Auth Form */}
      <div className="w-full lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse-glow"></div>
          <div className="absolute top-60 -right-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl animate-pulse-glow delay-1000"></div>
        </div>

        <div className="relative z-10 ">
          {/* Logo/Brand */}
          <div className="flex items-center gap-3 mb-10">
            <div className="p-3 bg-gradient-to-br from-primary-500 to-purple-500 rounded-2xl shadow-lg">
              <FaComments className="text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r text-purple-500 bg-clip-text">
                ChatterBox
              </h1>
            </div>
          </div>

          {/* Welcome */}
          <div className="mb-10">
            <h2 className="text-4xl font-bold mb-3">
              Welcome to the <span className="text-primary-400">future</span> of
              chat
            </h2>
            <p className="text-gray-400">
              Experience real-time conversations with friends. No fluff, just
              meaningful connections.
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-4 mb-8">
            <button
              onClick={() => handleOAuthLogin("google")}
              disabled={loading}
              className="w-full p-4 bg-surface border border-gray-700 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-800/50 transition-all duration-300 hover:scale-[1.02] hover:border-primary-500/30 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <FaGoogle className="text-xl text-red-400 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Continue with Google</span>
            </button>

            <button
              onClick={() => handleOAuthLogin("twitter")}
              disabled={loading}
              className="w-full p-4 bg-surface border border-gray-700 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-800/50 transition-all duration-300 hover:scale-[1.02] hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <FaTwitter className="text-xl group-hover:scale-110 transition-transform" />
              <span className="font-medium">Continue with Twitter</span>
            </button>

            <button
              onClick={() => handleOAuthLogin("facebook")}
              disabled={loading}
              className="w-full p-4 bg-surface border border-gray-700 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-800/50 transition-all duration-300 hover:scale-[1.02] hover:border-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <FaFacebook className="text-xl text-blue-400 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Continue with Facebook</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-900 text-gray-400 rounded-md">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="w-full pl-12 p-4 bg-surface border border-gray-700 rounded-xl placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 disabled:opacity-50 transition-all duration-300"
              />
            </div>

            <button
              type="submit"
              disabled={loading || isSent}
              className="w-full p-4 bg-gradient-to-r from-primary-600 to-purple-600 rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-primary-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-primary-500/25"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Sending magic link...
                </>
              ) : isSent ? (
                <>
                  {/* <FaSparkles className="animate-pulse" /> */}
                  Check your email! ✨
                </>
              ) : (
                <>
                  <FaRocket />
                  Send Magic Link
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - Visual Design */}
      <div className="hidden lg:flex lg:w-3/5 bg-gradient-to-br from-primary-900/20 to-purple-900/20 border-l border-gray-800 relative">
        {/* Main content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-12">
          <div className="max-w-xl text-center flex flex-col gap-7">
            {/* Chat preview */}
            <div className="bg-surface/50 backdrop-blur-sm rounded-3xl border border-white/10 p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse delay-150"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-300"></div>
                <div className="flex-1 text-center">
                  <span className="text-gray-300 font-medium">
                    Live Preview
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-start">
                  <div className="max-w-[70%] bg-gray-800/50 rounded-2xl rounded-tl-none p-4">
                    <p className="text-gray-200">Hey! Ready for our call?</p>
                    <span className="text-xs text-gray-400">2:30 PM</span>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-[70%] bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl rounded-tr-none p-4">
                    <p className="text-white">
                      Absolutely! Just sent you the files 📁
                    </p>
                    <span className="text-xs text-primary-200">2:31 PM</span>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[70%] bg-gray-800/50 rounded-2xl rounded-tl-none p-4">
                    <p className="text-gray-200">
                      Perfect! Starting call now 🎥
                    </p>
                    <span className="text-xs text-gray-400">2:32 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-primary-500/30 transition-all duration-300">
                <div className="text-3xl mb-4">🚀</div>
                <h3 className="font-bold mb-2">Lightning Fast</h3>
                <p className="text-gray-300 text-sm">
                  Real-time messaging with low latency
                </p>
              </div>
              <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-primary-500/30 transition-all duration-300">
                <div className="text-3xl mb-4">🔒</div>
                <h3 className="font-bold mb-2">End-to-End Secure</h3>
                <p className="text-gray-300 text-sm">
                  Your conversations are private. Uses military grade
                  encryption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
