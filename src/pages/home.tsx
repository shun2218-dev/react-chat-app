import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'

import {useAuthUser} from '@/atoms/useAuthUser'
import Card from '@/components/card'
import FlashMessage from '@/components/flashMessage'
import {useFlashMessage} from '@/hooks/useFlashMessage'
import {usePage} from '@/hooks/usePage'
import GroupIcon from '@/Icons/groupIcon'
import PrivateIcon from '@/Icons/privateIcon'
import styles from '@/styles/pages/Home.module.scss'

const Home = () => {
  const authUser = useAuthUser()
  const {toPrivate, toGroup, toProfile} = usePage()
  const {uid} = useParams()
  const {messageState, flashState} = useFlashMessage(10000)

  useEffect(() => {
    if (!authUser?.displayName || !authUser.photoURL) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      toProfile(uid!)
    }
  }, [])

  return (
    <>
      {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        flashState && <FlashMessage {...messageState!} />
      }
      <div className={styles.cardcontainer}>
        <Card
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
          onClick={() => toPrivate(authUser?.uid!)}
          startIcon={<PrivateIcon title />}
        >
          Private Chat
        </Card>
        <Card
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
          onClick={() => toGroup(authUser?.uid!)}
          startIcon={<GroupIcon title />}
        >
          Group Chat
        </Card>
      </div>
    </>
  )
}

export default Home
