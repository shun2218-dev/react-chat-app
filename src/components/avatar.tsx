import React, { FC, ChangeEvent, Dispatch, SetStateAction } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLocation, useParams } from "react-router-dom";
import { usePage } from "@/hooks/usePage";
import { useAuthUser } from "@/atoms/useAuthUser";
import { useEffect } from "react";
import { useState } from "react";

type Avatar = {
  size?: string;
  state?: File | null;
  setState?: Dispatch<SetStateAction<File | null>>;
  header?: boolean;
};

const Avatar: FC<Avatar> = ({
  size = "60px",
  state,
  setState,
  header = false,
}) => {
  const { pathname } = useLocation();
  const { uid } = useParams();
  const { toProfile } = usePage();
  const authUser = useAuthUser();
  const [url, setUrl] = useState<string | null>(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (setState) {
      if (e.target.files !== null) {
        setUrl("");
        setState(e.target.files[0]);
      }
    }
  };

  useEffect(() => {
    if (authUser?.photoURL) {
      setUrl(authUser.photoURL);
    }
  }, [authUser]);

  const AvatarImage = () => {
    return (
      <>
        {state !== undefined && state !== null ? (
          <img
            src={URL.createObjectURL(state)}
            alt=""
            style={{ width: size, height: size, borderRadius: "50%" }}
          />
        ) : url !== null ? (
          <img
            src={url}
            alt=""
            style={{ width: size, height: size, borderRadius: "50%" }}
            onClick={() => toProfile(uid!)}
          />
        ) : (
          <AccountCircleIcon sx={{ width: size, height: size }} />
        )}
      </>
    );
  };

  return (
    <div>
      <label htmlFor="avatar">
        <AvatarImage />
      </label>
      {!header && (
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="avatar"
          onChange={handleChange}
          required
        />
      )}
    </div>
  );
};

export default Avatar;
