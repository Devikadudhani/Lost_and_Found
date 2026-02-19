import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../utils/axios";

export default function LoginSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      // Save token
      localStorage.setItem("token", token);

      // Fetch user data
      api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
       window.location.href = "/";

      })
      .catch(() => {
        navigate("/login");
      });
    } else {
      navigate("/login");
    }
  }, [location, navigate]);

  return <p className="text-center mt-20">Logging you in...</p>;
}
