import { Type } from "@sinclair/typebox";
import { Value } from '@sinclair/typebox/value'
import { randomUUID } from "crypto";
import { config } from "dotenv";
import fastify from "fastify";
import triggerUpdateMiddleware from "./middleware.js";

const envSchema = Type.Object({
    GH_UPDATE_SECRET: Type.Optional(Type.String()),
    WEB_PORT: Type.RegExp(/[0-9]+/g),
});

async function main() {
    config();

    const env = Value.Decode(envSchema, process.env);

    const server = fastify({
        ignoreTrailingSlash: true,
        genReqId: () => randomUUID(),
        requestIdHeader: "TrackingId",
    });

    await server.register(triggerUpdateMiddleware, {
        secret: env.GH_UPDATE_SECRET,
    });

    const addr = await server.listen({ port: Number(env.WEB_PORT) });
    console.info(`Listening on ${addr}`)
}

main();