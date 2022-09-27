import React, { FC, ChangeEvent, Dispatch, SetStateAction } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useParams } from "react-router-dom";
import { usePage } from "@/hooks/usePage";
import { useAuthUser } from "@/atoms/useAuthUser";
import { useEffect } from "react";
import { useState } from "react";
import { Skeleton } from "@mui/material";

type Avatar = {
  size?: number;
  state?: File | null;
  setState?: Dispatch<SetStateAction<File | null>>;
  header?: boolean;
  chat?: boolean;
  storageRef?: string;
};

const Avatar: FC<Avatar> = ({
  size = 60,
  state,
  setState,
  header = false,
  chat = false,
  storageRef,
}) => {
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
    if (storageRef) {
      setUrl(storageRef);
    }
  }, []);

  useEffect(() => {
    if (authUser?.photoURL) {
      setUrl(authUser.photoURL);
    }
  }, [authUser]);

  const AvatarImage = () => {
    return (
      <div>
        {chat ? (
          storageRef ? (
            <img
              src={storageRef}
              alt=""
              style={{
                width: size,
                height: size,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            <Skeleton variant="circular" width={size} height={size} />
          )
        ) : state !== undefined && state !== null ? (
          <img
            src={URL.createObjectURL(state)}
            alt=""
            style={{
              width: size,
              height: size,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ) : url !== null ? (
          <img
            src={url}
            alt=""
            style={{
              width: size,
              height: size,
              borderRadius: "50%",
              objectFit: "cover",
            }}
            onClick={() => header && toProfile(uid!)}
          />
        ) : (
          <AccountCircleIcon sx={{ width: size, height: size }} />
        )}
      </div>
    );
  };

  return (
    <div>
      <label htmlFor="avatar">
        <AvatarImage />
      </label>
      {!header && !chat && (
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
