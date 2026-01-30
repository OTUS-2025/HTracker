<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 max-w-6xl mx-auto">
    <div
      v-for="card in cards"
      :key="card.id"
      class="relative bg-linear-to-br from-amber-200 to-amber-300 rounded-2xl p-6 text-white cursor-pointer transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl overflow-hidden min-h-[200px]"
      @mouseenter="onCardHover(card.id)"
      @mouseleave="onCardLeave()"
    >
      <!-- Overlay effect -->
      <div
        class="absolute inset-0 bg-linear-to-br from-white/10 to-white/5 transition-opacity duration-300"
        :class="hoveredCard === card.id ? 'opacity-100' : 'opacity-0'"
      ></div>

      <!-- Header -->
      <div class="relative z-10 flex items-center gap-4 mb-4">
        <div
          class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-xl transition-all duration-300"
          :class="hoveredCard === card.id ? 'bg-white/30 scale-110' : ''"
        >
          <font-awesome-icon :icon="card.icon" class="text-teal-600" />
        </div>
        <h3 class="text-teal-600 text-xl font-semibold m-0">{{ card.title }}</h3>
      </div>

      <!-- Content -->
      <div class="relative z-10 text-gray-600">
        <p class="text-sm leading-relaxed mb-4">{{ card.description }}</p>

        <!-- Stats - appear on hover -->
        <div v-if="hoveredCard === card.id" class="mb-4 animate-slide-in">
          <div class="flex justify-between items-center py-2 border-b border-white/20">
            <span class="text-sm">Сегодня:</span>
            <span class="font-semibold">{{ card.todayValue }}</span>
          </div>
          <div class="flex justify-between items-center py-2 border-b border-white/20">
            <span class="text-sm">Неделя:</span>
            <span class="font-semibold">{{ card.weekValue }}</span>
          </div>
          <div class="flex justify-between items-center py-2">
            <span class="text-sm">Месяц:</span>
            <span class="font-semibold">{{ card.monthValue }}</span>
          </div>
        </div>

        <!-- Actions - appear on hover -->
        <div v-if="hoveredCard === card.id" class="animate-fade-in">
          <Button
            :label="card.actionLabel"
            size="small"
            :severity="card.actionSeverity"
            @click="onActionClick(card.id)"
          />
        </div>
      </div>
    </div>
  </div>
  <EnterPressure :is-visible="pressureDlgVisible" @close="pressureDlgVisible = false" />
  <EnterPulse
    :is-visible="getDlgVisibility(CardId.Pulse)"
    @close="setDlgVisibility(CardId.Pulse, false)"
  />
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import Button from 'primevue/button'
import EnterPressure from './EnterData/EnterPressure.vue'
import EnterPulse from './EnterData/EnterPulse.vue'

const pressureDlgVisible = ref(false)

enum CardId {
  Pressure = 'pressure',
  Pulse = 'pulse',
  Temperature = 'temperature',
  Weight = 'weight',
  Activity = 'activity',
}
interface HealthCard {
  id: CardId
  title: string
  description: string
  icon: string
  todayValue: string
  weekValue: string
  monthValue: string
  actionLabel: string
  actionSeverity: string
  actionDlg: boolean
}

const hoveredCard = ref<string | null>(null)

const cards = reactive<HealthCard[]>([
  {
    id: CardId.Pressure,
    title: 'Давление',
    description: 'Отслеживайте артериальное давление',
    icon: 'fa-solid fa-heart-pulse',
    todayValue: '120/80',
    weekValue: '118/78',
    monthValue: '122/82',
    actionLabel: 'Добавить',
    actionSeverity: 'success',
    actionDlg: false,
  },
  {
    id: CardId.Pulse,
    title: 'Пульс',
    description: 'Мониторьте частоту сердечных сокращений',
    icon: 'fa-solid fa-wave-square',
    todayValue: '72 уд/мин',
    weekValue: '70 уд/мин',
    monthValue: '75 уд/мин',
    actionLabel: 'Измерить',
    actionSeverity: 'success',
    actionDlg: false,
  },
  {
    id: CardId.Weight,
    title: 'Вес',
    description: 'Следите за изменениями веса',
    icon: 'fa-solid fa-weight-scale',
    todayValue: '70.5 кг',
    weekValue: '70.2 кг',
    monthValue: '71.0 кг',
    actionLabel: 'Взвеcиться',
    actionSeverity: 'success',
    actionDlg: false,
  },
  {
    id: CardId.Activity,
    title: 'Активность',
    description: 'Записывайте физическую активность',
    icon: 'fa-solid fa-person-walking',
    todayValue: '8500 шагов',
    weekValue: '52000 шагов',
    monthValue: '210000 шагов',
    actionLabel: 'Записать',
    actionSeverity: 'success',
    actionDlg: false,
  },
])

const onCardHover = (cardId: string) => {
  hoveredCard.value = cardId
}

const onCardLeave = () => {
  hoveredCard.value = null
}

const onActionClick = (cardId: string) => {
  console.log(`Action clicked for card: ${cardId}`)
  switch (cardId) {
    case CardId.Pressure:
      pressureDlgVisible.value = true
      break
    case CardId.Pulse:
      setDlgVisibility(CardId.Pulse, true)
      break
  }
}

const setDlgVisibility = (cardId: CardId, isVisible: boolean) => {
  const card = cards.find((c) => c.id === cardId)
  if (card) card.actionDlg = isVisible
}

const getDlgVisibility = (cardId: CardId) => {
  const card = cards.find((c) => c.id === cardId)
  if (card) return card.actionDlg
  return false
}
</script>

<style scoped>
@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slide-in 0.4s ease-out;
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out 0.2s both;
}
</style>
