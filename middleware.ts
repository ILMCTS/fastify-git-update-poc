import { spawn } from "child_process";
import { FastifyInstance } from "fastify";

const triggerUpdateMiddleware = async (inst: FastifyInstance, opt: { secret: string }) => {
    inst.get<{ Querystring: { secret?: string } }>("/trigger-update", async (req, res) => {
        // TODO: request header
        if (req.query.secret !== opt.secret) {
            return res.status(403).send({ message: "invalid secret" });
        }

        spawn("update.bat", { detached: true, stdio: ['ignore', 'ignore', 'ignore'] });

        await res.status(200).send({ message: "triggered update" });

        process.exit();
    })
}

export default triggerUpdateMiddleware;