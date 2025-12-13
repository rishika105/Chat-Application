import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Profile from "./pages/Profile"; 

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });


   //subscribe to auth change
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        {!session && <Route path="/auth" element={<Auth />} />}

        {/* Protected Routes */}
        {session && <Route path="/" element={<Home />} />}
        {session && <Route path="/profile" element={<Profile />} />}

        {/* Redirect handling */}
        <Route
          path="*"
          element={
            session ? <Navigate to="/" replace /> : <Navigate to="/auth" replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
