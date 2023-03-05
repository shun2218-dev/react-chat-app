/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, {useEffect} from 'react'
import {Outlet} from 'react-router-dom'

import {useAuthUser} from '@/atoms/useAuthUser'
import {usePage} from '@/hooks/usePage'
import {NavigationState} from '@/types/NavigationState'

const AuthLayout = () => {
  const authUser = useAuthUser()
  const {toLogin, toProfile} = usePage()
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    if (authUser?.uid!) {
      if (!authUser?.photoURL || !authUser.displayName) {
        const flashMessage = {
          title: 'Information',
          status: 'info',
          text: 'Please set up your profile to start chatting.'
        } as NavigationState
        toProfile(authUser.uid!, flashMessage)
      }
    } else {
      toLogin()
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  }, [authUser?.uid!])
  return (
    <>
      <Outlet />
    </>
  )
}

export default AuthLayout
