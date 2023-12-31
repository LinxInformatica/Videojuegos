const { Setup } = require("../../db");

const postSetup = async (page_size, filters, orders) => {
    const filtersToText = JSON.stringify(filters)
    const ordersToText = JSON.stringify(orders)
    const newSetup = {
        pk: 1,
        page_size: page_size,
        filters: filtersToText,
        orders: ordersToText
    }
    try {
        const [setup, created] = await Setup.findOrCreate({
            where: { pk: 1 },
            defaults: newSetup
        })
        if (!created) {
            await Setup.update(newSetup, {
                where: { pk: 1 },
            })
        }
        return { newSetup }

    } catch (error) {
        return ({ error: error.message })
    }

}

module.exports = { postSetup }