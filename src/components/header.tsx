import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import React from 'react'
import {useLocation} from 'react-router-dom'

import logo from '@/assets/logo.svg'
import {useAuthUser} from '@/atoms/useAuthUser'
import {usePage} from '@/hooks/usePage'
import {useSignOut} from '@/hooks/useSignOut'
import SignOutIcon from '@/Icons/signOutIcon'
import styles from '@/styles/components/Header.module.scss'
import {AuthUser} from '@/types/AuthUser'

import Button from './button'

const Header = () => {
  const {toStart, toHome, toProfile} = usePage()
  const authUser = useAuthUser()
  const {pathname} = useLocation()
  const {signOut, loading} = useSignOut()

  const logoNavigate = (authUser: AuthUser) => {
    if (authUser) {
      if (!authUser.displayName || !authUser.photoURL) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        toProfile(authUser.uid!)
      } else {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        toHome(authUser.uid!)
      }
    } else {
      toStart()
    }
  }

  return (
    <>
      {pathname !== '/' && (
        <header
          className={`${styles.header} ${
            authUser ? styles.login : styles.notlogin
          }`}
        >
          {/* after log in switch toHome */}
          <img
            src={logo}
            alt='logo'
            width='200px'
            height='67px'
            onClick={() => {
              logoNavigate(authUser)
            }}
            className={styles.logo}
          />
          {authUser && (
            <div className={styles.profile}>
              <p>{authUser.displayName}</p>
              {authUser.photoURL ? (
                <img
                  src={authUser.photoURL}
                  alt=''
                  className={styles.avatar}
                  onClick={() => toProfile(authUser.uid)}
                />
              ) : (
                <AccountCircleIcon
                  sx={{
                    width: 60,
                    height: 60,
                    '@media screen and (max-width:600px)': {
                      width: 40,
                      height: 40
                    }
                  }}
                  onClick={() => toProfile(authUser.uid)}
                />
              )}
              <Button
                type='button'
                variant='outlined'
                color='primary'
                onClick={signOut}
                startIcon={<SignOutIcon />}
                header
                disabled={loading}
              >
                Sign Out
              </Button>
            </div>
          )}
        </header>
      )}
    </>
  )
}

export default Header
