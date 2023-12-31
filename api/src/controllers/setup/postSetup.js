const { Setup } = require("../../db");

const postSetup = async (page_size, filters,orders) => {
    const filtersToText=JSON.stringify(filters)
    const ordersToText=JSON.stringify(orders)

    try {
        let [setup, created] = await Setup.findOrCreate({
            where: { pk: 1 },
            defaults: {
                page_size,
                filters:filtersToText,
                orders:ordersToText
            }
        })
        if (!created) {
            setup.page_size = page_size
            setup.filters=filtersToText
            setup.orders=ordersToText
            await setup.save()
        }
        return { setup}

    } catch (error) {
        return ({ error: error.message })
    }

}

module.exports = { postSetup }