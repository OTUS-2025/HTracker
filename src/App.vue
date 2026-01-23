<script setup lang="ts"></script>

<template>
  <div class="@container flex justify-center my-4">
    <div class="flex flex-col w-2xl @sm:w-sm @lg:w-lg @xl:w-7xl">
      <h1 class="text-3xl text-center font-bold">
        Health Tracker <font-awesome-icon icon="fa-solid fa-notes-medical" />
      </h1>
      <router-view />
    </div>
  </div>
</template>
