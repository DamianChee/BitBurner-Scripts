/** @param {NS} ns */
export async function main(ns) {
  if (ns.args.length != 1) {
    ns.tprintf("Missing arguments!");
    ns.tprintf("Usage: run master-crack-handler.js [folder]");
    return;
  }

  // variables needed from args
  // - folder to copy over
  const folder = ns.args[0];

  // 1. scan
  ns.tprintf("========== 1. Scan ==========");
  ns.run("scanner.js");
  await ns.sleep(100);
  // 2. run crack-all-servers
  ns.tprintf("========== 2. Run Crack ==========");
  ns.run("crack-all-servers.js");
  await ns.sleep(100);
  // 3. copy-folder-to-target
  ns.tprintf("========== 3. Deploy scripts ==========");
  ns.run("deploy-scripts-to-all.js", 1, folder);
  await ns.sleep(100);
  // 4. scan
  ns.tprintf("========== 4. Scan again ==========");
  ns.run("scanner.js");
  await ns.sleep(100);
  // Message for sanity
  ns.tprintf("All possible servers are cracked!");
}