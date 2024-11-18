// src/Login.js
import { auth } from "./firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Login = () => {
  const handleLogin = async () => {
    //default code to login with google 
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("Logged in successfully!");
    } catch (error) {
      console.error(error);
      alert("Login failed.");
    }
  };

  return <button onClick={handleLogin}>Login with Google</button>;
};

export default Login;
