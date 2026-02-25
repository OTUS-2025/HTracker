<template>
  <div v-if="isShow" class="card bg-gray-800 p-10">
    <Chart type="line" :data="chartData" :options="chartOptions" class="h-120" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { healthService } from '@/di/HealthServiceConnector'
import { useMainStore } from '@/stores/useMainStore'
import type { Pressure4Plot } from '@/types/analytics-types'

const mainStore = useMainStore()
const plotData = ref<Pressure4Plot[] | string>()

const isShow = defineModel<boolean>('isShow', { default: false, required: true })

onMounted(async () => {
  const user = await mainStore.activeUser()
  plotData.value = await healthService.getPressure4Plot(user)
  if (typeof plotData.value !== 'string') {
    chartData.value = setChartData(getLables(), getData('Left'), getData('Right'))
    chartOptions.value = setChartOptions()
  }
})

const chartData = ref()
const chartOptions = ref()

const setChartData = (lables: string[], leftDataset: number[], rightDataset: number[]) => {
  const documentStyle = getComputedStyle(document.documentElement)

  return {
    labels: lables,
    datasets: [
      {
        label: 'Left Hand',
        data: leftDataset,
        fill: false,
        borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
        tension: 0.4,
      },
      {
        label: 'Right Hand',
        data: rightDataset,
        fill: false,
        borderColor: documentStyle.getPropertyValue('--p-gray-500'),
        tension: 0.4,
      },
    ],
  }
}
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--p-text-color')
  const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color')
  const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color')

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  }
}

const getLables = () => {
  if (typeof plotData.value !== 'string' && plotData.value) {
    return plotData.value
      .filter((item, ndx) => ndx % 2 !== 0)
      .map((item) => {
        return item.fixed_date
      })
  }
  return []
}
const getData = (hand: string) => {
  let answer: number[] = []
  switch (hand) {
    case 'Left':
      if (typeof plotData.value !== 'string' && plotData.value) {
        answer = plotData.value
          .filter((item) => item.hand === 'Left')
          .map((item) => {
            return item.avg_diastolic
          })
      }
      break
    case 'Right':
      if (typeof plotData.value !== 'string' && plotData.value) {
        answer = plotData.value
          .filter((item) => item.hand === 'Right')
          .map((item) => {
            return item.avg_diastolic
          })
      }
      break
    default:
      answer = []
      break
  }
  return answer
}
</script>
