/** @param {NS} ns */
export async function main(ns) {
  if (ns.args.length != 2) { 
    ns.tprint("Wrong arguments!");
    ns.tprint("Usage: run upgrade-server.js [hostname] [RAM]");
    return; 
  }
  const hostname = ns.args[0];
  const ram = ns.args[1];
  const result = ns.upgradePurchasedServer(hostname, ram);
  if (!result) ns.tprint("You either don't have enough money or entered the wrong amount of RAM");
  ns.tprint(hostname + " server upgraded!");
}
