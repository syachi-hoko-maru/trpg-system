<template>
  <div class="sw25-table">
    <table :class="$vuetify.theme.current.dark ? '' : 'light'">
      <thead>
        <tr>
          <th class="values">初期儀式達成値</th>
          <th class="values">儀式継続値</th>
          <th class="zokusei">儀式属性</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ gishikiValue[0] }}</td>
          <td>{{ gishikiValue[1] }}</td>
          <td>{{ gishikiValue[2] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  props: string;
}
const Props = defineProps<Props>();

const gishikiValue = Props.props.split(",");
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
        width: 2.7rem;
        min-width: 2.7rem;
        max-width: 2.7rem;
        text-align: center;
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
      }
      .values {
        width: 7.6rem;
        min-width: 7.6rem;
        max-width: 9rem;
      }
      .zokusei {
        width: 4.6rem;
        min-width: 4.6rem;
        max-width: 6rem;
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
