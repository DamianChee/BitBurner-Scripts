/** @param {NS} ns */
export async function main(ns) {
  if (ns.args.length != 1) { 
    ns.tprint("Incorrect Arguments!"); 
    ns.tprint("Usage: run buy-server-cost.js [RAM]"); 
    return; 
  }
  const size = ns.args[0];
  
  ns.tprint(ns.formatNumber(ns.getPurchasedServerCost(size)));
}