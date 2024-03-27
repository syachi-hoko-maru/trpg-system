<template>
  <pages-shinano>
    <card-array-by-andml :andml="andml_main" />
    <Card>
      <template #title>陰陽術データ</template>
      <template v-for="d of onmyojutsuData">
        <ItemHead3>{{ d.level }}レベル陰陽術データ</ItemHead3>
        <div class="onmyojutsu-table">
          <table class="onmyojutsu" v-for="l of d.list">
            <tr>
              <td class="level">{{ d.level }}</td>
              <td colspan="5" class="name long py-2">
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
                  （半径{{ l.target.range }}m）/{{ l.target.max }}
                </template>
              </td>
              <td class="label">射程<br />/形状</td>
              <td class="range">
                <template v-if="typeof l.range === 'number'">
                  {{ l.range <= 10 ? "1" : "2" }}（{{ l.range }}m）
                </template>
                <template v-else>
                  {{ l.range }}
                </template>
                <br />/{{ l.form }}
              </td>
              <td class="label">時間</td>
              <td>{{ l.time }}</td>
              <td class="label">抵抗</td>
              <td>{{ l.teiko }}</td>
            </tr>
            <tr>
              <td class="label">概要</td>
              <td colspan="7" class="long">{{ l.gaiyo }}</td>
            </tr>
            <tr>
              <td class="label">効果</td>
              <td colspan="7" class="long">{{ l.effect }}</td>
            </tr>
          </table>
        </div>
      </template>
    </Card>
    <card-array-by-andml :andml="onmyojutsuIndex" />
  </pages-shinano>
</template>

<script setup lang="ts">
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
    tr {
      td {
        min-width: 2.5rem;
        max-width: 2.5rem;
        padding: 0.2rem;
        text-align: center;
        &.long {
          text-align: left;
        }
        &.level {
          background-color: #3d3d3d;
          color: #fff;
        }
        &.name {
          font-size: 1.25rem;
          background-color: #333;
          color: #fff;
        }
        &.label {
          background-color: #555;
          color: #ddd;
          padding: 0.3rem 0;
          width: 3rem;
          min-width: 3rem;
          max-width: 3rem;
        }
        &.mp {
          width: 3.5rem;
          min-width: 3.5rem;
          max-width: 3.5rem;
        }
        &.target {
          width: 8.5rem;
          min-width: 8.5rem;
          max-width: 8.5rem;
        }
        &.range {
          width: 6rem;
          min-width: 6rem;
          max-width: 6rem;
        }
      }
    }
  }
}
</style>
