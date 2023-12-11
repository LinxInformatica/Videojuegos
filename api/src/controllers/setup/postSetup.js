const { Setup } = require("../../db");

const postSetup = async (page_size, filters,orders) => {
    try {
        const [setup, created] = await Setup.findOrCreate({
            where: { pk: 1 },
            defaults: {
                page_size,
                filters,
                orders
            }
        })
        if (!created) {
            setup.page_size = page_size
            setup.filters=filters
            setup.orders=orders
            await setup.save()
        }
        return { setup }

    } catch (error) {
        return ({ error: error.message })
    }

}

module.exports = { postSetup }