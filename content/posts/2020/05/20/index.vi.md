---
title: "Pin không sạc đầy"
date: 2020-05-20
tags: [ "Linux", "Battery" ]
---

Ở đây các bạn cần phân biệt với chai pin nhé!

Chai pin là khi sạc đạt 100% nhưng nó không đạt được như thiết kế của nhà sản xuất, các bạn có thể chạy thử lệnh sau để kiểm tra nhé:

```shell
sudo tlp-stat -b
```

Ví dụ output hiện tại của mình như sau:

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

Ở đây theo thiết kế thì pin của mình đạt 45000 mWh nhưng hiện tại khi sạc đến 100% thì chỉ được 38280 mWh thôi, ở phần dưới cùng tlp-stat có tổng kết lại cho mình là pin của mình đã chai đi khoảng 14.9% so với ban đầu rồi (mình thấy cũng bình thường thôi, tại mình dùng được 1 năm rồi, và thời gian cũng có chơi game nhiều, khá là nóng máy).

Đó là chai pin, trường hợp của mình thì thấy vẫn ổn, nhưng nếu chai đến tận 90% rồi chẳng hạn thì chỉ có cách là thay pin mới khắc phục được thôi. Mà pin thiết kế ra là... cũng để chai thôi mà :v

Sau đây là trường hợp mình muốn nói với các bạn: Pin chỉ sạc đến một khoảng nào đó rồi ngừng, không sạc tiếp. Trường hợp này nếu tầm 90-95% là bình thường, vì một số máy thiết kế chỉ đạt đến mức đó thôi là ngừng rồi. Tuy nhiên nếu chỉ tầm 60% hay 80% (trường hợp mình gặp là 79%) thì là "bất thường" rồi. Mình không biết nguyên nhân nhưng khắc phục như sau:

```shell
sudo tlp fullcharge
```

Chúc các bạn thành công và có một viên pin đi cùng chiếc máy :)))
