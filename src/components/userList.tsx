import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import {
  collection,
  DocumentData,
  onSnapshot,
  QueryDocumentSnapshot
} from 'firebase/firestore'
import React, {memo, useCallback, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

import {useAuthUser} from '@/atoms/useAuthUser'
import {db} from '@/firebase'
import {usePage} from '@/hooks/usePage'
import styles from '@/styles/components/UserList.module.scss'
import utilStyles from '@/styles/utils/utils.module.scss'

import Button from './button'
import CancelModal from './cancelModal'
import ExitModal from './exitModal'
import InviteModal from './inviteModal'
import JoinModal from './joinModal'

const UserListMemo = ({group = false}: {group?: boolean}) => {
  const authUser = useAuthUser()
  const {partnerid, groupid} = useParams()
  const {toPrivateRoom} = usePage()
  const [ids, setIds] = useState<string[]>([])
  const [inviteIds, setInviteIds] = useState<string[]>([])
  const [cancelId, setCancelId] = useState('')
  const [allUsers, setAllUsers] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([])
  const [users, setUsers] = useState<QueryDocumentSnapshot<DocumentData>[]>([])
  const [inviteUsers, setInviteUsers] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([])
  const [inviteLists, setInviteLists] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([])
  const [inviteOpen, setInviteOpen] = useState(false)
  const [exitOpen, setExitOpen] = useState(false)
  const [joinOpen, setJoinOpen] = useState(false)
  const [cancelOpen, setCancelOpen] = useState(false)

  const modalToggle = useCallback(
    (target: string) => {
      if (target === 'invite') {
        setInviteOpen(!inviteOpen)
      } else if (target === 'exit') {
        setExitOpen(!exitOpen)
      } else if (target === 'join') {
        setJoinOpen(!joinOpen)
      } else if (target === 'cancel') {
        setCancelOpen(!cancelOpen)
      }
    },
    [joinOpen, exitOpen, inviteOpen, cancelOpen]
  )

  const isNotMember = useCallback(
    (doc: QueryDocumentSnapshot<DocumentData>) => doc.id !== authUser?.uid,
    [users]
  )

  useEffect(() => {
    const userRef = collection(db, 'users')
    const unSubUser = onSnapshot(userRef, snapshot => {
      setAllUsers([...snapshot.docs.map(doc => doc)])
    })
    if (group && groupid) {
      const groupRef = collection(db, 'groups', groupid, 'members')
      const unSub = onSnapshot(groupRef, snapshot => {
        if (snapshot.docs.every(isNotMember) && !joinOpen) {
          setJoinOpen(true)
        } else {
          setJoinOpen(false)
        }
        setUsers([...snapshot.docs.map(doc => doc)])
        setIds([...snapshot.docs.map(doc => doc.id)])
      })
      return () => {
        unSub()
        unSubUser()
      }
    } else {
      const unSub = onSnapshot(userRef, snapshot => {
        setUsers([...snapshot.docs.filter(doc => doc.id !== authUser?.uid)])
        setIds([...snapshot.docs.map(doc => doc.id)])
      })
      return () => {
        unSub()
        unSubUser()
      }
    }
  }, [])

  useEffect(() => {
    const members = allUsers.filter(user => ids.includes(user.id) === false)
    const invited = members.filter(
      member => inviteIds.includes(member.id) === false
    )
    setInviteUsers([...invited])
  }, [users, allUsers, inviteLists])

  useEffect(() => {
    if (groupid) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const inviteRef = collection(db, 'groups', groupid!, 'invitations')
      const unSub = onSnapshot(inviteRef, snapshot => {
        setInviteLists([...snapshot.docs.map(doc => doc)])
        setInviteIds([...snapshot.docs.map(doc => doc.id)])
      })
      return () => {
        unSub()
      }
    }
  }, [])

  return (
    <>
      <JoinModal open={joinOpen} modalToggle={modalToggle} />
      <InviteModal
        open={inviteOpen}
        modalToggle={modalToggle}
        inviteUsers={inviteUsers}
        inviteIds={inviteIds}
        setInviteIds={setInviteIds}
      />
      <ExitModal open={exitOpen} modalToggle={modalToggle} />
      <CancelModal
        open={cancelOpen}
        modalToggle={modalToggle}
        cancelId={cancelId}
        setCancelId={setCancelId}
      />
      <div className={styles.container}>
        <p className={styles.listtitle}>{group ? 'Members' : 'Users'}</p>
        <ul className={styles.memberlist}>
          <ul className={`${styles.userlist} ${groupid && styles.group}`}>
            {users.length ? (
              users.map(user => (
                <li
                  key={user.id}
                  className={`${styles.user} ${
                    partnerid === user.id ? styles.active : styles.passive
                  } ${group && styles.active}`}
                  onClick={() => {
                    !group && toPrivateRoom(authUser?.uid, user.id)
                  }}
                >
                  {user.data().photoURL ? (
                    <img
                      src={user.data().photoURL}
                      alt=''
                      className={utilStyles.avatar}
                    />
                  ) : (
                    <AccountCircleIcon
                      sx={{
                        width: 60,
                        height: 60,
                        '@media screen and (max-width:1000px)': {
                          width: 40,
                          height: 40
                        }
                      }}
                    />
                  )}
                  <p>{user.data().displayName ?? 'Unknown'}</p>
                </li>
              ))
            ) : (
              <div className={styles.loading}>loading...</div>
            )}
          </ul>

          {group && (
            <>
              <li className={styles.listtitle}>{'Invitation'}</li>
              <ul className={`${styles.userlist} ${styles.invite}`}>
                {inviteLists.length ? (
                  inviteLists.map(inviteList => (
                    <li
                      key={inviteList.id}
                      className={`${styles.user}`}
                      onClick={() => {
                        modalToggle('cancel')
                        setCancelId(inviteList.id)
                      }}
                    >
                      <img
                        src={inviteList.data().photoURL}
                        alt=''
                        className={utilStyles.avatar}
                      />
                      <p>{inviteList.data().displayName}</p>
                    </li>
                  ))
                ) : (
                  <div className={`${utilStyles.textcenter}  ${styles.nobody}`}>
                    Nobody invited
                  </div>
                )}
              </ul>
              <div className={styles.buttongroup}>
                <Button
                  type='button'
                  color='success'
                  variant='outlined'
                  fullwidth
                  onClick={() => modalToggle('invite')}
                >
                  Invite
                </Button>
                <Button
                  type='button'
                  color='error'
                  variant='outlined'
                  fullwidth
                  onClick={() => modalToggle('exit')}
                >
                  Exit
                </Button>
              </div>
            </>
          )}
        </ul>
      </div>
    </>
  )
}

const UserList = memo(UserListMemo)
export default UserList
