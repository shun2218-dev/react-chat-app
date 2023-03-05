import {doc, setDoc} from 'firebase/firestore'
import React, {
  ChangeEvent,
  FC,
  FormEvent,
  memo,
  useCallback,
  useState
} from 'react'
import {useParams} from 'react-router-dom'

import {db} from '@/firebase'
import {getUserInfo} from '@/lib/getUserInfo'
import {informationMessage} from '@/lib/infomationMessage'
import styles from '@/styles/components/Modal.module.scss'
import utilStyles from '@/styles/utils/utils.module.scss'
import {CustomModal} from '@/types/CustomModal'

import Button from './button'
import Modal from './modal'

const InviteModalMemo: FC<CustomModal> = ({
  open,
  modalToggle,
  inviteUsers,
  inviteIds,
  setInviteIds
}) => {
  const {uid, groupid} = useParams()
  const [loading, setLoading] = useState(false)
  const [targetIds, setTargetIds] = useState<string[]>([])

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (inviteIds?.length !== 0) {
      inviteIds?.forEach(async invite => {
        setLoading(true)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const inviteRef = doc(db, 'groups', groupid!, 'invitations', invite!)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        await getUserInfo(invite!).then(async user => {
          await setDoc(inviteRef, user).then(onClose)
        })
      })

      targetIds.forEach(async targetIds => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        await informationMessage(uid!, groupid!, 'invited', targetIds)
      })
    }
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target.value
    if (targetIds.includes(target)) {
      setTargetIds([...targetIds.filter(targetId => targetId !== target)])
    } else {
      setTargetIds([...targetIds, target])
    }

    if (setInviteIds) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (inviteIds!.includes(target)) {
        setInviteIds([
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          ...inviteIds!.filter(inviteList => inviteList !== target)
        ])
      } else {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        setInviteIds([...inviteIds!, target])
      }
    }
  }

  const onClose = useCallback(() => {
    if (setInviteIds) {
      modalToggle('invite')
      setInviteIds([])
      setTargetIds([])
      setLoading(false)
    }
  }, [open])

  return (
    <Modal title='Select the member to invite' open={open} onSubmit={onSubmit}>
      <ul className={`${styles.userlist} ${styles.invite}`}>
        {inviteUsers?.length ? (
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          inviteUsers!.map(user => (
            <label key={user.id} className={styles.label}>
              <li
                className={`${styles.user} ${styles.passive} `}
                // onClick={() => {}}
              >
                <input
                  type='checkbox'
                  name=''
                  id=''
                  value={user.id}
                  onChange={onChange}
                />
                <img
                  src={user.data().photoURL}
                  alt=''
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
      <div className={`${styles.modalbutton}`}>
        <Button
          type='submit'
          color='primary'
          variant='contained'
          fullwidth
          disabled={loading}
        >
          Invite New Members
        </Button>
        <Button
          type='button'
          color='transparent'
          variant='filled'
          fullwidth
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  )
}

const InviteModal = memo(InviteModalMemo)
export default InviteModal
