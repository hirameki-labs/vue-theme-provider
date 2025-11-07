<script setup lang="ts">
import { ThemeProvider } from '../../src/ThemeProvider'
import ProviderComposable from './components/ProviderComposable.vue'
import { THEME_MODES } from './constant'
</script>

<template>
  <div>
    <ThemeProvider
      :modes="THEME_MODES"
    >
      <ChildComponent />
    </ThemeProvider>

    <ProviderComposable />
  </div>
</template>
