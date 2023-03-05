import React from 'react'
import {useLocation} from 'react-use'

import Button from '@/components/button'
import {usePage} from '@/hooks/usePage'
import utilStyles from '@/styles/utils/utils.module.scss'

const NotFound = () => {
  const {toLogin} = usePage()
  const {pathname} = useLocation()
  return (
    <div className={utilStyles.flexcenter}>
      <h1>404 Not Found</h1>
      <p>
        Invalid Pathname:
        <span className={utilStyles.errortext}>{pathname}</span>
      </p>
      <div>
        <Button type='button' color='primary' onClick={toLogin}>
          Back To Home
        </Button>
      </div>
    </div>
  )
}

export default NotFound
