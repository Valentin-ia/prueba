import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    outDir: 'supabase-dist',
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(process.cwd(), 'supabase-auth.html')
    }
  }
});
