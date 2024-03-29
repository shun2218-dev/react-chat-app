import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import React, {ChangeEvent, FormEvent, useRef, useState} from 'react'
import {useParams} from 'react-router-dom'

import Button from '@/components/button'
import FlashMessage from '@/components/flashMessage'
import Form from '@/components/form'
import Input from '@/components/input'
import TextArea from '@/components/textArea'
import {useCreateGroup} from '@/hooks/useCreateGroup'
import {useFlashMessage} from '@/hooks/useFlashMessage'
import {usePage} from '@/hooks/usePage'
import utilStyles from '@/styles/utils/utils.module.scss'

const Create = () => {
  const [desc, setDesc] = useState('')
  const nameRef = useRef<HTMLInputElement>(null)
  const {uid} = useParams()
  const {createGroup, loading} = useCreateGroup()
  const {messageState, flashState} = useFlashMessage(3000)
  const {toHome} = usePage()
  const [image, setImage] = useState<File | null>(null)

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value)
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const name = nameRef.current?.value
    if (image && name && desc) {
      const data = {groupName: name, description: desc, owner: uid}
      await createGroup(data, image)
    }
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setImage(e.target.files[0])
    }
  }
  const AvatarImage = () => {
    if (image) {
      return (
        <img
          src={URL.createObjectURL(image)}
          alt=''
          className={utilStyles.avatar}
        />
      )
    } else {
      return <AccountCircleIcon sx={{width: '60px', height: '60px'}} />
    }
  }

  return (
    <>
      {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        flashState && <FlashMessage {...messageState!} />
      }
      <Form title='Create a new group' onSubmit={async e => onSubmit(e)}>
        <div>
          <label htmlFor='avatar'>
            <AvatarImage />
          </label>
          <input
            type='file'
            accept='image/*'
            style={{display: 'none'}}
            id='avatar'
            onChange={handleChange}
          />
        </div>
        <Input
          label='Group name'
          placeholder='Group name'
          required
          ref={nameRef}
        />
        <TextArea
          value={desc}
          onChange={onChange}
          label='Description'
          placeholder='Description about this group'
        />
        <Button
          type='submit'
          color='primary'
          variant='contained'
          fullwidth
          margin='20px 0 0'
          disabled={loading}
        >
          Next
        </Button>
        <Button
          type='button'
          color='transparent'
          variant='filled'
          onClick={() => !!uid && toHome(uid)}
        >
          Cancel
        </Button>
      </Form>
    </>
  )
}

export default Create
