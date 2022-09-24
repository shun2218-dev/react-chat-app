import React, { useState, FC, ChangeEvent } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

type Avatar = {
  size?: string;
};

const Avatar: FC<Avatar> = ({ size = "60px" }) => {
  const [image, setImage] = useState<File | null>();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setImage(e.target.files[0]);
    }
  };
  return (
    <div>
      <label htmlFor="avatar">
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt=""
            style={{ width: size, height: size, borderRadius: "50%" }}
          />
        ) : (
          <AccountCircleIcon sx={{ width: size, height: size }} />
        )}
      </label>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        id="avatar"
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default Avatar;
