/** @param {NS} ns */
export async function main(ns) {
  if (ns.args.length != 1) { 
    ns.tprint("Incorrect Arguments!"); 
    ns.tprint("Usage: run buy-server.js [RAM]"); 
    return;
  }
  const size = ns.args[0];
  const result = ns.purchaseServer("Atlas", size);
  if (!result) ns.tprint("you don't have enuff monies");
  ns.tprint("Server bought: " + result);
}