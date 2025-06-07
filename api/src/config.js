import { loadEnvs, validateEnvs, setupEnvWatcher } from "../env.js";

const version = '1.0.0-stable';
const env = loadEnvs();

const genericUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36';
const cobaltVersion = `cobalt:${version} (https://github.com/imput/cobalt)`;

export const canonicalEnv = Object.freeze(structuredClone(process.env));
export const setTunnelPort = (port) => env.tunnelPort = port;
export const isCluster = env.instanceCount > 1;
export const updateEnv = (newEnv) => {
    newEnv.tunnelPort = env.tunnelPort;

    for (const key in env) {
        env[key] = newEnv[key];
    }
};

await validateEnvs(env);

if (env.envFile) {
    setupEnvWatcher();
}

export {
    env,
    genericUserAgent,
    cobaltVersion,
};
