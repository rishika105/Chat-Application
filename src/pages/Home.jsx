import React from "react";
import { supabase } from "../../lib/supabase";

const Home = ({setSession}) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };
  return (
    <div>
      HEY
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
