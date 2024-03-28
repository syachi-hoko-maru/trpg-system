<template>
  <div class="sw25-table">
    <table :class="$vuetify.theme.current.dark ? '' : 'light'">
      <thead>
        <tr>
          <th class="name">名称</th>
          <th>用法</th>
          <th>必筋</th>
          <th>命中</th>
          <th>威力</th>
          <th>C値</th>
          <th>追加D</th>
          <th>価格</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item of normalWeaponList">
          <td class="name">
            {{ item.name }}
            <span class="small" v-if="item.kakuto">
              {{
                item.kakuto === "パンチ"
                  ? "*1"
                  : item.kakuto === "キック"
                  ? "*2"
                  : "*3"
              }}
            </span>
            <span class="small">
              {{
                item.dazan === "打撃"
                  ? "打"
                  : item.dazan === "斬撃"
                  ? "斬"
                  : "打斬"
              }}
            </span>
          </td>
          <td>{{ item.yoho }}</td>
          <td>{{ item.hikkin }}</td>
          <td>{{ item.meichu }}</td>
          <td>{{ item.iryoku }}</td>
          <td>{{ item.c }}</td>
          <td>{{ item.d }}</td>
          <td>{{ item.price }}</td>
        </tr>
      </tbody>
    </table>
    <div class="cautions">
      <div
        v-if="
          normalWeaponList.filter((w) => w.kakuto && w.kakuto === 'パンチ')
            .length > 0
        "
      >
        *1 〈パンチ〉を強化する武器（『ルールブックI』p.309）
      </div>
      <div
        v-if="
          normalWeaponList.filter((w) => w.kakuto && w.kakuto === 'キック')
            .length > 0
        "
      >
        *2 〈キック〉を強化する武器（『ルールブックI』p.309）
      </div>
      <div
        v-if="
          normalWeaponList.filter((w) => w.kakuto && w.kakuto === '投げ')
            .length > 0
        "
      >
        *3 〈投げ〉を強化する武器（『ルールブックI』p.309）
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  WeaponList,
  type Weapon,
  type NormalWeapon,
} from "~/src/shinano/item/weapon";

interface Props {
  props: string;
}
const Props = defineProps<Props>();

const propList: string[] = Props.props.split(",");
const itemList: Weapon[] = WeaponList.filter(
  (w) => propList.indexOf(w.name) >= 0
);
const normalWeaponList: NormalWeapon[] = itemList.filter(
  (item) => item.yoho && item.c
) as NormalWeapon[];
</script>

<style lang="scss" scoped>
div.sw25-table {
  overflow-x: scroll;
  table {
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
      th {
        background-color: #555;
        color: #ddd;
        padding: 0.3rem 0;
        text-align: center;
        width: 2.7rem;
        min-width: 2.7rem;
        max-width: 2.7rem;
      }
      td {
        min-width: 2.5rem;
        max-width: 2.5rem;
        padding: 0.2rem;
        text-align: center;
        background-color: #393939;
        span.small {
          font-size: 0.75rem;
        }
        &.name {
          text-align: left;
        }
      }
      .name {
        width: 12.7rem;
        min-width: 2.7rem;
        max-width: 12.7rem;
      }
    }
  }
  div.cautions {
    div {
      margin-left: 1rem;
      font-size: 0.7rem;
    }
  }
}
</style>
