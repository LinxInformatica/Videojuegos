const {Platform}=require('../../db')

const getPlatforms = async () => {
    try {
        const platforms = await Platform.findAll()
        return platforms

    } catch (error) {
        return ({ error: error.message })
    }

}

module.exports = { getPlatforms }