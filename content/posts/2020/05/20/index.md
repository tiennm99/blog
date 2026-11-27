---
title: "Battery Not Charging to Full"
date: 2020-05-20
tags: [ "Linux", "Battery" ]
---

First, make sure not to confuse this with battery wear!

Battery wear is when your battery charges to 100%, but its actual full capacity no longer reaches the manufacturer's original design capacity. You can run the following command to check:

```shell
sudo tlp-stat -b
```

For example, here is my current output:

```shell
---TLP 1.3.1 --------------------------------------------
---Battery Features: Charge Thresholds and Recalibrate
natacpi = active (data, thresholds)
tpacpi-bat = active (recalibrate)
tp-smapi = inactive (ThinkPad not supported)
---ThinkPad Battery Status: BAT0 (Main / Internal)
/sys/class/power_supply/BAT0/manufacturer = LGC
/sys/class/power_supply/BAT0/model_name = 01AV463
/sys/class/power_supply/BAT0/cycle_count = 90
/sys/class/power_supply/BAT0/energy_full_design = 45000 [mWh]
/sys/class/power_supply/BAT0/energy_full = 38280 [mWh]
/sys/class/power_supply/BAT0/energy_now = 38280 [mWh]
/sys/class/power_supply/BAT0/power_now = 0 [mW]
/sys/class/power_supply/BAT0/status = Full
/sys/class/power_supply/BAT0/charge_start_threshold = 96 [%]
/sys/class/power_supply/BAT0/charge_stop_threshold = 96 [%]
tpacpi-bat.BAT0.forceDischarge = 0
Charge = 100.0 [%]
Capacity = 85.1 [%]
```

Here, my battery's design capacity is 45000 mWh, but right now when it charges to 100%, it only reaches 38280 mWh. At the bottom, `tlp-stat` summarizes that my battery has worn down by about 14.9% compared to when it was new (which I think is pretty normal, since I've been using it for a year and played quite a lot of games, which got the laptop pretty hot).

That's battery wear. In my case, it's still fine, though if it ever wears down by, say, 90%, the only fix is to replace the battery. Then again, batteries are designed to... eventually wear out anyway :v

Now here is the actual issue I want to talk about: the battery only charges up to a certain percentage and then stops, refusing to charge any further. If it stops around 90–95%, that's normal, because some laptops are designed to stop charging around that level. However, if it stops around 60% or 80% (in my case, it stopped at 79%), then something is "abnormal". I don't know the exact cause, but here is how to fix it:

```shell
sudo tlp fullcharge
```

Good luck, and may your battery live a long life alongside your laptop :)))
