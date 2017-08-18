const consoleAction = (actionName, ...args) => {
  console[actionName](...args);
};

export function log(...args) {
  consoleAction('log', ...args);
}

export function warn(...args) {
  consoleAction('warn', ...args);
}

export function error(...args) {
  consoleAction('warn', ...args);
}
