import path from 'node:path';
import { fileURLToPath } from 'node:url';

// --- Início da Lógica Corrigida ---
// Pega o caminho absoluto do diretório onde este arquivo (config.js) está
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Importa o 'env.js' usando o caminho absoluto, garantindo que sempre será encontrado
import { loadEnvs, validateEnvs, setupEnvWatcher } from path.join(__dirname, 'env.js');
// --- Fim da Lógica Corrigida ---

const version = '1.0.0-stable'; // Mantemos a versão fixa

const env = loadEnvs();

const genericUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36';
const cobaltVersion = `cobalt:${version} (https://github.com/imput/cobalt)`;

export const canonicalEnv = Object.freeze(structuredClone(process.env));
export const setTunnelPort = (port) => env.tunnelPort = port;
export const isCluster = env.instanceCount > 1;
export const updateEnv = (newEnv) => {
    // tunnelPort is special and needs to get carried over here
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
