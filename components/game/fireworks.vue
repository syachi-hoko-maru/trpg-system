<template>
    <v-card>
        <canvas id="fireworks" :width="width" :height="height" />
        <v-icon :icon="sound ? 'mdi-volume-high' : 'mdi-volume-off'" size="x-large" class="ma-2" @click="toggleSound" />
    </v-card>
</template>

<script setup lang="ts">
// canvas初期設定
const width = 900
const height = width * 2 / 3
const canvas: Ref<HTMLCanvasElement | null> = ref(null)
const ctx: Ref<CanvasRenderingContext2D | null> = ref(null)

// 音関連
const sound: Ref<boolean> = ref(false)
const soundArr: HTMLAudioElement[] = []

let soundIndex = 0
const soundCount = 5
const toggleSound = () => {
    if (!soundArr.length) {
        for (let i = 0; i < soundCount; i++) {
            soundArr.push(new Audio('/trpg-system/sound/fireworks.mp3'))
        }
    }
    sound.value = !sound.value
}
const playSound = () => {
    soundArr[soundIndex % soundArr.length].play()
    soundIndex++
}
// 音関連ここまで

/** 重力加速度的なの */
const g = 0.03

let lightArr: Light[] = []
let particleArr: Ball[] = []
let timeCount = 0
let fireballCount = 0

class Light {
    x: number
    y: number
    size: number
    color: string
    maxlife: number
    life: number
    startlife: number = 0
    constructor(x: number, y: number, size: number, color: string, life: number, maxlife?: number, startlife = 0) {
        this.x = Math.floor(x * 100) / 100
        this.y = Math.floor(y * 100) / 100
        this.size = size
        this.color = color
        this.life = life
        this.maxlife = maxlife ? maxlife : life
        this.startlife = startlife
    }
    draw = (ctx: CanvasRenderingContext2D) => {
        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
            this.life = 0
            return
        }
        const alpha = Math.floor((this.life * 2 > this.maxlife ? 1 : this.life * 2 / this.maxlife) * 10) / 10
        if (alpha < 0.1) {
            this.life = 0
            return
        }
        ctx.save()
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.globalAlpha = alpha
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        ctx.restore()
        this.life--
    }
}

type BurstFunction = (x: number, y: number) => void

class Particle {
    x: number
    y: number
    vx: number
    vy: number
    size = 6
    color: string | null
    maxlife: number
    life: number
    burst: BurstFunction | null
    startlife: number = 0
    constructor(x: number, y: number, vx: number, vy: number, color: string | null, life: number, burst: BurstFunction | null, startlife = 0) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
        this.color = color
        this.life = Math.floor(life)
        this.maxlife = Math.floor(life)
        this.burst = burst
        this.startlife = Math.floor(startlife)
    }
    move = () => {
        this.vy = this.vy + g
        this.x = this.x + this.vx
        this.y = this.y + this.vy
        this.life--
        if (this.burst && this.life <= 0) {
            this.burst(this.x, this.y)
            this.life = 0
            return
        }
        if (this.y < 0 || this.y > height) {
            this.life = 0
            return
        }
        if ((this.x < 0 || this.x > width) && !this.burst) {
            this.life = 0
            return
        }
        if (this.color) {
            lightArr.push(new Light(this.x, this.y, 2, this.color, Math.floor(this.life * 2 / 3), this.maxlife, this.startlife))
        }
    }
}
class Ball extends Particle {
    constructor(x: number, vy: number, life: number, burst: BurstFunction) {
        super(x, height, 0, vy, "#e8d7b5", life, burst)
    }
    move = () => {
        this.vx = this.vx + (this.x < width / 20 ? 0.5 : this.x > width * 19 / 20 ? -0.5 : (Math.random() - 0.5)) * 0.05
        this.vy = this.vy + g
        this.x = this.x + this.vx
        this.y = this.y + this.vy
        this.life--
        if (this.burst && (this.life <= 0 || this.vy > -0.5)) {
            if (lightArr.length < 10 ** 5) {
                this.burst(this.x, this.y)
                if (sound.value) {
                    playSound()
                    console.log("sound!")
                }
                this.life = 0
                return
            } else {
                this.life = 1
                return
            }
        }
        if (this.y > height || this.y < 0) {
            this.life = 0
            return
        }
        if (this.color) {
            lightArr.unshift(new Light(this.x, this.y, 2, this.color, 7))
        }
    }

