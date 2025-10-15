import { useGoogleLogin } from "@react-oauth/google";
import { useState, useEffect } from "react";
import App from "./App";
import './Login.css';
import googleIcon from './assets/google-icon.svg';
import deccanAiLogo from './assets/deccan-ai-logo.png';

export default function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("google_access_token");
    const profile = localStorage.getItem("google_user_profile");
    if (token && profile) {
      setIsLoggedIn(true);
      setUserProfile(JSON.parse(profile));
    }
  }, []);

  const login = useGoogleLogin({
    flow: "implicit",
    scope: "https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
    onSuccess: async (tokenResponse) => {
      try {
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            'Authorization': `Bearer ${tokenResponse.access_token}`
          }
        });
        const userInfo = await userInfoResponse.json();
        const userDomain = userInfo.hd;
        
        const allowedDomains = ["deccan.ai", "getdeccan.ai"];
  
        if (allowedDomains.includes(userDomain)) {
          localStorage.setItem("google_access_token", tokenResponse.access_token);
          localStorage.setItem("google_user_profile", JSON.stringify(userInfo));
          setUserProfile(userInfo);
          setIsLoggedIn(true);
        } else {
          alert("Login failed: Your email domain is not permitted.");
        }
      } catch (error) {
        alert("Login failed: Could not verify domain.");
      }
    },
    onError: () => alert("Login failed"),
  });

  const handleLogout = () => {
    localStorage.removeItem("google_access_token");
    localStorage.removeItem("google_user_profile");
    setIsLoggedIn(false);
    setUserProfile(null);
  };

  if (isLoggedIn) {
    return <App onLogout={handleLogout} userProfile={userProfile} />; 
  }

  return (
    <div className="login-container">
      <img src={deccanAiLogo} alt="Deccan AI Logo" className="login-logo" />
      <h1 className="login-title">Welcome to Agent Task Explorer</h1>
      <p className="login-subtitle">Your tool for analyzing and exploring agent tasks.</p>
      <button onClick={() => login()} className="login-button">
        <img src={googleIcon} alt="Google icon" className="google-icon" />
        <span>Login with Google</span>
      </button>
    </div>
  );
}
