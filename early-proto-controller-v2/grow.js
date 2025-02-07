/** @param {NS} ns */
export async function main(ns) {
  await ns.sleep(1);
  await ns.grow(ns.args[0]);
}
