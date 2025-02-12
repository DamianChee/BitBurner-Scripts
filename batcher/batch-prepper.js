/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("ALL");
  if (ns.args.length != 1) {
    ns.tprint("Please give me a target...");
    ns.tprint("Usage: run batch-prepper.js [server]");
  }

  if (!ns.serverExists(ns.args[0])) {
    ns.tprint(ns.args[0] + " does not exist...");
    ns.tprint("Please give me a VALID target...");
    ns.tprint("Usage: run batch-prepper.js [server]");
  }

  // Variables
  const thisServer = ns.getHostname();
  const target = ns.args[0];
  const minSec = ns.getServerMinSecurityLevel(target);
  const maxMoney = ns.getServerMaxMoney(target);

  while (true) {
    const currentSecurity = ns.getServerSecurityLevel(target);
    const currentMoney = ns.getServerMoneyAvailable(target);
    if (currentSecurity == minSec && currentMoney == maxMoney) {
      ns.tprint(`${thisServer} has prepped ${target}!`);
      ns.scriptKill("batcher/weaken.js", thisServer);
      ns.scriptKill("batcher/grow.js", thisServer);
      return;
    }

    const ramAvailable = ns.getServerMaxRam(thisServer) - ns.getServerUsedRam(thisServer) - 8;

    if (ramAvailable > 0) {
      const spacer = 5; // The number of milliseconds between each job finishing.

      const wTime = ns.getWeakenTime(target); // Time it takes to weaken
      const gTime = ns.getGrowTime(target); // Time it takes to grow

      // Number of threads to use!
      const weakSec = 0.05; // precalculated elsewhere this magic number seems always consistent
      const growSec = ns.growthAnalyzeSecurity(1, target, 5);

      const gThreads = Math.floor((weakSec / growSec) / 2)

      // HWGW spacing used to end them one after another
      const wEndTime1 = Date.now() + wTime + spacer * 0 + 100;
      const gEndTime1 = Date.now() + wTime + spacer * 1 + 100;

      // Things to pass to each worker
      const ms2 = { "end": wEndTime1, "time": wTime };
      const ms3 = { "end": gEndTime1, "time": gTime };

      ns.run("batcher/weaken.js", 1, target, JSON.stringify(ms2));
      if (gThreads == Infinity) continue;
      ns.run("batcher/grow.js", gThreads > 0 ? gThreads : 1, target, JSON.stringify(ms3));

      ns.clearLog();
      ns.printf(`Running batch: ETA ${ns.tFormat(wEndTime1 - Date.now())}`);
      ns.printf(`Number of grow threads: ${gThreads}`);
    }
    await ns.sleep(100);
  }
}
