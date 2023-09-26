import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Users = ({ users, vacations })=> {

  return (
    <div>
      <h2>Users ({ users.length })</h2>
      <ul>
        {
          users.map(user=>{
            return (
              <li key={user.id}>
                { user.name }
                ({ vacations.filter(vaca=> vaca.user_id === user.id).length })
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
const Vacations = ({ vacations, places })=> {

  return (
    <div>
      <h2>Vacations ({ vacations.length })</h2>
      <ul>
        {
          vacations.map(vaca=>{
            const place = places.find(place=>place.id === vaca.place_id)
            return (
              <li key={vaca.id}>
                { new Date(vaca.created_at).toLocaleString() }
                <div>
                  to: { place ? place.name : null}
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
const Places = ({ places, vacations })=> {

  return (
    <div>
      <h2>Places ({ places.length })</h2>
      <ul>
        {
          places.map(place=>{
            return (
              <li key={place.id}>
                { place.name }
                ({ vacations.filter(vaca=> vaca.place_id === place.id).length })
                </li>
            )
          })
        }
      </ul>
    </div>
  )
}

const App = ()=> {
  const [users, setUsers]= useState([])
  const [vacations, setVacations]= useState([])
  const [places, setPlaces]= useState([])

  useEffect(()=>{
    const fetchUsers = async()=>{
      const response = await axios.get('/api/users')
      setUsers(response.data)
    }
    const fetchVacations = async()=>{
      const response = await axios.get('/api/vacations')
      setVacations(response.data)
    }
    const fetchPlaces = async()=>{
      const response = await axios.get('/api/places')
      setPlaces(response.data)
    }
    fetchPlaces()
    fetchUsers()
    fetchVacations()
  }, [])

  return (
    <div>
      <h1>FullStack Template</h1>
      <main>
      <Vacations vacations={vacations} places={places}/>
      <Users users={users} vacations={vacations}/>
      <Places places={places} vacations={vacations}/>
      </main>
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);
