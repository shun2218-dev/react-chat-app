import React from 'react'
import {useParams} from 'react-router-dom'

import Card from '@/components/card'
import {usePage} from '@/hooks/usePage'
import styles from '@/styles/pages/Group.module.scss'

const Group = () => {
  const {toJoin, toCreate} = usePage()
  const {uid} = useParams()
  return (
    <>
      <div className={styles.cardcontainer}>
        <Card onClick={() => !!uid && toJoin(uid)}>
          Join a already exists group
        </Card>
        <Card onClick={() => !!uid && toCreate(uid)}>Create a new group</Card>
      </div>
    </>
  )
}

export default Group
