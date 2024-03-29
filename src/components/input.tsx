import React, {forwardRef, RefObject} from 'react'

import styles from '@/styles/components/Input.module.scss'

type Input = {
  type?: 'text' | 'email' | 'password'
  placeholder?: string
  label?: string
  required?: boolean
  ref?: RefObject<HTMLInputElement>
  defaultValue?: string
}

const Input = forwardRef<HTMLInputElement, Input>(function InputRef(
  {type = 'text', placeholder, label, required = true, defaultValue},
  ref
) {
  return (
    <label className={styles.input}>
      {label}
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        ref={ref}
        defaultValue={defaultValue}
      />
    </label>
  )
})

export default Input
