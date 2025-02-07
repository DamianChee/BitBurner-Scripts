An iteration of the early "brute force"-y method of giving each server their own manager that calls hack, grow, weaken scripts and telling each to run max threads based on RAM calculations on /themselves/ depending on the situation.

In version 2: I strove to instead make each server do the same but target a different server instead, so I can focus every server's "strength" into just ONE (1) vulnerable server, increasing the number of threads I can run against it.

Pros: 
- I have much more threads that repeatedly smash against just one server
- Completely drains a server if enough power is mustered and the server is low levelled enough
- Preps servers quickly
  
Cons:
- Each server manages themselves and doesn't communicate with each other
- Long periods of overlaps where several severs has already completely weakened the target but a few others are STILL trying to weaken it
- Completely drains a server if enough power is mustered and the server is low levelled enough (This causes the ratio of needing more threads to weaken and grow it back to full to take a while)
- Drains servers too quickly

This iteration was earning me roughly 20k-100k+ per second from n00dles (give or take my luck and the number of servers)
I can't remember the stats but I think I was mustering up to 700k+ with splitting up my targets after having a large number of hacked servers and purchased servers
Like joesguns, Phantasy, n00dles, etc.
