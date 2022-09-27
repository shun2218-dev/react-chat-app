import { Timestamp } from "firebase/firestore";

export type Message = {
  id: string;
  message: string;
  createdAt: Timestamp;
  from: string;
};
