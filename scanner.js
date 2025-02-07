/** @param {NS} ns */
export async function main(ns) {
  // variables
  let allServers = { "total": 0, "info": [] };
  let hackedServers = { "total": 0, "info": [] };
  let unhackedServers = { "total": 0, "info": [] };
  let backdoorRequiredServers = { "total": 0, "info": [] };
  let servers = ["home"];

  // Scan all servers possible and put "Server Object" into an array
  for (let i = 0; i < servers.length; i++) {
    for (let newServer of ns.scan(servers[i])) {
      if (!servers.includes(newServer) && newServer != "darkweb") {
        servers.push(newServer);

        const serverInfo = ns.getServer(newServer);

        // These are the information I want to save
        const temp = {
          hostname: serverInfo.hostname,
          requiredHackingSkill: serverInfo.requiredHackingSkill,
          hasAdminRights: serverInfo.hasAdminRights,
          backdoorInstalled: serverInfo.backdoorInstalled,
          numOpenPortsRequired: serverInfo.numOpenPortsRequired,
          openPortCount: serverInfo.openPortCount,
          maxRam: serverInfo.maxRam,
          minSecurity: serverInfo.minDifficulty,
          maxMoney: serverInfo.moneyMax,
          hackRatio: serverInfo.moneyMax / serverInfo.minDifficulty
        }

        // Place all temp info into allServers Object
        ++allServers.total;
        allServers.info.push(temp);

        // If server is already hacked
        if (temp.hasAdminRights) {
          ++hackedServers.total;
          hackedServers.info.push(temp);
        }

        // If server still needs backdoor and is hacked
        if (temp.hasAdminRights && !temp.backdoorInstalled && !temp.hostname.startsWith("Atlas")) {
          ++backdoorRequiredServers.total;
          backdoorRequiredServers.info.push(temp);
          ns.tprintf("Detected hacked server requiring backdoor: " + temp.hostname);
        }

        // If new server can be hacked but isn't
        if (temp.requiredHackingSkill <= ns.getHackingLevel() && !temp.hasAdminRights) {
          ++unhackedServers.total;
          unhackedServers.info.push(temp);
          ns.tprintf("Detected unhacked server: " + temp.hostname);
        }
      }
    }
  }

  if (unhackedServers.total) ns.tprintf("There is/are " + unhackedServers.total + " new servers to hack!");
  else ns.tprintf("There are no new servers for you to hack...");

  if (!backdoorRequiredServers.total) ns.tprintf("There are " + backdoorRequiredServers.total + " servers in need of backdoors");
  else ns.tprintf("There are no servers in need of backdoors");

  // Sort results according to required hacking skill
  allServers.info.sort((a, b) => a.requiredHackingSkill - b.requiredHackingSkill);
  hackedServers.info.sort((a, b) => b.maxRam - a.maxRam);

  ns.write("AllServers.json", JSON.stringify(allServers, null, "\t"), "w");
  ns.write("HackedServers.json", JSON.stringify(hackedServers, null, "\t"), "w");
  ns.write("UnhackedServers.json", JSON.stringify(unhackedServers, null, "\t"), "w");
  ns.write("BackdoorRequiredServers.json", JSON.stringify(backdoorRequiredServers, null, "\t"), "w");

  ns.tprintf("All servers scanned and saved to JSON!");
}
