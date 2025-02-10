/** @param {NS} ns **/
export async function main(ns) {
  if (ns.args.length != 2) {
    ns.tprintf("There aren't enough arguments!");
    ns.tprintf("Usage: run deploy-scripts-to-target [folder] [target]")
    return;
  }

  const folder = ns.args[0];
  const target = ns.args[1];
  const files = ns.ls('home').filter(file => file.startsWith(folder));

  if (target == "home") { ns.tprintf("Ignoring 'home'"); return; }
  if (!ns.serverExists(target)) { ns.tprintf("Server '" + target + "' doesn't exist!"); return; }
  if (!files.length) { ns.tprintf("Folder doesn't exist!"); return; }

  ns.scp(files, target);
  ns.tprintf("Deployment complete!");
}