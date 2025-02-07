/** @param {NS} ns */
export async function main(ns) {
  await ns.sleep(1);
  await ns.weaken(ns.args[0]);
}
