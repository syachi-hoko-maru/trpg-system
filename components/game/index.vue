<template>
  <card>
    <template #title>
      2Dシューティングゲーム
    </template>
    <div v-if="!canvasError">
      <div class="pb-2">
        <div>score {{ score }}</div>
        <div>your high score {{ highscore }}</div>
      </div>
      <canvas id="game" :width="width" :height="width * 2 / 3" />
      <div class="d-flex">
        <item-button id="leftButton"> ← </item-button>
        <v-spacer />
        <item-button id="rightButton"> → </item-button>
      </div>
      <div v-if="mounted">
        <item-button @click="() => showRule = !showRule">{{ showRule ? "遊び方を閉じる" : "遊び方を読む" }}</item-button>
        <andml :andmls="rule" v-if="showRule" />
        <item-button v-if="!gaming" @click="doCanvas">ゲームを始める</item-button>
      </div>
    </div>
    <div v-else>
      エラーが発生しました。
    </div>
  </card>
</template>

<script setup lang="ts">
import { Ref } from 'vue';

const canvasError = ref(false)
const gaming = ref(false)
const mounted = ref(false)
const score = ref(0)
const highscore = ref(0)

const showRule = ref(false)

const rule = `
&2 遊び方
青い丸が自機、赤い丸が敵機。
水色の小さい丸は自弾。
橙色の小さい丸は敵弾。
緑色の中くらいの丸はアイテム。
&br
&em_矢印キーの左右 か、 &em_←→ボタンタッチ で操作。
&br
敵弾が当たるとHP（下の青いゲージ）が減る。
アイテムを取ると回復したり強くなったりする。
HPが0になるか、敵機が下がってきたらGame Over。
`

const width = 900
let rightPressed = false
let leftPressed = false
let canvas: Ref<HTMLCanvasElement | null> = ref(null)
const entityArray: Entity[] = []
let mine: Mine | null = null

