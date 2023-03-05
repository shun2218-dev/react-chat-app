import {deleteDoc, doc} from 'firebase/firestore'
import React, {FC, useCallback, useState} from 'react'
import {useParams} from 'react-router-dom'

import {db} from '@/firebase'
import {usePage} from '@/hooks/usePage'
import {informationMessage} from '@/lib/infomationMessage'
import styles from '@/styles/components/Modal.module.scss'
import {CustomModal} from '@/types/CustomModal'
import {NavigationState} from '@/types/NavigationState'

import Button from './button'
import Modal from './modal'

const ExitModal: FC<CustomModal> = ({open, modalToggle}) => {
  const {uid, groupid} = useParams()
  const {toHome} = usePage()
  const [loading, setLoading] = useState(false)

  const exitGroup = useCallback(async (groupid: string, uid: string) => {
    setLoading(true)
    const flashMessage = {
      title: 'Success',
      status: 'success',
      text: 'Exit group.'
    } as NavigationState
    await deleteDoc(doc(db, 'groups', groupid, 'members', uid))
      .then(() => uid !== null && toHome(uid, flashMessage))
      .then(async () => {
        await informationMessage(uid, groupid, 'existed').then(() =>
          setLoading(false)
        )
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <Modal title='Exit this group?' open={open}>
      <div className={`${styles.modalbutton} ${styles.row}`}>
        <Button
          type='button'
          color='primary'
          variant='contained'
          onClick={() =>
            groupid !== null && uid !== null && exitGroup(groupid, uid)
          }
          fullwidth
          disabled={loading}
        >
          Yes
        </Button>
        <Button
          type='button'
          color='transparent'
          variant='outlined'
          onClick={() => modalToggle('exit')}
          fullwidth
          disabled={loading}
        >
          No
        </Button>
      </div>
    </Modal>
  )
}

export default ExitModal
