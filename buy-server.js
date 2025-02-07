/** @param {NS} ns */
export async function main(ns) {
  if (ns.args.length != 1) { ns.tprint("add a number at the end idiot"); return; }
  const size = ns.args[0];
  const result = ns.purchaseServer("Atlas", size);
  if (!result) ns.tprint("you don't have enuff monies");
  ns.tprint("server bought: " + result);
}
