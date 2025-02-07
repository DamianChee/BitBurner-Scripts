/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("sleep");
  if (ns.args.length != 1) {
    ns.tprint("Please give me a target...");
    ns.tprint("Usage: run manager.js [server]");
  }

  if(!ns.serverExists(ns.args[0])) {
    ns.tprint(ns.args[0] + " does not exist...");
    ns.tprint("Please give me a VALID target...");
    ns.tprint("Usage: run manager.js [server]");
  }

  // Variables
  const thisServer = ns.getHostname();
  const folder = "scripts-v2";
  const target = ns.args[0];
  let pid = 0;
  let ramAvailable = ns.getServerMaxRam(thisServer) - ns.getServerUsedRam(thisServer);

  let ramPerThreadWeaken = 1.75;
  let ramPerThreadGrow = 1.75;
  let ramPerThreadHack = 1.7;

  let threadsWeakening = Math.floor(ramAvailable / ramPerThreadWeaken);
  let threadsGrowing = Math.floor(ramAvailable / ramPerThreadGrow);
  let threadsHacking = Math.floor(ramAvailable / ramPerThreadHack);

  while (ns.getServerMaxRam(thisServer) > 4) {
    if (ns.getServerMinSecurityLevel(target) + 5 < ns.getServerSecurityLevel(target)) {
      pid = ns.run(folder + "/weaken.js", threadsWeakening, target);
    }
    else if (ns.getServerMoneyAvailable(target) < ns.getServerMaxMoney(target) * 0.9) {
      pid = ns.run(folder + "/grow.js", threadsGrowing, target);
    }
    else {
      pid = ns.run(folder + "/hack.js", threadsHacking, target);
    }
    while (ns.isRunning(pid)) await ns.sleep(100);
  }
}
