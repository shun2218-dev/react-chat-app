import { Timestamp } from "firebase/firestore";

export type Message = {
  id: string;
  message?: string;
  createdAt: Timestamp;
  from: string;
  info?: boolean;
  status?: string;
  displayName?: string;
};
