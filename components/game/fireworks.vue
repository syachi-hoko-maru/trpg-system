<template>
    <canvas id="fireworks" :width="width" :height="height" />
</template>

<script setup lang="ts">
const width = 900
const height = width * 2 / 3
const canvas: Ref<HTMLCanvasElement | null> = ref(null)
const ctx: Ref<CanvasRenderingContext2D | null> = ref(null)
const g = 0.02

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
        this.x = x
        this.y = y
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
        const alpha = Math.floor((this.life * 2 > this.maxlife ? 1 : this.life * 2 / this.maxlife) * 200) / 200
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
    color: string
    maxlife: number
    life: number
    burst: BurstFunction | null
    startlife: number = 0
    constructor(x: number, y: number, vx: number, vy: number, color: string, life: number, burst: BurstFunction | null, startlife = 0) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
        this.color = color
        this.life = life
        this.maxlife = life
        this.burst = burst
        this.startlife = startlife
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
        lightArr.push(new Light(this.x, this.y, 2, this.color, Math.floor(this.life * 2 / 3), this.maxlife, this.startlife))
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
        if (this.burst && (this.life <= 0 || this.vy > 0)) {
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
        lightArr.unshift(new Light(this.x, this.y, 2, this.color, 8))
    }

    static launch = (burst: BurstFunction) => {
        particleArr.push(new Ball(Math.random() * (width - 20) + 10, -4 + (Math.random() - 0.5), Math.random() * 2000, burst))
    }
}

const colorList = ["#fabe48", "#ff00ff", "#7b28e0", "#f564a8", "#68adf7", "#ff3e29"]
const getColor = () => colorList[Math.floor(Math.random() * colorList.length)]
const color: BurstFunction = (x: number, y: number) => {
    const color = getColor()
    for (let i = 0; i < 75; i++) {
        const rad = Math.random() * Math.PI * 2
        const v = 2 + 0.3 * Math.random()
        particleArr.push(new Particle(x, y, Math.cos(rad) * v, Math.sin(rad) * v, color, 50 + 20 * Math.random(), null))
    }
}
const flower: BurstFunction = (x: number, y: number) => {
    const color1 = getColor()
    let color2 = getColor()
    while (color2 === color1) {
        color2 = getColor()
    }
    for (let i = 0; i < 40; i++) {
        const rad = Math.random() * Math.PI * 2
        const v = 2.5 + 0.3 * Math.random()
        particleArr.push(new Particle(x, y, Math.cos(rad) * v, Math.sin(rad) * v, color1, 50 + 20 * Math.random(), null))
    }
    for (let i = 0; i < 30; i++) {
        const rad = Math.random() * Math.PI * 2
        const v = 2 + 0.3 * Math.random()
        particleArr.push(new Particle(x, y, Math.cos(rad) * v / 2, Math.sin(rad) * v / 2, color2, 60 + 20 * Math.random(), null, 30))
    }

}
const chiruno: BurstFunction = (x: number, y: number) => {
    for (let i = 0; i < 45; i++) {
        const rad = Math.random() * Math.PI * 2
        const v = 5 + 15 * Math.random()
        particleArr.push(new Particle(x, y, Math.cos(rad) * v, Math.sin(rad) * v, "#333", 10, (x, y) => {
            for (let i = 0; i < 10; i++) {
                const rad = Math.random() * Math.PI * 2
                const v = 3
                particleArr.push(new Particle(x, y, Math.cos(rad) * v, Math.sin(rad) * v, "#ffebc4", 10, null))
            }

        }))
    }
}

const mainLoop = () => {
    timeCount++
    // クリア
    if (ctx.value) {
        ctx.value.rect(0, 0, width, height)
        ctx.value.fillStyle = "#333";
        ctx.value.fill()
    }
    // ランダムなタイミングで花火を打ち上げる（花火がなければ常に、多すぎればなし）
    if ((Math.random() < 0.02 || !particleArr.length) && lightArr.length < 10 ** 2) {
        fireballCount++
        if (fireballCount < 20) {
            if (fireballCount % 4 === 0) {
                Ball.launch(color)
            } else if (fireballCount % 2 === 0) {
                Ball.launch(flower)
            }
        } else if (fireballCount < 50) {
            if (fireballCount % 5 === 0) {
                Ball.launch(color)
                Ball.launch(flower)
                Ball.launch(flower)
            }
        } else if (fireballCount < 65) {
        } else if (fireballCount === 65 || fireballCount === 67) {
            Ball.launch(chiruno)
            Ball.launch(chiruno)
            Ball.launch(chiruno)
            Ball.launch(chiruno)
        } else if (fireballCount > 70) {
            fireballCount = 0
        }
    }
    // エラーフラグの設定
    let errorFlag: unknown = ""
    try {
        // ボールの移動と発光
        particleArr.forEach(ball => {
            ball.move()
        })
        // 光源の描写
        lightArr.forEach(light => {
            if (ctx.value) {
                light.draw(ctx.value)
            } else {
                errorFlag = "ctx not found"
            }
        })
        // ボールと光源の整理
        particleArr = particleArr.filter(({ life }) => life > 0)
        lightArr = lightArr.filter(({ life }) => life > 0)
    } catch (e) {
        errorFlag = e
    }
    if (!errorFlag) {
        setTimeout(mainLoop, 25)
    } else {
        console.error(errorFlag)
    }
}

const main = () => {
    console.log("start")
    mainLoop()
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