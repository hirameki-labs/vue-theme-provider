import type { EventHookOn, UseColorModeOptions, UseColorModeReturn } from '@vueuse/core'
import type { ComputedRef } from 'vue'
import { createEventHook, injectLocal, provideLocal, useColorMode, usePreferredDark } from '@vueuse/core'
import { computed, watch } from 'vue'

export interface UseThemeProviderOptions<T extends string = string> extends UseColorModeOptions<T> {}

export interface UseThemeProviderReturn<T extends string = string> extends UseColorModeReturn<T> {
  isDark: ComputedRef<boolean>
  currentModeValue: ComputedRef<string>
  onThemeChange: EventHookOn<UseThemeProviderOnChangedResult<T>>
}

export type ThemeProviderContext<T extends string = string> = UseThemeProviderReturn<T>

export interface UseThemeProviderOnChangedResult<T extends string = string> {
  state: T
  data: string
}

export const THEME_PROVIDER_SYMBOL = Symbol('UseThemeProvider')

export function useThemeProvider<T extends string = string>(
  options?: UseThemeProviderOptions<T>,
): UseThemeProviderReturn<T> {
  // Get the color mode from VueUse
  const modes = {
    ...options?.modes,
  } as Record<string, string>

  const colorMode = useColorMode<T>(options)

  const prefersDark = usePreferredDark()
  const isDark = computed(() => colorMode.value === 'dark' && prefersDark)

  const currentModeValue = computed(() =>
    modes[colorMode.value] ?? colorMode.value)

  const onChanged = createEventHook<UseThemeProviderOnChangedResult>()

  watch(() => colorMode.state.value, (newMode) => {
    onChanged.trigger({
      state: newMode,
      data: currentModeValue.value,
    })
  }, { flush: 'post', immediate: true })

  const expose = Object.assign(colorMode, {
    isDark,
    currentModeValue,
    onThemeChange: onChanged.on,
  })

  provideLocal(THEME_PROVIDER_SYMBOL, expose as ThemeProviderContext<T>)

  return expose as UseThemeProviderReturn<T>
}

export function useThemeProviderInject<T extends string = string>(): ThemeProviderContext<T> {
  return injectLocal(THEME_PROVIDER_SYMBOL) as ThemeProviderContext<T>
}
