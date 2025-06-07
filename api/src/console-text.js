export const red = (strings, ...values) => `\x1b[31m${String.raw(strings, ...values)}\x1b[0m`;
export const yellow = (strings, ...values) => `\x1b[33m${String.raw(strings, ...values)}\x1b[0m`;
export const green = (strings, ...values) => `\x1b[32m${String.raw(strings, ...values)}\x1b[0m`;