class Entity {
  size = 30
  x = this.size;
  y = this.size;
  dx = 5;
  direction = 1
  reflect = false
  color = ""
  team: "mine" | "enemy" | "item" = "mine"
  fullHp = 1
  hp = 1
  name = ""
  constructor(color: string) {
    this.color = color
  }
  drawEntity(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
  moveX(direction?: number) {
    if (direction) this.direction = direction
    if (this.direction === 1) {
      if (this.x + this.dx < width - this.size) this.x += this.dx
      else if (this.reflect) {
        this.x = Math.max(width * 2 - this.size * 2 - (this.x + this.dx), width - this.size)
        this.direction = -1
        this.reflectAction()
      }
      else this.x = width - this.size
    } else {
      if (this.x - this.dx > this.size) this.x -= this.dx
      else if (this.reflect) {
        this.x = Math.max(this.size * 2 - (this.x + this.dx), this.size)
        this.direction = 1
        this.reflectAction()
      }
      else this.x = this.size
    }
  }
  auto() { }
  score() {
    return 0
  }
  reflectAction() { }
}

class Bullet extends Entity {
  damage = 1
  size = 5
  dy = 0
  constructor(x: number, y: number, team: "enemy" | "mine" | "item" = "mine", dy = 5) {
    super(team === "mine" ? "#00ffff" : "orange")
    this.x = x
    this.y = y
    this.team = team
    this.dy = team === "mine" ? dy : -dy
  }
  auto() {
    this.y -= this.dy;
    entityArray
      .filter(entity => entity.team !== "item" && this.team !== entity.team)
      .forEach((entity) => {
        if ((this.x - entity.x) ** 2 + (this.y - entity.y) ** 2 <= (this.size + entity.size) ** 2) {
          this.hp = 0
          entity.hp -= this.damage
        }
      })
  }
}
class DropItem extends Entity {
  team = "item" as "item"
  dy = 3
  size = 10
  constructor() {
    super("green")
    if (!mine) {
      this.x = (width - this.size) / 2
      this.y = 10
    } else {
      const x = Math.round(Math.random() * (width - this.size * 2 - mine.size * 10)) + this.size
      this.x = x + this.size >= mine.x - mine.size * 5 ? x + mine.size * 10 + this.size * 2 : x
      this.y = 10
    }
  }
  effect() {
    const rand = Math.random()
    if (!mine) return
    if (mine.hp < mine.fullHp / 3) {
      mine.hp += 5
    } else if (rand < 0.3 && mine.hp <= mine.fullHp - 3) {
      mine.hp += 3
    } else if (mine.ratio > 5) {
      mine.ratio--
    } else {
      mine.ratio = 10
      mine.shootingLevel++
    }
  }
  auto() {
    this.y += this.dy;
    if (mine) {
      if ((this.x - mine.x) ** 2 + (this.y - mine.y) ** 2 <= (this.size + mine.size) ** 2) {
        this.hp = 0
        this.effect()
      }
    }
  }
}

class Machine extends Entity {
  shootingCount = 0
  ratio = 10
  shootingLevel = 1
  constructor(color: string, ratio: number = 10) {
    super(color)
    this.ratio = ratio
  }
  shooting(dy: number): void {
    this.shootingCount++
    if (this.shootingCount % this.ratio === 0) {
      this.shootingCount = 0
      const y = this.team === "mine" ? this.y - this.size - 10 : this.y + this.size + 10
      for (let i = 0; i < this.shootingLevel; i++) {
        entityArray.push(new Bullet(this.x - this.size + this.size * (i + 1) / (this.shootingLevel + 1) * 2, y, this.team, dy))
      }
    }
  }
}
class Mine extends Machine {
  name = "mine"
  fullHp = 10
  hp = this.fullHp
  realHp = this.fullHp
  muteki = 0
  constructor(width: number) {
    super("#366bff", 10)
    this.x = width / 2
    this.y = width * 2 / 3 - this.size * 2
  }
  auto(): void {
    this.shooting(10)
    if (this.muteki) {
      this.color = "#8aa9ff"
      this.muteki--
    } else {
      this.color = "#366bff"
    }
    if (this.hp > this.realHp) {
      this.realHp = this.hp
    } else if (this.hp < this.realHp) {
      if (this.muteki <= 0) {
        this.realHp--
        this.hp = this.realHp
        this.muteki = 15
      } else {
        this.hp = this.realHp
      }
    }
  }
}
class Enemy extends Machine {
  x = width - this.size
  y = this.size + 10
  direction = -1
  reflect = true
  team = "enemy" as "enemy"
  name = "enemy"
  fullHp = 0
  bulletDy = 5
  constructor(hp: number, dx: number, ratio: number, bulletDy: number = 5) {
    super("red", ratio)
    this.fullHp = hp
    this.hp = this.fullHp
    this.dx = dx
    this.bulletDy = bulletDy
    this.shootingCount = Math.round(Math.random() * this.ratio)
  }
  score(): number {
    return Math.floor(this.fullHp * this.dx / this.ratio * this.bulletDy * 100)
  }
  auto() {
    this.moveX()
    this.shooting(this.bulletDy)
  }
  reflectAction(): void {
    this.y += this.size * 2.5
  }
}

const doCanvas = () => {
  try {
    if (gaming.value === true) return
    gaming.value = true
    const ctx = canvas.value?.getContext("2d");
    if (!ctx) throw "no ctx"
    score.value = 0
    entityArray.splice(0, entityArray.length)

    mine = new Mine(width)
    entityArray.push(mine)

    let count = 0
    let intervalId: NodeJS.Timer
    const interval = 25

    const gameover = () => {
      clearInterval(intervalId)
      gaming.value = false
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#fff";
      ctx.font = `90px font`;
      ctx.textAlign = "center";
      ctx.fillText("game over", width / 2, width / 3)
      if (score.value > highscore.value) {
        highscore.value = score.value
        localStorage.setItem('highscore', String(highscore.value));
      }
    }

    const drawHp = () => {
      if (!mine) return
      ctx.beginPath();
      ctx.rect(0, width * 2 / 3 - 10, width * mine.realHp / mine.fullHp, 10);
      ctx.fillStyle = "royalblue";
      ctx.fill();
      ctx.closePath();
    }

    const addEnemy = () => {
      const t = 1000 / interval
      if (count <= t * 15 && count % t === 0) {
        entityArray.push(new Enemy(2, 5, 43, 5))
      }
      if (count >= t * 20 && count <= t * 35 && count % t === 0) {
        entityArray.push(new Enemy(3, 5, 50, 9))
      }
      if (count >= t * 40 && count <= t * 55 && count % t === 0) {
        entityArray.push(new Enemy(3, 7, 39, 9))
      }
      if (count >= t * 63 && count % t === 0) {
        entityArray.push(new Enemy(Math.round(count / t / 70) + 3, Math.round(count / t / 60) + 8, Math.round(30 * t * 60 / count), 10))
      }
    }

    const addItem = () => {
      if (Math.random() < 0.1) {
        entityArray.push(new DropItem())
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, width * 2 / 3);
      entityArray.forEach(entity => {
        entity.drawEntity(ctx)
        entity.auto()
      })
      entityArray.forEach((entity, i) => {
        if (!mine) return
        if (entity.name === "enemy" && entity.y > mine.y - entity.size - mine.size) {
          gameover()
        }
        if (
          entity.hp <= 0
          || entity.x < entity.size || entity.x > width - entity.size
          || entity.y < entity.size || entity.y > width * 2 / 3 - entity.size
        ) {
          if (entity.name === "mine") {
            if (mine.realHp <= 0) {
              gameover()
            }
          } else {
            entityArray.splice(i, 1)
            if (entity.name === "enemy") {
              score.value += entity.score()
            }
          }
        }
      })
      drawHp()
      if (rightPressed) {
        if (mine) mine.moveX(1)
      }
      if (leftPressed) {
        if (mine) mine.moveX(-1)
      }
      addEnemy()
      if (count >= Math.round(1000 / interval) * 10 && count % Math.round(1000 / interval) === 0) {
        addItem()
      }
      score.value++
      count++
    }

    intervalId = setInterval(draw, interval);
  } catch {

  }
}

const keyHandler = (key: string, mode: "down" | "up") => {
  if (key === "Right" || key === "ArrowRight") {
    leftPressed = false
    if (mode === "down") rightPressed = true;
    else if (mode === "up") rightPressed = false;
  } else if (key === "Left" || key === "ArrowLeft") {
    rightPressed = false
    if (mode === "down") leftPressed = true;
    else if (mode === "up") leftPressed = false;
  }
}

onMounted(() => {
  try {
    canvas.value = document.getElementById("game") as HTMLCanvasElement
    document.addEventListener("keydown", (e) => keyHandler(e.key, "down"), false);
    document.addEventListener("keyup", (e) => keyHandler(e.key, "up"), false);
    const rightButton = document.getElementById("rightButton")
    rightButton?.addEventListener("touchstart", () => keyHandler("Right", "down"))
    rightButton?.addEventListener("touchend", () => keyHandler("Right", "up"))
    rightButton?.addEventListener("touchcancel", () => keyHandler("Right", "up"))
    const leftButton = document.getElementById("leftButton")
    leftButton?.addEventListener("touchstart", () => keyHandler("Left", "down"))
    leftButton?.addEventListener("touchend", () => keyHandler("Left", "up"))
    leftButton?.addEventListener("touchcancel", () => keyHandler("Left", "up"))
    mounted.value = true
    try {
      const number = Number(localStorage.getItem('highscore'))
      if (!Number.isNaN(number)) highscore.value = number
    } catch { }
  } catch (error) {
    console.error(error)
    canvasError.value = true
  }
})
</script>

<style lang="scss">
canvas#game {
  background: #333;
  display: block;
  margin: 0 auto;
  width: 100%;
  aspect-ratio: 3 / 2;
}
</style>