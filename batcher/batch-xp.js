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

  while (true) {
    const ramAvailable = ns.getServerMaxRam(thisServer) - ns.getServerUsedRam(thisServer) - 8; // reserving 32gb for myself
    if (ramAvailable > 0) {
      const gTime = ns.getGrowTime(target); // Time it takes to grow
      const gEndTime1 = Date.now() + gTime;
      const ms3 = { "end": gEndTime1, "time": gTime };

      ns.run("batcher/grow.js", 20, target, JSON.stringify(ms3));

      ns.clearLog();
      ns.printf(`Running exp farm: ETA per grow ${ns.tFormat(gEndTime1 - Date.now())}`);
    }

    await ns.sleep(20);
  }
}
