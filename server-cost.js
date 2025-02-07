/** @param {NS} ns */
export async function main(ns) {
  if (ns.args.length != 1) { ns.tprint("add a number at the end idiot"); return; }
  const size = ns.args[0];
  
  ns.tprint(ns.formatNumber(ns.getPurchasedServerCost(size)));
}
