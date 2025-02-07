/** @param {NS} ns */
export async function main(ns) {
  ns.disableLog("ALL");
  await ns.sleep(1);
  const job = JSON.parse(ns.args[1]);
	let delay = job.end - job.time - Date.now();
  if (delay < 0) {
		ns.printf(`WARN: Hack job ${ns.pid} was ${-delay}ms late. (${job.end})\n`);
		delay = 0;
	}
  await ns.weaken(ns.args[0], { additionalMsec: delay });

  ns.atExit(() => {
    const date = new Date();
    ns.printf(ns.pid + `: Weaken completed at ${date.toLocaleTimeString() + " " + date.getMilliseconds()}`);
  });
}
