import {collection, onSnapshot} from 'firebase/firestore'
import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

import Form from '@/components/form'
import {db} from '@/firebase'
import {usePage} from '@/hooks/usePage'
import styles from '@/styles/pages/Join.module.scss'
import utilStyles from '@/styles/utils/utils.module.scss'

type Groups = {
  id: string
  groupName: string
  owner: string
  photoURL: string
}

const Join = () => {
  const [groups, setGroups] = useState<Groups[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const {toGroupRoom} = usePage()
  const {uid} = useParams()

  useEffect(() => {
    setLoading(true)
    const ref = collection(db, 'groups')
    const unSub = onSnapshot(ref, snapshot => {
      setGroups(
        snapshot.docs.map(doc => {
          return {id: doc.id, ...doc.data()} as Groups
        })
      )
      setLoading(false)
    })
    return () => {
      unSub()
    }
  }, [])

  return (
    <Form title='Group List'>
      <ul className={styles.groupList}>
        {groups.length ? (
          groups.map(({id, groupName, photoURL}) => (
            <li
              className={styles.group}
              key={id}
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              onClick={() => uid !== null && toGroupRoom(uid, id)}
            >
              <img
                src={photoURL}
                alt={groupName}
                className={utilStyles.avatar}
              />
              <p className={styles.name}>{groupName}</p>
            </li>
          ))
        ) : loading ? (
          <li>...loading</li>
        ) : (
          <li>Not Found</li>
        )}
      </ul>
    </Form>
  )
}

export default Join
