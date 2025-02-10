/** @param {NS} ns */
export async function main(ns) {
  if (ns.args.length != 2) { 
    ns.tprint("Missing Arguments!"); 
    ns.tprint("Usage: run upgrade-server-cost.js [target] [RAM]"); 
    return; 
  }
  if (ns.args[1] !== parseInt(ns.args[1], 10)) {
    ns.tprint("Incorrect Arguments! Second argument isn't a number!"); 
    ns.tprint("Usage: run upgrade-server-cost.js [target] [RAM]"); 
    return; 
  }
  
  const target = ns.args[0];
  const size = ns.args[1];
  
  ns.tprint(ns.formatNumber(ns.getPurchasedServerUpgradeCost(target, size)));
}