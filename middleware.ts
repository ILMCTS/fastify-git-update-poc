import { spawn } from "child_process";
import { FastifyInstance } from "fastify";

const triggerUpdateMiddleware = async (inst: FastifyInstance) => {
    inst.get("/trigger-update", async (req, res) => {
        spawn("update.bat", { detached: true, stdio: ['ignore', 'ignore', 'ignore'] });

        await res.status(200).send({ message: "triggered update" });

        process.exit();
    })
}

export default triggerUpdateMiddleware;