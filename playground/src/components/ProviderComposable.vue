<script setup lang="ts">
import { formatDate, useRefHistory } from '@vueuse/core'
import { computed, shallowRef } from 'vue'
import { useThemeProvider } from '../../../src/ThemeProvider/composable'
import { THEME_MODES } from '../constant'

function format(ts: number) {
  return formatDate(new Date(ts), 'YYYY-MM-DD HH:mm:ss')
}

const theme = useThemeProvider({
  modes: THEME_MODES,
})

const logs = shallowRef<string>(theme.value)

const { history } = useRefHistory(logs, { capacity: 10 })

theme.onThemeChange((newMode) => {
  logs.value = `Theme changed to: ${JSON.stringify(newMode)}`
})

const isDark = computed(() => theme.isDark.value)
const state = computed(() => theme.state.value)
const system = computed(() => theme.system.value)
const store = computed(() => theme.store.value)
const currentModeValue = computed(() => theme.currentModeValue.value)
</script>

<template>
  <div class="card" style="text-align: left;">
    <p>Current mode: {{ theme }}</p>
    <p>Is dark: {{ isDark }}</p>
    <p>State: {{ state }}</p>
    <p>System: {{ system }}</p>
    <p>Store: {{ store }}</p>
    <p>Current Mode Value: {{ currentModeValue }}</p>

    <div class="space-x-2">
      <button
        v-for="mode in Object.keys(THEME_MODES)" :key="mode"

        @click="theme = (mode as keyof typeof THEME_MODES)"
      >
        Set to {{ mode }}
      </button>
      <button @click="theme = 'light'">
        Unset
      </button>
    </div>

    <div class="font-mono card flex flex-col h-80" style="margin-top: 0.8rem; text-align: left; max-height: 200px; display: flex;">
      <h3>
        Logs:
      </h3>
      <div style="overflow-y: auto; padding-right: 1rem;">
        <ul>
          <li v-for="(i) in history" :key="i.timestamp">
            [{{ format(i.timestamp) }}] {{ i.snapshot }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
