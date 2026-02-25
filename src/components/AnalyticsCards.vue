<template>
  <div class="h-full flex flex-col">
    <div
      class="h-max grid justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 max-w-8xl mx-auto"
    >
      <Card
        v-for="(key, ndx) in Object.keys(cards)"
        :key="ndx"
        class="bg-linear-to-br from-amber-200 to-amber-300 rounded-2xl p-2"
      >
        <template #title>{{ cards[key as CardId].title }}</template>
        <template #subtitle>{{ cards[key as CardId].description }}</template>
        <template #content> </template>
        <template #footer>
          <div class="flex gap-4 mt-1">
            <Button label="неделя" class="w-full" @click="onActionClick(key, 'week')" />
            <Button label="месяц" class="w-full" @click="onActionClick(key, 'month')" />
          </div>
        </template>
      </Card>
    </div>
    <PlotPulse :is-show="false" />
    <PlotPressure :is-show="true" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import PlotPulse from './PlotData/PlotPulse.vue'
import PlotPressure from './PlotData/PlotPressure.vue'

enum CardId {
  Pressure = 'pressure',
  Pulse = 'pulse',
  Weight = 'weight',
  // Activity = 'activity',
}

interface AnalyticsCard {
  title: string
  description: string
}

const cards: Record<CardId, AnalyticsCard> = reactive({
  [CardId.Pressure]: {
    title: 'Давление',
    description: 'Отслеживайте артериальное давление',
  },
  [CardId.Pulse]: {
    title: 'Пульс',
    description: 'Мониторьте частоту сердечных сокращений',
  },
  [CardId.Weight]: {
    title: 'Вес',
    description: 'Следите за изменениями веса',
  },
})

const onActionClick = (cardId: string, period: string) => {
  console.log(`Action clicked for card: ${cardId} / ${period}`)
  switch (cardId) {
    case CardId.Pressure:
      break
    case CardId.Pulse:
      break
    case CardId.Weight:
      break
  }
}
</script>
