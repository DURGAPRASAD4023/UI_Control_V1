import { GoogleLogin } from "@react-oauth/google";

function LoginButton({ onSuccess }) {
  return (
    <GoogleLogin
      onSuccess={credentialResponse => {
        onSuccess(credentialResponse);
      }}
      onError={() => {
        console.log("Login Failed");
      }}
      hosted_domain="deccan.ai"
      scope="https://www.googleapis.com/auth/drive.readonly"
    />
  );
}

export default LoginButton;
