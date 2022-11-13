import axios from 'axios'
import { useEffect, useState } from 'react'
import { set } from 'react-hook-form'
import './App.css'
import Addbtn from './assets/components/Addbtn'
import UserForm from './assets/components/UserForm'
import UsersList from './assets/components/UsersList'

function App() {
  const [users, setUsers] = useState([])

  const [add, setAdd] = useState(false)
  const [usersSelect, setUsersSelect] = useState(null)

  useEffect(() => {
    axios
      .get('https://users-crud1.herokuapp.com/users/')
      .then((res) => setUsers(res.data))
  }, [])

  const getUser = () => {
    axios
      .get('https://users-crud1.herokuapp.com/users/')
      .then((res) => setUsers(res.data))
  }
  const deleteUser = (id) => {
    axios
      .delete(`https://users-crud1.herokuapp.com/users/${id}/`)
      .then(() => getUser())
  }

  const seledUser = (user) => {
    setUsersSelect(user)
  }
  const deselectUser = () => setUsersSelect(null)

  console.log(add)
  return (
    <div className='App lg:flex overflow-y-auto py-60'>
      {add && (
        <UserForm
          setAdd={setAdd}
          deselectUser={deselectUser}
          getUser={getUser}
          usersSelect={usersSelect}
        />
      )}
      <Addbtn setAdd={setAdd} />

      <UsersList
        seledUser={seledUser}
        users={users}
        deleteUser={deleteUser}
        setAdd={setAdd}
      />
    </div>
  )
}

export default App
