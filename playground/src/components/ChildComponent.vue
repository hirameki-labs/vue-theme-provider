<script setup lang="ts">
import type { ThemeProviderContext } from '../../../src/ThemeProvider/composable2'
import { useColorMode } from '@vueuse/core'
import { inject } from 'vue'
import { ThemeProviderSymbol } from '../../../src/ThemeProvider/composable2'
import { THEME_MODES } from '../constant'

const { isDark, mode, setColorMode, onThemeChange } = inject(ThemeProviderSymbol) as ThemeProviderContext<keyof typeof THEME_MODES>
const mode = useColorMode({
  modes: THEME_MODES,
})
const modes = Object.keys(THEME_MODES)

function toggleMode() {
  const currentIndex = modes.indexOf(mode.value as string)
  const nextIndex = (currentIndex + 1) % modes.length
  setColorMode('')
}
</script>

<template>
  <div>
    <p>This is a child component</p>

    <button>Set to </button>
  </div>
</template>
