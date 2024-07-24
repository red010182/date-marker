ea<script setup lang="ts">
import dayjs from 'dayjs'
import { chunkArray } from '~/lib/ChunkArray'

const props = defineProps<{
  weekdayLabels?: string[],
  monthLabels?: string[],
  dayLabels?: string[],
  notDisplayWeekdayInCell?: boolean,
  disableDates?: string[],
}>()

const rowNum = 31
const colNum = 12

const dates = ref<boolean[]>(new Array(rowNum * colNum).fill(false))
const map = computed(() => chunkArray(dates.value, colNum))
const rowHeaders = ref(new Array(rowNum).fill(false))
const colHeaders = ref(new Array(colNum).fill(false))
const today = dayjs()
const dateString = computed(() => today.format('YYYY-MM-DD'))
const year = computed(() => +dateString.value.substring(0,4))
const month = computed(() => +dateString.value.substring(5,7))
const theDay = computed(() => +dateString.value.substring(8,10))

const notDisplayWeekdayInCell = ref(props.notDisplayWeekdayInCell)
const weekdayLabels = ref(props.weekdayLabels ?? ['一','二','三','四','五','六','日'])
const monthLabels = ref(props.monthLabels ?? ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'])
const dayLabels = ref(props.dayLabels ?? ['1日','2日','3日','4日','5日','6日','7日','8日','9日','10日','11日','12日','13日','14日','15日','16日','17日','18日','19日','20日','21日','22日','23日','24日','25日','26日','27日','28日','29日','30日','31日'])
const disableDates = ref(props.disableDates ?? [])
const getDate = (x: number, y: number) => {
  if(x >= 0 && x < rowNum && y >=0 && y < colNum) {
    return dates.value[x * colNum + y]
  }
}
const setDate = (x: number, y: number, v: boolean) => {
  if(x >= 0 && x < rowNum && y >=0 && y < colNum && !disableCell(x,y)) {
    dates.value[x * colNum + y] = v
  }
}
const toggleDate = (x: number, y:number) => {
  setDate(x, y, !getDate(x,y))
}
const toggleCol = (y: number) => {
  colHeaders.value[y] = !colHeaders.value[y]
  for(let x = 0; x < map.value.length; x++) {
    setDate(x, y, colHeaders.value[y])
  }
}
const toggleRow = (x: number) => {
  rowHeaders.value[x] = !rowHeaders.value[x]
  for(let y = 0; y < map.value[x].length; y++) {
    setDate(x, y, rowHeaders.value[x])
  }
}
const clear = () => {
  for(let i = 0; i < dates.value.length; i++) {
    dates.value[i] = false
  }
}
const disableCell = (x: number, y: number) => {
  const str = `${y+1}/${x+1}`
  return disableDates.value.concat(['2/30','2/31','4/31','6/31','9/31','11/31']).includes(str)
}
const cellText = (x: number, y: number) => {
  if(notDisplayWeekdayInCell.value) return ''
  if(disableCell(x,y)) return ''
  return weekdayLabels.value[dayjs(`${year}-${y+1}-${x+1}`).day()]
}

</script>
<template lang="pug">
//- div {{ map }}
.text-left
  .btn(@click="clear") Clear
.mt-8.relative.w-120
  .year-box.row.flex.items-center
    .year-cell(v-for='i in (month-1)')
    .year-cell
      .next-year
        span.mr-2 {{ year + 1 }}
    .line
    .year-cell
      .year 
        span.ml-2 {{ year }}
    .year-cell(v-for='i in (12-month)')
  .row.flex
    .col.cell
    .col.cell(v-for='(col, y) in 12', @click="toggleCol(y)") {{ monthLabels[y] }}
  .row.flex(v-for='(row,x) in map', :key='x') 
    .col.cell(@click='toggleRow(x)') {{ dayLabels[x] }}
    .col.cell(
      v-for='(col, y) in row', 
      @click='toggleDate(x,y)', 
      :class="{ active: map[x][y], disabled: disableCell(x,y) }"
    ) {{ cellText(x,y) }}
</template>
<style lang="scss">
.year-box {
  height: 100px;
  .line {
    width: 3px;
    height: 80%;
    background-color: lightgray;
  }
  .year-cell {
    position: relative;
    width: 40px;
    height: 100%;
    .year {
      font-size: 4rem;
      color: gray;
      position: absolute;
      left: 10;
      top: 50%;
      transform: translate(0, -50%);
    }
    .next-year {
      font-size: 4rem;
      color: gray;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(0, -50%);
    }
  }
}
.cell {
  font-size: 12px;
  width: 40px;
  height: 40px;
  border: 0.5px solid lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 165, 0, 0.5);
  }
  &.active {
    background-color: rgba(255, 165, 0, 1);
  }
  &.disabled {
    background-color: lightgray;
    border-color: gray;
    cursor: default;
  }
}
</style>