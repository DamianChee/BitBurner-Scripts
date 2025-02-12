/** @param {NS} ns **/
export async function main(ns) {
  if (!ns.args.length >= 1) {
    ns.tprintf("There aren't enough arguments!");
    ns.tprintf("Usage: run run-all-servers.js [filename]")
    return;
  }

  const file = ns.args[0];
  const target = ns.args[1];
  const listOfServers = "HackedServers.json";
  const servers = JSON.parse(ns.read(listOfServers));
  // let atlas = servers.filter(val => val.includes("Atlas"));
  let serverCounter = 0;

  // Iterate through list of servers
  for (let i = 0; i < servers.total; ++i) {
    const hostname = servers.info[i].hostname;

    if (ns.fileExists(file, hostname)) {
      ns.exec(file, hostname, 1, target);
      ns.tprintf(++serverCounter + ": " + hostname + " started " + "'" + file + "'");
    } else {
      ns.tprintf(++serverCounter + ": " + hostname + " does not have " + "'" + file + "'");
    }
  }

  ns.tprintf("Run completed!");
  ns.tprintf("Total Number of Servers running: " + serverCounter);
}