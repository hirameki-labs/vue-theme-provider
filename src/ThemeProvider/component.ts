import type { Reactive, SlotsType } from 'vue'
import type { UseThemeProviderOptions, UseThemeProviderReturn } from './composable'

import {
  defineComponent,
  reactive,
} from 'vue'
import { useThemeProvider } from './composable'

export interface ThemeProviderSlots {
  default: (data: Reactive<
    {
      colorMode: UseThemeProviderReturn['value']
      state: UseThemeProviderReturn['state']
      system: UseThemeProviderReturn['system']
      store: UseThemeProviderReturn['store']
      isDark: UseThemeProviderReturn['isDark']
      currentModeValue: UseThemeProviderReturn['currentModeValue']
      onThemeChange: UseThemeProviderReturn['onThemeChange']
    }
  >) => any
}

export interface ThemeProviderProps extends UseThemeProviderOptions {};

export const ThemeProvider = /* #__PURE__ */ defineComponent<
  ThemeProviderProps,
  Record<string, never>,
  string,
  SlotsType<ThemeProviderSlots>
>(
  (props, { slots }) => {
    const theme = useThemeProvider(props)

    const data = reactive({
      colorMode: theme.value,
      state: theme.state.value,
      system: theme.system.value,
      store: theme.store.value,
      isDark: theme.isDark.value,
      currentModeValue: theme.currentModeValue.value,
      onThemeChange: theme.onThemeChange,
    })

    return () => {
      if (slots.default) {
        return slots.default(data)
      }
    }
  },
  {
    name: 'ThemeProvider',
    props: [
      'modes',
      'storageKey',
    ],
  },
)
