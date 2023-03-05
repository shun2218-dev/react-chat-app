import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query
} from 'firebase/firestore'
import {useEffect, useState} from 'react'
import {useLocation, useParams} from 'react-router-dom'

import {db} from '@/firebase'
import {Message} from '@/types/Message'

export const useChatMessage = (group = false) => {
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const [chatRoom, setChatRoom] = useState('')
  const [loading, setLoading] = useState(false)
  const [dataLoading, setDataLoading] = useState(false)
  const [roomExist, setRoomExist] = useState(true)
  const messageOptions = [orderBy('createdAt', 'asc')]
  const {uid, partnerid, groupid} = useParams()
  const {pathname} = useLocation()

  if (!group) {
    const getRoomId = async (uid: string, roomDocId: string) => {
      let roomid = ''
      const roomRef = doc(db, 'users', `${uid}`, 'rooms', `${roomDocId}`)
      await getDoc(roomRef).then(res => {
        roomid = res.data()?.roomid
      })
      return roomid
    }
    useEffect(() => {
      if (chatRoom) {
        const q = query(
          collection(db, 'rooms', chatRoom, 'messages'),
          ...messageOptions
        )
        const unSub = onSnapshot(q, snapshot => {
          setChatMessages([
            ...snapshot.docs.map(doc => {
              return {id: doc.id, ...doc.data()} as Message
            })
          ])
        })
        return () => {
          unSub()
        }
      }
    }, [chatRoom])

    useEffect(() => {
      if (!!partnerid && !!uid) {
        setDataLoading(true)
        const userRef = collection(db, 'users', uid, 'rooms')
        const unSubUser = onSnapshot(userRef, snapshot => {
          const room = snapshot.docs.filter(doc => doc.id === partnerid)
          if (room.length && uid) {
            const roomDocId = room[0].id
            getRoomId(uid, roomDocId).then(roomid => {
              setChatRoom(roomid)
              const messageRef = query(
                collection(db, 'rooms', `${roomid}`, 'messages'),
                orderBy('createdAt', 'asc')
              )
              getDocs(messageRef).then(snapshot => {
                setChatMessages([
                  ...snapshot.docs.map(doc => {
                    return {
                      id: doc.id,
                      ...doc.data()
                    } as Message
                  })
                ])
              })
            })
            setDataLoading(false)
          } else {
            setDataLoading(false)
          }
        })
        return () => {
          unSubUser()
        }
      }
    }, [pathname])

    useEffect(() => {
      if (partnerid) {
        setChatMessages([])
        setChatRoom('')
      }

      if (!roomExist) {
        setChatRoom('')
      }
    }, [pathname])
  } else {
    const q = query(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      collection(db, 'groups', groupid!, 'messages'),
      ...messageOptions
    )
    useEffect(() => {
      const unSub = onSnapshot(q, snapshot => {
        setChatMessages([
          ...snapshot.docs.map(doc => {
            return {id: doc.id, ...doc.data()} as Message
          })
        ])
      })
      return () => {
        unSub()
      }
    }, [])
  }
  return {
    chatMessages,
    chatRoom,
    setChatRoom,
    setLoading,
    loading,
    dataLoading,
    setDataLoading,
    setRoomExist,
    roomExist
  }
}
