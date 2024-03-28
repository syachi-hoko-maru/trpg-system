<template>
  <div class="sw25-table">
    <div v-for="item of itemList">
      <div class="d-flex justify-space-between align-center">
        <ItemHead4>{{ item.name }}</ItemHead4>
        <div><span class="bold">基本取引価格</span>：{{ item.price }}G</div>
      </div>
      <table :class="$vuetify.theme.current.dark ? '' : 'light'">
        <tr>
          <td class="label">知名度</td>
          <td class="known">{{ item.known }}</td>
          <td class="label">形状</td>
          <td class="shape left">{{ item.shape }}</td>
          <td class="label"><span class="small">カテゴリ</span></td>
          <td class="category">
            <span class="small">{{ item.category }}</span>
          </td>
        </tr>
        <tr>
          <td class="label">概要</td>
          <td class="left" colspan="5">{{ item.gaiyo }}</td>
        </tr>
        <tr>
          <td class="label">効果</td>
          <td class="left" colspan="5"><Andml :andmls="item.effect" /></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { itemDataList } from "~/src/shinano/item";
import type { ItemDetail } from "~/src/shinano/item/type";
interface Props {
  props: string;
}
const Props = defineProps<Props>();

const propList: string[] = Props.props.split(",");
const itemList = itemDataList.filter(
  (w) =>
    w.shape &&
    (propList.indexOf(w.name) >= 0 ||
      (w.group && propList.indexOf(w.group) >= 0))
) as ItemDetail[];
</script>

<style lang="scss" scoped>
.bold {
  font-weight: bold;
}
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
      td {
        min-width: 2.5rem;
        max-width: 2.5rem;
        padding: 0.2rem;
        text-align: center;
        background-color: #393939;
        span.small {
          font-size: 0.75rem;
        }
        &.label {
          background-color: #555;
          color: #ddd;
          padding: 0.3rem 0;
          width: 1.6rem;
          min-width: 1.6rem;
          max-width: 1.6rem;
        }
        &.shape {
          width: 18.6rem;
          min-width: 12rem;
          max-width: 18.6rem;
        }
        &.category {
          width: 8.6rem;
          min-width: 6rem;
          max-width: 12.6rem;
        }
        &.left {
          text-align: left;
        }
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
