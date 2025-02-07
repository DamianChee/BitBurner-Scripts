/** @param {NS} ns **/
export async function main(ns) {
  if (ns.args.length != 1) {
    ns.tprintf("There aren't enough arguments!");
    ns.tprintf("Usage: run deploy-scripts-to-all.js [folder]")
    return;
  }

  const folder = ns.args[0];
  const files = ns.ls('home').filter(file => file.startsWith(folder));
  const serversToServeFiles = "HackedServers.json";
  let serverCounter = 0;

  if (!files.length) { ns.tprintf("Folder doesn't exist!"); return; }

  // Parse the list of servers into string
  const servers = JSON.parse(ns.read(serversToServeFiles));

  // Iterate through list of servers
  for (let i = 0; i < servers.info.length; ++i) {
    const hostname = servers.info[i].hostname;
    if (hostname == "home") { ns.tprintf("Skipping home"); continue; }

    ns.scp(files, hostname);
    ++serverCounter;
  }

  ns.tprintf("Deployment complete!");
  ns.tprintf("Total Number of Servers served: " + serverCounter);
}