    static launch = (burst: BurstFunction) => {
        const xPadding = 20
        particleArr.push(new Ball(Math.random() * (width - xPadding * 2) + xPadding, -4.5 + (Math.random() - 0.5), Math.random() * 500 + 500, burst))
    }
}

// 色関連
const colorList = [
    // オレンジ
    "#fabe48",
    "#ff3e29",
    // 赤
    "#ff4f58",
    // ピンク
    "#ff00ff",
    "#eba7da",
    "#f564a8",
    // 紫
    "#7b28e0",
    // 水色
    "#68adf7",
    // うす緑色
    "#7ec480",
    // 黄色
    "#f4f78d"
]
const getColor = () => colorList[Math.floor(Math.random() * colorList.length)]
const getColors = (count: number): string[] => {
    if (count >= colorList.length) return colorList
    const colors: string[] = []
    for (let i = 0; i < count; i++) {
        let color = getColor()
        while (colors.indexOf(color) !== -1) {
            color = getColor()
        }
        colors.push(color)
    }
    return colors
}

const big: BurstFunction = (x: number, y: number) => {
    const [color1, color2, color3] = getColors(3)
    for (let i = 0; i < 20; i++) {
        const rad = (i % 20) / 20 * Math.PI * 2
        const v = 3
        particleArr.push(new Particle(x, y, Math.cos(rad) * v, Math.sin(rad) * v, color1, 150 + 20 * Math.random(), null))
    }
    for (let i = 0; i < 15; i++) {
        const rad = (i % 15) / 15 * Math.PI * 2
        const v = 2.8
        particleArr.push(new Particle(x, y, Math.cos(rad) * v, Math.sin(rad) * v, color2, 120 + 20 * Math.random(), null, 20))
    }
    particleArr.push(new Particle(x, y, 0, 0, null, 20, (x, y) => {
        for (let i = 0; i < 30; i++) {
            const rad = (i % 30) / 30 * Math.PI * 2
            const v = 2
            particleArr.push(new Particle(x, y, Math.cos(rad) * v, Math.sin(rad) * v, color3, 80 + 20 * Math.random(), null, 70))
        }
    }))
    // 散るところ
    const countInGroup = 12
    for (let i = 0; i < countInGroup * 5; i++) {
        const group = Math.floor(i / countInGroup)
        const rad = Math.PI * 2 * (i % countInGroup + (group % 2) / 2) / countInGroup
        const v = 3
        particleArr.push(new Particle(x, y, Math.cos(rad) * v, Math.sin(rad) * v, null, [70, 80, 90, 100, 110][group], (x, y) => {
            for (let i = 0; i < 20; i++) {
                const rad = Math.random() * Math.PI * 2
                const v = 3 + 0.2 * group
                particleArr.push(new Particle(x, y, Math.cos(rad) * v, Math.sin(rad) * v, i % 2 ? color1 : color2, 25 - group * 2, null))
            }

        }))
    }
}
const chiruno: BurstFunction = (x: number, y: number) => {
    for (let i = 0; i < 45; i++) {
        const rad = Math.random() * Math.PI * 2
        const v = Math.floor((5 + 15 * i / 45) * 10) / 10
        particleArr.push(new Particle(x, y, Math.cos(rad) * v, Math.sin(rad) * v, null, 10, (x, y) => {
            for (let i = 0; i < 10; i++) {
                const rad = Math.random() * Math.PI * 2
                const v = 3
                particleArr.push(new Particle(x, y, Math.cos(rad) * v, Math.sin(rad) * v, "#ffebc4", 15, null))
            }

        }))
    }
}
const twoColor: BurstFunction = (x: number, y: number) => {
    const [color1, color2] = getColors(2)
    for (let i = 0; i < 20; i++) {
        const group = Math.floor(i / 10)
        const rad = Math.PI * 2 * ((i % 10) / 10 + group / 20)
        const v1 = 4.5
        const v2 = 1.5
        particleArr.push(new Particle(x, y, Math.cos(rad) * v1, Math.sin(rad) * v1, null, 23, (x, y) => {
            particleArr.push(new Particle(x, y, Math.cos(rad) * v2, Math.sin(rad) * v2, group ? color1 : color2, 60, null))
        }))
    }
    for (let i = 0; i < 20; i++) {
        const group = Math.floor(i / 10)
        const rad = Math.PI * 2 * ((i % 10) / 10 + group / 20)
        const v1 = 1
        const v2 = 2.5
        particleArr.push(new Particle(x, y, Math.cos(rad) * v1, Math.sin(rad) * v1, null, 15, (x, y) => {
            particleArr.push(new Particle(x, y, Math.cos(rad) * v2, Math.sin(rad) * v2, group ? color2 : color1, 60, null))
        }))
    }
}
const twoColorBig: BurstFunction = (x: number, y: number) => {
    const [color1, color2] = getColors(2)
    for (let i = 0; i < 20; i++) {
        const group = Math.floor(i / 10)
        const rad = Math.PI * 2 * ((i % 10) / 10 + group / 20)
        const v1 = 4.5
        const v2 = 1.5
        particleArr.push(new Particle(x, y, Math.cos(rad) * v1, Math.sin(rad) * v1, null, 35, (x, y) => {
            particleArr.push(new Particle(x, y, Math.cos(rad) * v2, Math.sin(rad) * v2, group ? color2 : color1, 60, null))
        }))
    }
    for (let i = 0; i < 20; i++) {
        const group = Math.floor(i / 10)
        const rad = Math.PI * 2 * ((i % 10) / 10 + group / 20)
        const v1 = 4.5
        const v2 = 1.5
        particleArr.push(new Particle(x, y, Math.cos(rad) * v1, Math.sin(rad) * v1, null, 23, (x, y) => {
            particleArr.push(new Particle(x, y, Math.cos(rad) * v2, Math.sin(rad) * v2, group ? color1 : color2, 60, null))
        }))
    }
    for (let i = 0; i < 20; i++) {
        const group = Math.floor(i / 10)
        const rad = Math.PI * 2 * ((i % 10) / 10 + group / 20)
        const v1 = 1
        const v2 = 2.5
        particleArr.push(new Particle(x, y, Math.cos(rad) * v1, Math.sin(rad) * v1, null, 15, (x, y) => {
            particleArr.push(new Particle(x, y, Math.cos(rad) * v2, Math.sin(rad) * v2, group ? color2 : color1, 60, null))
        }))
    }
}
const three: BurstFunction = (x: number, y: number) => {
    const colors = getColors(3)
    for (let i = 0; i < 60; i++) {
        const group = Math.floor(i / 20)
        const rad = Math.PI * 2 * ((i % 20) + (group % 2) / 2) / 20
        const v1 = 1 + group * 1.5
        const v2 = 2.5 - group / 4
        particleArr.push(new Particle(x, y, Math.cos(rad) * v1, Math.sin(rad) * v1, null, 10 + group * 6, (x, y) => {
            particleArr.push(new Particle(x, y, Math.cos(rad) * v2, Math.sin(rad) * v2, colors[group], 80 + group * 3, null))
        }))
    }
}

