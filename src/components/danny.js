import React from 'react'
import { useState } from 'react'

export default function Danny() {
  const [myDogs, setMyDogs] = useState([
    {name: 'Jack', breed: 'Boxer'},
    {name: 'Shoogie', breed: 'mixed'},
    {name: 'Obama', breed: 'mixed'},
  ])

  return (
    <table>
      <thead>
        <tr>
          <th>Dog name</th>
          <th>Breed</th>
        </tr>
      </thead>
      <tbody>
        {myDogs.map((dog, index) => (
        <tr key={index}>
          <td>{dog.name}</td>
          <td>{dog.breed}</td>
        </tr>
        ))}
      </tbody>
    </table>
  )
}

