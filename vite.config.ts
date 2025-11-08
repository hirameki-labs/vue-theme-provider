import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import Markdown from 'unplugin-vue-markdown/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  root: './playground',
  // eslint-disable-next-line node/prefer-global/process
  base: process.env.BASE_URL || '/',
  plugins: [vue(
    {
      include: [/\.vue$/, /\.md$/],
    },
  ), tailwindcss(), Markdown({}), Icons({})],
})
