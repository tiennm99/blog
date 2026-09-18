// The shared JSON printer. It lives in its own module rather than in index.js so
// that importing a command module never pulls in the dispatcher — an import
// cycle there would run the CLI as a side effect of any import.

/**
 * printJson mirrors console.log(JSON.stringify(v, null, 2)): 2-space indent, no
 * HTML escaping (URLs with & must stay readable), trailing newline.
 * @param {unknown} v
 * @returns {void}
 */
export function printJson(v) {
  process.stdout.write(JSON.stringify(v, null, 2) + "\n");
}
