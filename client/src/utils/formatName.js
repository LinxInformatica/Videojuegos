import FILTERTYPES from "../helpers/filterTypes.helper"

const formatName = (name,type) => {
    if(type === FILTERTYPES.NAME) return `${FILTERTYPES.NAME} contains ${name}` 
    return `${type} is ${name}`

}
export default formatName