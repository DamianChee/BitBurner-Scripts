/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("sleep");

  // Variables
  const target = ns.getHostname();
  const folder = "scripts-v1";
  let pid = 0;
  let ramAvailable = ns.getServerMaxRam(target) - ns.getServerUsedRam(target);

  let ramPerThreadWeaken = ns.getScriptRam(folder + "/weaken.js");
  let ramPerThreadGrow = ns.getScriptRam(folder + "/grow.js");
  let ramPerThreadHack = ns.getScriptRam(folder + "/hack.js");

  let threadsWeakening = Math.floor(ramAvailable / ramPerThreadWeaken);
  let threadsGrowing = Math.floor(ramAvailable / ramPerThreadGrow);
  let threadsHacking = Math.floor(ramAvailable / ramPerThreadHack);


  while (true) {
    if (ns.getServerMinSecurityLevel(target) + 5 < ns.getServerSecurityLevel(target)) {
      pid = ns.exec(folder + "/weaken.js", target, threadsWeakening, target);
    }
    else if (ns.getServerMoneyAvailable(target) < ns.getServerMaxMoney(target) * 0.9) {
      pid = ns.exec(folder + "/grow.js", target, threadsGrowing, target);
    }
    else {
      pid = ns.exec(folder + "/hack.js", target, threadsHacking, target);
    }
    while (ns.isRunning(pid)) await ns.sleep(100);
  }
}
