import { spawn } from "child_process";
import { FastifyInstance } from "fastify";

const triggerUpdateMiddleware = async (instance: FastifyInstance, options: { secret: string }) => {
    instance.get("/trigger-update", async (req, res) => {
        if (req.headers.authorization !== options.secret) {
            return res.status(403).send({ message: "invalid or missing secret" });
        }

        // https://stackoverflow.com/a/12871847
        spawn("update.bat", { detached: true, stdio: ['ignore', 'ignore', 'ignore'] });

        await res.status(200).send({ message: "triggered update" });
        process.exit();
    });
}

export default triggerUpdateMiddleware;