const four: BurstFunction = (x: number, y: number) => {
    const colors = getColors(4)
    for (let i = 0; i < 80; i++) {
        const group = Math.floor(i / 20)
        const rad = Math.PI * 2 * ((i % 20) + (group % 2) / 2) / 20
        const v1 = 1 + group * 1.5
        const v2 = 2.5 - group / 4
        particleArr.push(new Particle(x, y, Math.cos(rad) * v1, Math.sin(rad) * v1, null, 10 + group * 6, (x, y) => {
            particleArr.push(new Particle(x, y, Math.cos(rad) * v2, Math.sin(rad) * v2, colors[group], 80 + group * 3, null))
        }))
    }
}


type Program = {
    fireworks: BurstFunction[][]
    interval: number
    count: number
}
const rest = (count: number): Program => ({ fireworks: [], interval: count, count: 1 })
const program: Program[] = [
    // { fireworks: [[three], [three]], interval: 5, count: 6 },
    { fireworks: [[twoColor], [twoColor], [twoColor], [three]], interval: 3, count: 6 },
    rest(5),
    { fireworks: [[twoColor, twoColor], [twoColor, three], [three], [twoColorBig]], interval: 5, count: 6 },
    rest(5),
    { fireworks: [[twoColor, twoColor, twoColor], [twoColor, three], [three, three], [twoColorBig, twoColorBig], [twoColorBig, three]], interval: 5, count: 6 },
    rest(5),
    { fireworks: [[big], [four]], interval: 4, count: 3 },
    rest(5),
    { fireworks: [[chiruno, chiruno, chiruno, chiruno]], interval: 3, count: 1 },
    rest(5),
    { fireworks: [[big, chiruno, chiruno, chiruno, chiruno], [four, chiruno, chiruno, chiruno, chiruno], [chiruno, chiruno, chiruno, chiruno]], interval: 3, count: 6 },
    { fireworks: [[chiruno, chiruno, chiruno, chiruno]], interval: 3, count: 1 },
    rest(10),
    { fireworks: [[twoColor]], interval: 0, count: 1 },
]
const programArr: (BurstFunction[] | null)[] = []
program.forEach(p => {
    let i = 0
    while (i < p.count) {
        // 花火を入れる
        if (p.fireworks.length) {
            programArr.push(p.fireworks[Math.floor(Math.random() * p.fireworks.length)])
        }
        // intervalだけnullを入れる
        let j = 0
        while (j < p.interval) {
            programArr.push(null)
            j++
        }
        i++
    }
})

