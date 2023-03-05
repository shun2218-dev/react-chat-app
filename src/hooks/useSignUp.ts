import {createUserWithEmailAndPassword} from 'firebase/auth'
import {doc, setDoc} from 'firebase/firestore'
import {useState} from 'react'

import {auth, db} from '@/firebase'

import {usePage} from './usePage'

type AddUserData = {
  uid: string
  email: string
}

export function useSignUp() {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error>()
  const {toProfile} = usePage()

  const addUserList = (uid: string, data: AddUserData) => {
    const ref = doc(db, 'users', uid)
    setDoc(ref, {...data})
  }

  // eslint-disable-next-line max-len
  const signUp = async (email: string, password: string) => {
    setLoading(true)
    return await createUserWithEmailAndPassword(auth, email, password)
      .then(res => {
        const {
          user: {uid, email}
        } = res
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        addUserList(uid, {uid, email: email!})
        return res
      })
      .then(res => toProfile(res.user.uid))
      .catch(e => {
        setError(e instanceof Error ? e : Error('unecpected error!'))
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    signUp,
    loading,
    error
  }
}
