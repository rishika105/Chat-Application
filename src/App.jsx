import { useEffect, useState } from "react";
import Auth from "./pages/Auth";

import "./App.css";
import { supabase } from "../lib/supabase";
import Home from "./pages/Home";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Loading your chat experience...</p>
      </div>
    );
  }

  if (!session) {
    return <Auth />;
  }

  // User is logged in
  return <Home setSession={setSession} />;
}

export default App;
