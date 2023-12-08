const {Platform}=require('../../db')

const getPlatforms = async () => {
    console.log('Loading Platforms from DB')
    try {
        const platforms = await Platform.findAll()
        return platforms

    } catch (error) {
        return ({ error: error.message })
    }

}

module.exports = { getPlatforms }