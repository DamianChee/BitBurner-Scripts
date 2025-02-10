/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("ALL");
  if (ns.args.length != 1) {
    ns.tprint("Please give me a target...");
    ns.tprint("Usage: run batch-controller.js [server]");
  }

  if (!ns.serverExists(ns.args[0])) {
    ns.tprint(ns.args[0] + " does not exist...");
    ns.tprint("Please give me a VALID target...");
    ns.tprint("Usage: run batch-controller.js [server]");
  }

  // Variables
  const thisServer = ns.getHostname();
  const target = ns.args[0];
  const hThreads = 1;

  while (true) {
    const ramAvailable = ns.getServerMaxRam(thisServer) - ns.getServerUsedRam(thisServer) - 8; // reserving 16gb for myself
    if (ramAvailable > 0) {
      const spacer = 5; // The number of milliseconds between each job finishing.

      const hTime = ns.getHackTime(target); // Time it takes to hack
      const wTime = ns.getWeakenTime(target); // Time it takes to weaken
      const gTime = ns.getGrowTime(target); // Time it takes to grow

      // Time taken
      ns.printf("Expected hack time: " + ns.tFormat(hTime));
      ns.printf("Expected weaken time: " + ns.tFormat(wTime));
      ns.printf("Expected grow time: " + ns.tFormat(gTime));

      // Number of threads to use!
      const hPercent = ns.hackAnalyze(target) * hThreads;
      const maxMoney = ns.getServerMaxMoney(target);
      const gThreads = Math.ceil(ns.growthAnalyze(target, maxMoney / (maxMoney - maxMoney * hPercent)));
      const wThreads1 = Math.max(Math.ceil(1 * 0.002 / 0.05), 1);
      const wThreads2 = Math.max(Math.ceil(gThreads * 0.004 / 0.05), 1);

      // HWGW spacing used to end them one after another
      const hEndTime1 = Date.now() + wTime + spacer * 0 + 100;
      const wEndTime1 = Date.now() + wTime + spacer * 1 + 100;
      const gEndTime1 = Date.now() + wTime + spacer * 2 + 100;
      const wEndTime2 = Date.now() + wTime + spacer * 3 + 100;

      // Things to pass to each worker
      const ms1 = { "end": hEndTime1, "time": hTime };
      const ms2 = { "end": wEndTime1, "time": wTime };
      const ms3 = { "end": gEndTime1, "time": gTime };
      const ms4 = { "end": wEndTime2, "time": wTime };

      ns.run("batcher/hack.js", hThreads, target, JSON.stringify(ms1));
      ns.run("batcher/weaken.js", wThreads1, target, JSON.stringify(ms2));
      ns.run("batcher/grow.js", gThreads ? gThreads : 1, target, JSON.stringify(ms3));
      ns.run("batcher/weaken.js", wThreads2, target, JSON.stringify(ms4));

      ns.clearLog();
      ns.printf(`Running batch: ETA ${ns.tFormat(wEndTime1 - Date.now())}`);
      ns.printf(`Number of grow threads: ${gThreads}`);
      ns.printf(`Number of weaken1 threads: ${wThreads1}`);
      ns.printf(`Number of weaken2 threads: ${wThreads2}`);
    }
    await ns.sleep(100);
  }
}
