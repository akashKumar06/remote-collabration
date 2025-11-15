import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../app/slices/auth/authSlice";
const GoogleAuth = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (window.google) {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      google.accounts.id.renderButton(document.getElementById("googleBtn"), {
        theme: "filled_blue",
        size: "large",
        shape: "rectangular",
      });
    }

    async function handleCredentialResponse(response) {
      console.log("Encoded JWT ID token: " + response.credential);

      // console.log(response);
      const token = response.credential;
      // console.log(token);

      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URI}/api/v1/users/google`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ token }),
        }
      );

      const data = await res.json();
      const user = data.user;
      dispatch(setCurrentUser(user));
    }
  }, [dispatch]);

  return (
    <div className="flex items-center justify-center">
      <div id="googleBtn"></div>
    </div>
  );
};

export default GoogleAuth;
