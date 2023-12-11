const { Setup } = require('../../db')

const {PAGE_SIZE}=require('../../helpers/setup.helper')

const getSetup = async () => {
    //busco local
    try {
        const [setup,created] = await Setup.findOrCreate({
            where: { pk: 1 },
            defaults: {
                page_size:PAGE_SIZE,
                filters:'[]',
                orders:'[]'
            }
        })
        return setup
        
    } catch (error) {
        return ({ error: error.message })
    }
}

module.exports = { getSetup }