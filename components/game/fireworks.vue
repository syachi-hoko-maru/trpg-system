<template>
    <v-card>
        <canvas id="fireworks" :width="width" :height="height" />
    </v-card>
</template>

<script setup lang="ts">
const width = 900
const height = width * 2 / 3
const canvas: Ref<HTMLCanvasElement | null> = ref(null)
const ctx: Ref<CanvasRenderingContext2D | null> = ref(null)
const g = 0.03

let lightArr: Light[] = []
let particleArr: Ball[] = []
let timeCount = 0
let fireballCount = 0

// function* randomGen(): Generator<number> {
//     let rand = String(Math.floor(Math.random() * 10 ** 12))
//     let i = 0
//     while (true) {
//         let num = Number(rand.slice(i % 4, i % 4 + 3)) / 1000
//         yield num
//         console.log(num)
//         i++
//     }
//     return 0
// }
// const random: Generator<number, number, number> = randomGen()

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
            // console.log("burst!", this.x, this.y)
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
                console.log("burst!", this.x, this.y)
                this.burst(this.x, this.y)
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

const colorList = ["#fabe48", "#ff00ff", "#7b28e0", "#f564a8", "#68adf7", "#ff3e29"]
const getColor = () => colorList[Math.floor(Math.random() * colorList.length)]
const color: BurstFunction = (x: number, y: number) => {
    const color = getColor()
    for (let i = 0; i < 75; i++) {
        const rad = Math.random() * Math.PI * 2
        const v = Math.floor((2 + 0.3 * i / 75) * 10) / 10
        particleArr.push(new Particle(x, y, Math.cos(rad) * v, Math.sin(rad) * v, color, 50 + 20 * Math.random(), null))
    }
}
const flower: BurstFunction = (x: number, y: number) => {
    const color1 = getColor()
    let color2 = getColor()
    while (color2 === color1) {
        color2 = getColor()
    }
    for (let i = 0; i < 45; i++) {
        const rad = Math.random() * Math.PI * 2
        const v = Math.floor((2.5 + 0.3 * i / 45) * 10) / 10
        particleArr.push(new Particle(x, y, Math.cos(rad) * v, Math.sin(rad) * v, color1, 50 + 20 * Math.random(), null))
    }
    for (let i = 0; i < 45; i++) {
        const rad = Math.random() * Math.PI * 2
        const v = Math.floor((2 + 0.3 * i / 45) * 5) / 10
        particleArr.push(new Particle(x, y, Math.cos(rad) * v, Math.sin(rad) * v, color2, 60 + 20 * Math.random(), null, 30))
    }

}
const big: BurstFunction = (x: number, y: number) => {
    const color1 = getColor()
    let color2 = getColor()
    let color3 = getColor()
    while (color2 === color1) {
        color2 = getColor()
    }
    while (color3 === color1 || color3 === color2) {
        color3 = getColor()
    }
    for (let i = 0; i < 50; i++) {
        const rad = Math.random() * Math.PI * 2
        const v = 3
        particleArr.push(new Particle(x, y, Math.cos(rad) * v, Math.sin(rad) * v, color1, 150 + 20 * Math.random(), null))
    }
    for (let i = 0; i < 35; i++) {
        const rad = Math.random() * Math.PI * 2
        const v = 2.8
        particleArr.push(new Particle(x, y, Math.cos(rad) * v, Math.sin(rad) * v, color2, 120 + 20 * Math.random(), null, 20))
    }
    particleArr.push(new Particle(x, y, 0, 0, null, 20, (x, y) => {
        for (let i = 0; i < 30; i++) {
            const rad = Math.random() * Math.PI * 2
            const v = 2
            particleArr.push(new Particle(x, y, Math.cos(rad) * v, Math.sin(rad) * v, color3, 80 + 20 * Math.random(), null, 70))
        }
    }))
    for (let i = 0; i < 48; i++) {
        const rad = Math.PI * 2 * (i % 16) / 16
        const v = 2.8
        particleArr.push(new Particle(x, y, Math.cos(rad) * v, Math.sin(rad) * v, null, i / 16 < 1 ? 40 : i / 16 < 2 ? 60 : 80, (x, y) => {
            for (let i = 0; i < 10; i++) {
                const rad = Math.random() * Math.PI * 2
                const v = 3
                particleArr.push(new Particle(x, y, Math.cos(rad) * v, Math.sin(rad) * v, i % 2 ? color1 : color2, 25, null))
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

type Program = {
    fireworks: BurstFunction[][]
    interval: number
    count: number
}
const program: Program[] = [
    { fireworks: [[flower], [color, color]], interval: 3, count: 6 },
    { fireworks: [[flower, flower, color], [flower, color, color], [color, color, color, color]], interval: 5, count: 6 },
    { fireworks: [], interval: 15, count: 1 },
    { fireworks: [[flower, flower, color], [flower, color, color], [color, color, color, color]], interval: 5, count: 6 },
    { fireworks: [], interval: 10, count: 1 },
    { fireworks: [[big]], interval: 0, count: 1 },
    { fireworks: [], interval: 10, count: 1 },
    { fireworks: [[big]], interval: 8, count: 3 },
    { fireworks: [], interval: 10, count: 1 },
    { fireworks: [[chiruno, chiruno, chiruno, chiruno]], interval: 3, count: 3 },
    { fireworks: [], interval: 5, count: 1 },
    { fireworks: [[chiruno, chiruno, chiruno, chiruno]], interval: 2, count: 3 },
    { fireworks: [], interval: 20, count: 1 },
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
    // ランダムなタイミングで花火を打ち上げる（花火がなければ常に、多すぎればなし）
    if (!particleArr.length || (lightArr.length < 10 ** 2 && Math.random() < 0.02)) {
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

    setTimeout(mainLoop, 20)
}

let drawing = false
const drawLoop = () => {
    setTimeout(drawLoop, 20)
    if (drawing) return
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