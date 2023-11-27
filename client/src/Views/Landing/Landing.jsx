import React from 'react'
import Genres from '../../Components/Genres/genres'
import Platforms from '../../Components/Platforms/Platforms'
import Cards from '../../Components/Cards/Cards'

const Landing = () => {
  return (
    <div>Landing
      <div><Genres /></div>
      <div><Platforms /></div>
      <div><Cards /></div>
    </div>
  )
}

export default Landing