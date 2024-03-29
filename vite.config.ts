import path from "path"
import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import React from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    RubyPlugin(),
    React({
      exclude: /\.(stories|spec|test)\.(t|j)sx?$/,
      include: '**/*.tsx',
    }),
  ],
  resolve:{
    alias:{
      '@' : path.resolve(__dirname, './app/frontend')
    },
  }
})
