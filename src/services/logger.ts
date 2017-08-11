const consoleAction = (actionName: string, ...args: Array<any>) => {
  (console as any)[actionName](...args);
};

export function log(...args: Array<any>) {
  consoleAction('log', ...args);
}

export function warn(...args: Array<any>) {
  consoleAction('warn', ...args);
}
