function Spill_musikk () {
    music.playMelody("E F G A B C5 C5 C5 ", 600)
}
pins.onPulsed(DigitalPin.P15, PulseValue.Low, function () {
    led.unplot(pos_x, pos_y)
    pos_y += 1
    led.plot(pos_x, pos_y)
})
pins.onPulsed(DigitalPin.P14, PulseValue.Low, function () {
    led.unplot(pos_x, pos_y)
    pos_x += 1
    led.plot(pos_x, pos_y)
})
pins.onPulsed(DigitalPin.P12, PulseValue.Low, function () {
    led.unplot(pos_x, pos_y)
    pos_x += -1
    led.plot(pos_x, pos_y)
})
function Sjekk_om_posisjon_er_lik_mål () {
    if (pos_x == Mål_x && pos_y == Mål_y) {
        Traff_mål = true
    } else {
        Traff_mål = false
    }
}
pins.onPulsed(DigitalPin.P13, PulseValue.Low, function () {
    led.unplot(pos_x, pos_y)
    pos_y += -1
    led.plot(pos_x, pos_y)
})
function Sett_posisjon () {
    basic.pause(50)
    led.unplot(pos_x, pos_y)
    if (pins.analogReadPin(AnalogPin.P1) >= 768) {
        pos_x += 1
    }
    if (pins.analogReadPin(AnalogPin.P1) <= 255) {
        pos_x += -1
    }
    if (pins.analogReadPin(AnalogPin.P2) >= 768) {
        pos_y += -1
    }
    if (pins.analogReadPin(AnalogPin.P2) <= 255) {
        pos_y += 1
    }
    if (pos_x < 0) {
        pos_x = 4
    }
    if (pos_x >= 5) {
        pos_x = 0
    }
    if (pos_y < 0) {
        pos_y = 4
    }
    if (pos_y >= 5) {
        pos_y = 0
    }
    led.plot(pos_x, pos_y)
}
function Sett_et_nytt_mål () {
    Mål_x = randint(0, 4)
    Mål_y = randint(0, 4)
    if (pos_x == 2 && pos_y == 2) {
        Sett_et_nytt_mål()
    }
    led.plot(Mål_x, Mål_y)
}
let Mål_y = 0
let Mål_x = 0
let Traff_mål = false
let pos_y = 0
let pos_x = 0
basic.showString("Hei Ander!")
pins.setAudioPin(AnalogPin.P0)
Sett_et_nytt_mål()
pos_x = 2
pos_y = 2
led.plot(pos_x, pos_y)
Traff_mål = false
basic.forever(function () {
    Sett_posisjon()
    Sjekk_om_posisjon_er_lik_mål()
    if (Traff_mål) {
        led.unplot(Mål_x, Mål_y)
        Spill_musikk()
        Sett_et_nytt_mål()
        Traff_mål = false
    }
})
