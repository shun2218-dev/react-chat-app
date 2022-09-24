import { useNavigate } from "react-router-dom";

export const usePage = () => {
  const navigate = useNavigate();

  const toStart = () => {
    navigate("/Start");
  };

  const toLogin = () => {
    navigate("/login");
  };

  const toRegist = () => {
    navigate("/regist");
  };

  const toReset = () => {
    navigate("/reset");
  };

  return {
    toStart,
    toLogin,
    toRegist,
    toReset,
  };
};
