<template>
  <pages-shinano>
    <card-array-by-andml :andml="andml_main" />
    <Card>
      <template #title>陰陽術データ</template>
      <template v-for="d of onmyojutsuData">
        <ItemHead3>{{ d.level }}レベル陰陽術データ</ItemHead3>
        <div class="onmyojutsu-table">
          <table
            class="onmyojutsu"
            :class="$vuetify.theme.current.dark ? '' : 'light'"
            v-for="l of d.list"
          >
            <tr>
              <td class="level">{{ d.level }}</td>
              <td colspan="5" class="name long py-2">
                <span>
                  {{
                    l.move === "補助（戦闘準備）"
                      ? "▸▸△"
                      : l.move === "補助"
                      ? "▸▸"
                      : ""
                  }}
                </span>
                【
                <ruby :id="`table_${l.name}`">
                  {{ l.name }}
                  <rp>(</rp>
                  <rt>{{ l.ruby }}</rt>
                  <rp>)</rp>
                </ruby>
                】
              </td>
              <td class="label">消費</td>
              <td class="mp">MP{{ l.mp }}</td>
            </tr>
            <tr v-if="l.gishiki">
              <td class="label">儀式</td>
              <td class="label">儀式発動値</td>
              <td>{{ l.hatsudo }}</td>
              <td class="label" colspan="2">儀式使用値</td>
              <td>{{ l.shiyo }}</td>
              <td class="label">属性</td>
              <td>{{ l.type }}</td>
            </tr>
            <tr>
              <td class="label">対象</td>
              <td class="target">
                <template v-if="typeof l.target === 'string'">
                  {{ l.target }}
                </template>
                <template v-else>
                  {{
                    l.target.range <= 10
                      ? "1"
                      : l.target.range >= 30
                      ? "全"
                      : "2〜3"
                  }}エリア
                  <br />
                  <span class="small">
                    （半径{{ l.target.range }}m）/{{ l.target.max }}
                  </span>
                </template>
              </td>
              <td class="label">射程<br />/形状</td>
              <td class="range">
                <template v-if="typeof l.range === 'number'">
                  {{ l.range <= 10 ? "1" : "2" }}
                  <span class="small">（{{ l.range }}m）</span>
                </template>
                <template v-else>
                  {{ l.range }}
                </template>
                <br />/{{ l.form }}
              </td>
              <td class="label">時間</td>
              <td class="time">
                <template v-if="getTimeString(l.time).length >= 2">
                  {{ getTimeString(l.time)[0] }}<br />
                  <span class="small"> {{ getTimeString(l.time)[1] }} </span>
                </template>
                <template v-else>
                  {{ getTimeString(l.time)[0] }}
                </template>
              </td>
              <td class="label">抵抗</td>
              <td>{{ l.teiko }}</td>
            </tr>
            <tr>
              <td class="label">概要</td>
              <td colspan="7" class="long">{{ l.gaiyo }}</td>
            </tr>
            <tr>
              <td class="label">効果</td>
              <td colspan="7" class="long"><Andml :andmls="l.effect" /></td>
            </tr>
          </table>
        </div>
      </template>
    </Card>
    <card-array-by-andml :andml="onmyojutsuIndex" />
  </pages-shinano>
</template>

<script setup lang="ts">
import { getTimeString } from "~/src/shinano/data";
import { onmyojutsuData } from "~/src/shinano/data/guardiner";
import { guardinerAndml } from "~/src/shinano/pages/guardiner";

const andml_main = guardinerAndml;
const onmyojutsuIndex = `
&1 陰陽術索引
${onmyojutsuData
  .map((a) => a.list.map((l) => ({ ...l, level: a.level })))
  .flat()
  .sort((a, b) => {
    return a.ruby.localeCompare(b.ruby, "ja");
  })
  .map(
    (s) =>
      `- &link_#table_${s.name},【${s.name}】（陰陽/${
        s.type === "-" ? "特殊" : s.type
      }¥s${s.level}）`
  )
  .join("\n")}
`;
</script>

<style lang="scss" scoped>
ruby {
  rt {
    font-size: 0.6rem;
  }
}

div.onmyojutsu-table {
  overflow-x: scroll;
  table.onmyojutsu {
    table-layout: fixed;
    margin: 0.7rem 0;
    &.light {
      tr {
        td {
          background-color: #ddd;
        }
      }
    }

    tr {
      td {
        min-width: 2.5rem;
        max-width: 2.5rem;
        padding: 0.2rem;
        text-align: center;
        background-color: #393939;
        span.small {
          font-size: 0.75rem;
        }
        &.long {
          text-align: left;
        }
        &.level {
          background-color: #333;
          color: #fff;
        }
        &.name {
          font-size: 1.25rem;
          background-color: #222;
          color: #fff;
        }
        &.label {
          background-color: #555;
          color: #ddd;
          padding: 0.3rem 0;
          width: 2.7rem;
          min-width: 2.7rem;
          max-width: 2.7rem;
        }
        &.mp {
          width: 3.5rem;
          min-width: 3.5rem;
          max-width: 3.5rem;
        }
        &.target {
          width: 7.25rem;
          min-width: 7.25rem;
          max-width: 7.25rem;
        }
        &.range {
          width: 5.75rem;
          min-width: 5.75rem;
          max-width: 5.75rem;
        }
        &.time {
          width: 4.5rem;
          min-width: 4.5rem;
          max-width: 4.5rem;
        }
      }
    }
  }
}
</style>
