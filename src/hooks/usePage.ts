import {useNavigate} from 'react-router-dom'

import {NavigationState} from '@/types/NavigationState'

export const usePage = () => {
  const navigate = useNavigate()

  const toStart = () => {
    navigate('/')
  }

  const toLogin = () => {
    navigate('/login')
  }

  const toRegist = () => {
    navigate('/regist')
  }

  const toReset = () => {
    navigate('/reset')
  }

  const toComplete = (state: NavigationState) => {
    navigate('/reset/complete', {state})
  }

  const toProfile = (uid: string, state?: NavigationState) => {
    if (state) {
      navigate(`/${uid}/profile`, {state})
    } else {
      navigate(`/${uid}/profile`)
    }
  }

  const toHome = (uid: string, state?: NavigationState) => {
    if (state) {
      navigate(`/${uid}/home`, {state})
    } else {
      navigate(`/${uid}/home`)
    }
  }

  const toPrivate = (uid: string) => {
    navigate(`/${uid}/private`)
  }

  const toPrivateRoom = (uid: string, partnerid: string) => {
    navigate(`/${uid}/private/${partnerid}`)
  }

  const toGroup = (uid: string) => {
    navigate(`/${uid}/group`)
  }

  const toGroupRoom = (
    uid: string,
    groupid: string,
    state?: NavigationState
  ) => {
    navigate(`/${uid}/group/${groupid}`, {state})
  }

  const toJoin = (uid: string) => {
    navigate(`/${uid}/group/join`)
  }

  const toCreate = (uid: string) => {
    navigate(`/${uid}/group/create`)
  }

  const toRedirect = (state: NavigationState) => {
    navigate('.', {replace: true, state})
  }

  return {
    toStart,
    toLogin,
    toRegist,
    toReset,
    toComplete,
    toProfile,
    toHome,
    toPrivate,
    toPrivateRoom,
    toGroup,
    toGroupRoom,
    toJoin,
    toCreate,
    toRedirect
  }
}
