import { Type } from "@sinclair/typebox";
import { Value } from '@sinclair/typebox/value'
import { randomUUID } from "crypto";
import { config } from "dotenv";
import fastify from "fastify";
import triggerUpdateMiddleware from "./middleware.js";

const envSchema = Type.Object({
    TRIGGER_UPDATE_SECRET: Type.Optional(Type.String()),
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

    if (env.TRIGGER_UPDATE_SECRET) {
        // only register update middleware when the secret is configured
        await server.register(triggerUpdateMiddleware, {
            secret: env.TRIGGER_UPDATE_SECRET,
        });
    }

    server.get("/", async (_, res) => {
        await res
            .header("Content-Type", "text/html")
            .send("<center><h1>Hello World</h1></center>");
    });

    const address = await server.listen({ port: Number(env.WEB_PORT) });
    console.info(`Listening on ${address}`);
}

main();