const mainLoop = () => {
    timeCount++
    // 花火が多すぎなければ打ち上げを行う
    if (lightArr.length < 10 ** 2 && timeCount % 20 === 0) {
        const fireworks = programArr[fireballCount]
        fireworks?.forEach(burstFunction => {
            Ball.launch(burstFunction)
        })
        fireballCount++
        if (fireballCount >= programArr.length) {
            fireballCount = 0
        }
    }
    // ボールの移動と発光
    particleArr.forEach(ball => {
        ball.move()
    })
    // ボールの整理
    particleArr = particleArr.filter(({ life }) => life > 0)

    if (timeCount % 100 === 0) {
        console.log(particleArr.length, lightArr.length)
    }

    setTimeout(mainLoop, 20)
}

let drawing = false
const drawLoop = () => {
    setTimeout(drawLoop, 20)
    if (drawing) {
        console.log("skip draw")
        return
    }
    drawing = true
    // クリア
    if (ctx.value) {
        ctx.value.rect(0, 0, width, height)
        ctx.value.fillStyle = "#333";
        ctx.value.fill()
    }
    // 光源の描写
    lightArr.forEach(light => {
        if (ctx.value) {
            light.draw(ctx.value)
        }
    })
    // 光源の整理
    lightArr = lightArr.filter(({ life }) => life > 0)
    drawing = false
}

const main = () => {
    console.log("start")
    mainLoop()
    drawLoop()
}

onMounted(() => {
    try {
        canvas.value = document.getElementById("fireworks") as HTMLCanvasElement
        ctx.value = canvas.value?.getContext("2d");
        main()
    } catch (e) {
        console.error(e)
    }
})
</script>

<style lang="scss">
canvas#fireworks {
    display: block;
    margin: 0 auto;
    width: 100%;
    aspect-ratio: 3 / 2;
}
</style>