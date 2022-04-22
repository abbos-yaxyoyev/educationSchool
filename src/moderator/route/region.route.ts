import fp from "fastify-plugin";
import { createRegionHandler, deleteRegionModeratorHandler, getRegionByIdModeratorHandler, getRegionsPagingHandler, updateRegionHandler } from "../handler/region.handler";

async function region(instance, options, next) {
    instance.post(
        '/region',
        {
            preValidation: [instance.auth]
        },
        createRegionHandler
    )

    instance.put(
        '/region',
        {
            preValidation: [instance.auth]
        },
        updateRegionHandler
    )

    instance.delete(
        '/region/:_id',
        {
            preValidation: [instance.auth]
        },
        deleteRegionModeratorHandler
    )

    instance.get(
        '/region/:_id',
        {
            preValidation: [instance.auth]
        },
        getRegionByIdModeratorHandler
    )

    instance.get(
        '/region',
        {
            preValidation: [instance.auth]
        },
        getRegionsPagingHandler
    )

    next()
}

export const regionModeratorPlugin = fp(region)