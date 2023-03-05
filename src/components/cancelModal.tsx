import {deleteDoc, doc, DocumentData} from 'firebase/firestore'
import React, {FC, memo, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

import {db} from '@/firebase'
import {getUserInfo} from '@/lib/getUserInfo'
import {informationMessage} from '@/lib/infomationMessage'
import styles from '@/styles/components/Modal.module.scss'
import {CustomModal} from '@/types/CustomModal'

import Avatar from './avatar'
import Button from './button'
import Modal from './modal'

const CancelModalMemo: FC<CustomModal> = ({
  open,
  modalToggle,
  cancelId,
  setCancelId
}) => {
  const {uid, groupid} = useParams()
  const [user, setUser] = useState<DocumentData>()
  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    if (cancelId && setCancelId) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const inviteRef = doc(db, 'groups', groupid!, 'invitations', cancelId)
      setLoading(true)
      await deleteDoc(inviteRef)
        .then(onClose)
        .then(
          async () =>
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            await informationMessage(uid!, groupid!, 'canceled', cancelId)
        )
    }
  }

  const onClose = () => {
    if (setCancelId) {
      modalToggle('cancel')
      setCancelId('')
      setLoading(false)
      setUser(undefined)
    }
  }

  useEffect(() => {
    if (cancelId) {
      getUserInfo(cancelId).then(userInfo => {
        setUser(userInfo)
      })
    }
  }, [cancelId])

  return (
    <Modal title='Cancel this invitation?' open={open}>
      {user && (
        <div>
          <Avatar size={40} storageRef={user.photoURL} chat />
          <p>{user.displayName}</p>
        </div>
      )}
      <div className={`${styles.modalButton} ${styles.row}`}>
        <Button
          type='button'
          color='primary'
          variant='contained'
          onClick={onSubmit}
          disabled={loading}
        >
          Yes
        </Button>
        <Button
          type='button'
          color='transparent'
          variant='outlined'
          onClick={onClose}
          disabled={loading}
        >
          No
        </Button>
      </div>
    </Modal>
  )
}

const CancelModal = memo(CancelModalMemo)
export default CancelModal
