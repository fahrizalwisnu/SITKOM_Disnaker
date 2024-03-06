import { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'

export const UserContext = createContext({})

export function UserContextProvider({ children }) {
  const [userId, setUserId] = useState(null)
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!user) {
      axios.get('/api/profile').then(({ data }) => {
        if (data) {
          setUser(data.data)
          setUserId(data.data.id)
          setReady(true)
        }
      })
    }
  }, [])

  return (
    <UserContext.Provider value={{ userId, setUserId, user, setUser, ready, setReady }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)