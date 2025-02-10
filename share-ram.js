/** @param {NS} ns */
export async function main(ns) {
  while (true) {
    ns.run("share.js", 1000);
    await ns.sleep(50);
  }
}