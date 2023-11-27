import React from 'react'

const Genre = (props) => {
  const { id, name }=props
  return (
    <div>
      {name}
    </div>
  )
}

export default Genre