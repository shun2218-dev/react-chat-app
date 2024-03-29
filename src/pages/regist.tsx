import React, {FormEvent, useEffect, useRef} from 'react'

import {useAuthUser} from '@/atoms/useAuthUser'
import Button from '@/components/button'
import Form from '@/components/form'
import Input from '@/components/input'
import {usePage} from '@/hooks/usePage'
import {useSignUp} from '@/hooks/useSignUp'
import CheckInIcon from '@/Icons/checkInIcon'
import SignInIcon from '@/Icons/signInIcon'
import SignUpIcon from '@/Icons/signUpIcon'
import styles from '@/styles/pages/Regist.module.scss'

const Regist = () => {
  const {toLogin, toHome} = usePage()
  const {signUp, loading} = useSignUp()
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordConfirmationRef = useRef<HTMLInputElement>(null)
  const authUser = useAuthUser()

  const passwordValidate = (password: string, passwordConfirmation: string) => {
    if (password === passwordConfirmation) {
      return true
    } else {
      return false
    }
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = emailRef.current?.value
    const password = passwordRef.current?.value
    const passwordConfirmation = passwordConfirmationRef.current?.value
    if (email && password && passwordConfirmation) {
      if (passwordValidate(password, passwordConfirmation)) {
        signUp(email, password)
      }
    }
  }

  useEffect(() => {
    if (authUser !== null) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
      toHome(authUser?.uid!)
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
  }, [authUser?.uid!])
  return (
    <>
      <Form
        title='Sign Up'
        onSubmit={onSubmit}
        startIcon={<SignUpIcon title />}
      >
        <Input
          label='Email'
          type='email'
          placeholder='Your Email'
          required
          ref={emailRef}
        />
        <Input
          label='Password'
          type='password'
          placeholder='Password'
          required
          ref={passwordRef}
        />
        <Input
          label='Password Confirmation'
          type='password'
          placeholder='Password Confirmation'
          required
          ref={passwordConfirmationRef}
        />
        <Button
          type='submit'
          color='primary'
          variant='contained'
          fullwidth
          height='52px'
          margin='20px 0 0'
          startIcon={<CheckInIcon />}
          disabled={loading}
        >
          Sign Up
        </Button>
        <div className={styles.buttongroup}>
          <Button
            type='button'
            color='transparent'
            onClick={toLogin}
            startIcon={<SignInIcon />}
          >
            Sign In
          </Button>
        </div>
      </Form>
    </>
  )
}

export default Regist
