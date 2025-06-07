import dotenv from 'dotenv';
import { red, yellow } from './common/console-text.js';
import { readFileSync, watch } from 'node:fs';

let envs;

export function loadEnvs(path = '.env') {
    if (envs) return envs;
    try {
        const file = readFileSync(path, 'utf8');
        envs = dotenv.parse(file);
    } catch (e) {
        if (e.code === 'ENOENT') {
            console.log(yellow`no .env file found, using default values`);
            envs = {};
        } else {
            console.error(red`failed to read .env file: ${e.message}`);
            process.exit(1);
        }
    }
    // defaults
    envs.API_URL ??= 'http://localhost:9000';
    envs.tunnelPort ??= 9001;
    envs.instanceCount ??= 1;
    return envs;
}

export async function validateEnvs(envs) {
    if (isNaN(envs.instanceCount) || envs.instanceCount < 1) {
        console.error(red`invalid instanceCount, must be a number >= 1`);
        process.exit(1);
    }
}

export function setupEnvWatcher(path = '.env') {
    watch(path, (event, filename) => {
        if (event === 'change') {
            console.log(yellow`.env file changed, reloading...`);
            envs = undefined;
            loadEnvs(path);
        }
    });
}
