import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const libConfig: UserConfig = {
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'zero-antd-dep': path.resolve(__dirname, './local/zero-element-antd/src'),
    },
  },
  build: {
    outDir: 'lib',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'DynamicPageBuilder',
      fileName: 'index',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'zero-element', 'zero-element-antd', 'antd', '@emotion/react', '@emotion/styled', 'zero-antd-dep', 'lodash', 'qs'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          antd: 'antd',
        }
      }
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
};

const demoConfig: UserConfig = {
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'zero-antd-dep': path.resolve(__dirname, './local/zero-element-antd/src'),
    },
  },
  server: {
    port: 8080,
  },
  build: {
    outDir: 'dist/swaggerhub',
    rollupOptions: {
      output: {
        entryFileNames: 'bundle.js',
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
};

export default defineConfig(({ mode }) => {
  if (mode === 'lib') {
    return libConfig;
  }
  return demoConfig;
});
