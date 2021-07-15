import { gql } from '@apollo/client'
import { useQuery } from '@apollo/react-hooks'

import React from 'react'

const USER_LIST = gql`
  query USER_LIST {
    users {
      name
      id
    }
  }
`

export default function Users() {
  const { data, loading, error } = useQuery(USER_LIST)
  if (loading) return <h1>loading</h1>
  if (error) {
    console.error(error)
    return <h1> error</h1>
  }

  console.log(data)

  return (
    <ul>
      {data.users.map(o => (
        <li key={o.id}>{o.name}</li>
      ))}
    </ul>
  )
}
