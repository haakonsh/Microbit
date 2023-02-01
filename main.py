def on_pulsed_p15_low():
    global y
    led.unplot(x, y)
    y += 1
    led.plot(x, y)
pins.on_pulsed(DigitalPin.P15, PulseValue.LOW, on_pulsed_p15_low)

def on_pulsed_p14_low():
    global x
    led.unplot(x, y)
    x += 1
    led.plot(x, y)
pins.on_pulsed(DigitalPin.P14, PulseValue.LOW, on_pulsed_p14_low)

def on_pulsed_p12_low():
    global x
    led.unplot(x, y)
    x += -1
    led.plot(x, y)
pins.on_pulsed(DigitalPin.P12, PulseValue.LOW, on_pulsed_p12_low)

def on_pulsed_p13_low():
    global y
    led.unplot(x, y)
    y += -1
    led.plot(x, y)
pins.on_pulsed(DigitalPin.P13, PulseValue.LOW, on_pulsed_p13_low)

y = 0
x = 0
x = 2
y = 2
led.plot(x, y)

def on_forever():
    global x, y
    basic.pause(100)
    led.unplot(x, y)
    if pins.analog_read_pin(AnalogPin.P1) >= 768:
        x += 1
    if pins.analog_read_pin(AnalogPin.P1) <= 255:
        x += -1
    if pins.analog_read_pin(AnalogPin.P2) >= 768:
        y += -1
    if pins.analog_read_pin(AnalogPin.P2) <= 255:
        y += 1
    if x < 0:
        x = 0
    if x >= 4:
        x = 4
    if y < 0:
        y = 0
    if y >= 4:
        y = 4
    led.plot(x, y)
basic.forever(on_forever)
