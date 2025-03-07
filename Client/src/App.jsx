import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import useAuthStore from "./store/useAuthStore";
import { useEffect } from "react";
import { Home, Loader } from "lucide-react";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/Home";
// import Profile from "./pages/Profile";
// import Settings from "./pages/Settings";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
function App() {
  const {AuthUser,checkAuth,ischeckingAuth,onlineUsers} = useAuthStore();
  console.log(AuthUser);
  console.log(onlineUsers);

  useEffect(()=>{
    checkAuth();
  },[checkAuth]);

  console.log(AuthUser);

  if(ischeckingAuth&&!AuthUser)return(
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  )
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={AuthUser?<HomePage />:<Navigate to ="/login"></Navigate>} />
        <Route path="/signup" element={!AuthUser? <Signup/>:<Navigate to ="/"></Navigate>} />
        <Route path="/login" element={!AuthUser ? <Login/> : <Navigate to ="/"></Navigate>} />
        <Route path="/settings" element={AuthUser? <Settings/>:<Navigate to ="/"></Navigate>} />
        <Route path="/profile" element={AuthUser ? <Profile/> : <Navigate to ="/login"></Navigate>} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
