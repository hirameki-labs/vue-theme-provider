<script setup lang="ts">
import Readme from '../../README.md'
import { ThemeProvider } from '../../src/ThemeProvider'
import ChildComponent from './components/ChildComponent.vue'
import GithubBanner from './components/GithubBanner.vue'
import ProviderComposable from './components/ProviderComposable.vue'
import { THEME_MODES } from './constant'
</script>

<template>
  <div class="h-screen">
    <GithubBanner />

    <div class="flex flex-col flex-1 items-center justify-center pt-10">
      <h2 class="text-2xl mb-3">
        Vue Theme Provider Playground
      </h2>

      <div class="card bg-zinc-800 max-h-1/2 max-w-3/4 w-3/4 ">
        <div>
          <ThemeProvider
            :modes="THEME_MODES"
          >
            <ChildComponent v-if="false" />
          </ThemeProvider>

          <ProviderComposable />
        </div>
      </div>
    </div>
    <div>
      <!-- <div class="p-12">
        <Readme />
      </div> -->
    </div>
  </div>
</template>
