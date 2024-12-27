import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'], // Основной входной файл
  format: ['cjs', 'esm'], // Поддержка CommonJS и ES Modules
  dts: true, // Генерация файлов определений типов
  splitting: false, // Отключаем code splitting, так как это серверное приложение
  sourcemap: true, // Включаем source maps для отладки
  clean: true, // Очистка папки dist перед сборкой
  minify: false, // Отключаем минификацию для лучшей отладки
  outDir: 'dist', // Папка для собранных файлов
  target: 'node18', // Целевая версия Node.js
});
