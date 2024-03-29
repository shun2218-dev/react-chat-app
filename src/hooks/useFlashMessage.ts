import {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {useTimeout} from 'react-use'

import {NavigationState} from '@/types/NavigationState'

type FlashMessage = {
  messageState: NavigationState | undefined
  flashState: boolean
  reset: () => void
}

export const useFlashMessage = (timeout: number) => {
  const location = useLocation()
  const [flashMessage, setFlashMessage] = useState(false)
  const [isReady, reset] = useTimeout(timeout)

  useEffect(() => {
    if (location.state) {
      setFlashMessage(true)
    } else {
      setFlashMessage(false)
    }
  }, [location])
  return {
    messageState: location.state,
    flashState: flashMessage && !isReady(),
    reset
  } as FlashMessage
}
