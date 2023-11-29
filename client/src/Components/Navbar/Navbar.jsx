import React from 'react'
import Searchbar from '../Searchbar/Searchbar'
import Filters from '../Filters/Filters'

const Navbar = () => {
  return (
    <div>
      <div>
        <Searchbar />
      </div>
      <div>
        <Filters />
      </div>
    </div>


  )
}

export default Navbar