/** @param {NS} ns **/
export async function main(ns) {
  if (ns.args.length != 1) {
    ns.tprintf("There aren't enough arguments!");
    ns.tprintf("Usage: run remove-folder-from-all.js [folder]")
    return;
  }

  const folder = ns.args[0];
  const files = ns.ls('home').filter(file => file.startsWith(folder));
  const listOfServers = "HackedServers.json";
  let serverCounter = 0;

  if (!files.length) { ns.tprintf("Folder doesn't exist!"); return; }

  // Parse the list of servers into string
  const servers = JSON.parse(ns.read(listOfServers));

  // Iterate through list of servers
  for (let i = 0; i < servers.total; ++i) {
    const hostname = servers.info[i].hostname;

    if (hostname == "home") { ns.tprintf("Ignoring home"); continue; }

    // Manual rm -r because ns.rm doesn't take in string[]
    for (let j = 0; j < files.length; ++j) ns.rm(files[j], hostname);
    ++serverCounter;
  }

  ns.tprintf("Removal complete!");
  ns.tprintf("Total Number of Servers rm'd: " + serverCounter);
}