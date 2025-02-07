/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("sleep");
  if (ns.args.length < 1) {
    ns.tprint("Please give me a target...");
    ns.tprint("Usage: run prepper.js [hostname]");
  }

  if (!ns.serverExists(ns.args[0])) {
    ns.tprint(ns.args[0] + " does not exist...");
    ns.tprint("Please give me a VALID target...");
    ns.tprint("Usage: run prepper.js [hostname]");
  }

  // Variables
  const hostname = ns.args[0];
  let pid = 0;
  const thisServer = ns.getHostname();
  let ramAvailable = ns.getServerMaxRam(thisServer) - ns.getServerUsedRam(thisServer);
  const threadSize = 1.75;
  const maxThreads = Math.floor((ramAvailable - 16) / threadSize);

  while (ns.getServerMaxRam(thisServer) > 4) {
    if (ns.getServerMinSecurityLevel(hostname) < ns.getServerSecurityLevel(hostname)) {
      pid = ns.run("scripts-v2/weaken.js", maxThreads, hostname);
    }
    else if (ns.getServerMoneyAvailable(hostname) < ns.getServerMaxMoney(hostname)) {
      pid = ns.run("scripts-v2/grow.js", maxThreads, hostname);
    }
    else {
      ns.tprintf(thisServer + " has prepped " + hostname);
      ns.exit();
    }
    while (ns.isRunning(pid)) await ns.sleep(100);
  }
}
