import React from 'react'
import { useSelector } from 'react-redux'
import Platform from '../Platform/Platform'


const Platforms = () => {
    const platforms = useSelector((state) => state.allPlatforms)
    const sortedPlatforms = platforms.sort((a, b) => (a.name - b.name))

    return (
        <div>
            Platforms
            {sortedPlatforms.map((platform) => (
                <Platform key={platform.id}
                    id={platform.id}
                    name={platform.name}
                />))
            }

        </div>
    )
}

export default Platforms