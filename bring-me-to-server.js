/** @param {NS} ns */
export async function main(ns) {
  if (ns.args.length != 1) {
    ns.tprintf("Argument error!");
    ns.tprintf("Usage: run bring-me-to-server.js [target]");
    return;
  }
  if (!ns.serverExists(ns.args[0])) {
    ns.tprintf("Server does not exist!");
    ns.tprintf("Usage: run bring-me-to-server.js [target]");
    return;
  }

  let target = ns.args[0];
  let servers = [ns.args[0]];
  let commandString = "";

  while (target != "home") {
    servers.push(ns.scan(target)[0]);
    target = ns.scan(target)[0];
  }

  servers.reverse();
  
  for (let i = 1; i < servers.length; ++i) {
    commandString += `connect ${servers[i]}; `;
  }

  ns.tprintf(`${commandString}`);

  // findServer(ns, servers, "home", target);
}

// Old function used because I didn't know
// THE SERVERS RETURN IN A SPECIFIC ORDER AND THE FIRST ELEMENT
// OF ALL SCANS EVENTUALLY ALWAYS LEAD BACK TO HOME!
/** @param {NS} ns */
// export function findServer(ns, servers, head, target) {
//   let tails = ns.scan(head).filter(val => !servers.includes(val));

//   for (const newServer of tails) {
//     if (newServer != target) {
//       servers.push(newServer);
//       findServer(ns, servers, newServer, target);
//       servers.pop();
//     } else {
//       servers.push(newServer);
//       for (let i = 0; i < servers.length; ++i) {
//         ns.tprintf(` ${Array(i).join("|   ")}|-> ${servers[i]}`);
//       }
//     }
//   }
// }