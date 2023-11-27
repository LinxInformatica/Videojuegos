import React from 'react'

const Card = (props) => {
  const { id, name }=props
  return (
    <div>
      {name}
    </div>
  )
}

export default Card