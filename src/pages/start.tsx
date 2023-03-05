import React, {useEffect} from 'react'

import logo from '@/assets/logo.svg'
import nextLogo from '@/assets/logo_next.svg'
import Button from '@/components/button'
import {usePage} from '@/hooks/usePage'
import ArrowTopRight from '@/Icons/arrowTopRight'
import styles from '@/styles/pages/Start.module.scss'

const Start = () => {
  const {toLogin, toRegist} = usePage()

  const removeHomeClass = (toMove: () => void) => {
    document.body.classList.remove('home')
    document.body.classList.remove('pace-done')
    toMove()
  }

  useEffect(() => {
    const addHomeClass = () => {
      const bodyClasses = document.body.classList
      if (!bodyClasses.contains('home')) {
        bodyClasses.remove('pace-done')
        bodyClasses.add('home')
      }
    }
    addHomeClass()
  }, [])

  return (
    <div className={styles.container}>
      <img src={logo} alt='logo' className={styles.logo} />
      <div className={styles.buttongroup}>
        <Button
          type='button'
          color='primary'
          variant='contained'
          rounded
          onClick={() => removeHomeClass(toRegist)}
          height='50px'
          width='150px'
        >
          Get Started
        </Button>
        <Button
          type='button'
          color='transparent'
          variant='filled'
          onClick={() => removeHomeClass(toLogin)}
          height='30px'
          width='150px'
        >
          Sign In &gt;
        </Button>
      </div>
      <Button
        type='button'
        color='transparent'
        variant='filled'
        height='60px'
        width='250px'
        fullwidth
        endIcon={<ArrowTopRight />}
      >
        <a
          href={'https://next-chat-app-shun2218-dev.vercel.app'}
          target='_blank'
          rel='noopener noreferrer'
        >
          <img src={nextLogo} alt='Next Chat App' className={styles.nextLogo} />
        </a>
      </Button>
    </div>
  )
}

export default Start
