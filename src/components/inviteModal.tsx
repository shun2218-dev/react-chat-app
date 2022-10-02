import { CustomModal } from "@/types/CustomModal";
import React, {
  ChangeEvent,
  FC,
  FormEvent,
  memo,
  useCallback,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import Button from "./button";
import Modal from "./modal";
import styles from "@/styles/components/Modal.module.scss";
import utilStyles from "@/styles/utils/utils.module.scss";
import { getUserInfo } from "@/lib/getUserInfo";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { informationMessage } from "@/lib/infomationMessage";

const InviteModal: FC<CustomModal> = memo(
  ({ open, modalToggle, inviteUsers, inviteIds, setInviteIds }) => {
    const { uid, groupid } = useParams();
    const [loading, setLoading] = useState(false);
    const [targetIds, setTargetIds] = useState<string[]>([]);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (inviteIds!.length !== 0) {
        setLoading(true);
        inviteIds!.forEach(async (invite) => {
          const inviteRef = doc(db, "groups", groupid!, "invitations", invite!);
          await getUserInfo(invite!).then(async (user) => {
            await setDoc(inviteRef, user).then(onClose);
          });
        });

        targetIds.forEach(async (targetIds) => {
          await informationMessage(uid!, groupid!, "invited", targetIds);
        });
      }
      setLoading(false);
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const target = e.target.value;
      if (targetIds.includes(target)) {
        setTargetIds([...targetIds.filter((targetId) => targetId !== target)]);
      } else {
        setTargetIds([...targetIds, target]);
      }

      if (setInviteIds) {
        if (inviteIds!.includes(target)) {
          setInviteIds([
            ...inviteIds!.filter((inviteList) => inviteList !== target),
          ]);
        } else {
          setInviteIds([...inviteIds!, target]);
        }
      }
    };

    const onClose = useCallback(() => {
      if (setInviteIds) {
        modalToggle("invite");
        setInviteIds([]);
        setTargetIds([]);
      }
    }, [open]);

    return (
      <Modal
        title="Select the member to invite"
        open={open}
        onSubmit={onSubmit}
      >
        <ul className={`${styles.userList} ${styles.invite}`}>
          {inviteUsers!.length ? (
            inviteUsers!.map((user) => (
              <label key={user.id} className={styles.label}>
                <li
                  className={`${styles.user} ${styles.passive} `}
                  onClick={() => {}}
                >
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    value={user.id}
                    onChange={onChange}
                  />
                  <img
                    src={user.data().photoURL}
                    alt=""
                    className={utilStyles.avatar}
                  />
                  <p>{user.data().displayName}</p>
                </li>
              </label>
            ))
          ) : (
            <div>...loading</div>
          )}
        </ul>
        <div className={`${styles.modalButton}`}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            disabled={loading}
          >
            Invite New Members
          </Button>
          <Button
            type="button"
            color="transparent"
            variant="filled"
            fullWidth
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    );
  }
);

export default InviteModal;
