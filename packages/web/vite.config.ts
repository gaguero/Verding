import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load environment variables based on mode
  const env = loadEnv(mode, process.cwd(), '');
  const isProduction = mode === 'production';
  const isDevelopment = mode === 'development';
  const isTest = mode === 'test';

  return {
    plugins: [
      react({
        // Enhanced React plugin configuration
        babel: {
          plugins: isDevelopment ? [] : [],
          presets: [
            ['@babel/preset-react', { runtime: 'automatic' }],
            ['@babel/preset-typescript'],
          ],
        },
      }),
    ],
    
    // Enhanced build configuration
    build: {
      outDir: 'dist',
      sourcemap: isProduction ? 'hidden' : true,
      minify: isProduction ? 'esbuild' : false,
      target: 'es2020',
      cssTarget: 'chrome80',
      reportCompressedSize: true,
      chunkSizeWarningLimit: 1000,
      
      rollupOptions: {
        output: {
          // Enhanced chunking strategy
          manualChunks: {
            // Core framework
            react: ['react', 'react-dom'],
            
            // Routing and navigation
            router: ['react-router-dom'],
            
            // Data fetching and state management
            query: ['@tanstack/react-query'],
            store: ['zustand'],
            
            // Backend integration
            supabase: ['@supabase/supabase-js'],
            
            // Validation and utilities
            utils: ['zod'],
            
            // Shared utilities
            shared: ['@verding/shared'],
          },
          
          // File naming for caching optimization
          entryFileNames: isProduction 
            ? 'assets/[name].[hash].js' 
            : 'assets/[name].js',
          chunkFileNames: isProduction 
            ? 'assets/[name].[hash].js' 
            : 'assets/[name].js',
          assetFileNames: isProduction 
            ? 'assets/[name].[hash].[ext]' 
            : 'assets/[name].[ext]',
        },
        
        // External dependencies for optimization
        external: isProduction ? [] : [],
      },
    },

    // Enhanced development server
    server: {
      port: 3000,
      host: true,
      cors: true,
      strictPort: true,
      
      proxy: {
        '/api': {
          target: env['VITE_API_BASE_URL'] || 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('proxy error', err);
            });
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('Sending Request to the Target:', req.method, req.url);
            });
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
            });
          },
        },
      },
      
      // Performance optimizations
      fs: {
        strict: true,
      },
    },

    // Enhanced preview server (for production builds)
    preview: {
      port: 3000,
      host: true,
      strictPort: true,
      cors: true,
    },

    // Enhanced path resolution
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@shared': resolve(__dirname, '../shared/src'),
        '@components': resolve(__dirname, './src/components'),
        '@pages': resolve(__dirname, './src/pages'),
        '@config': resolve(__dirname, './src/config'),
        '@test': resolve(__dirname, './src/test'),
        '@assets': resolve(__dirname, './src/assets'),
        '@styles': resolve(__dirname, './src/styles'),
        '@utils': resolve(__dirname, './src/utils'),
        '@hooks': resolve(__dirname, './src/hooks'),
        '@store': resolve(__dirname, './src/store'),
        '@types': resolve(__dirname, './src/types'),
      },
    },

    // Environment variables configuration
    envPrefix: ['VITE_', 'REACT_APP_'],
    envDir: resolve(__dirname, '../../'),

    // Enhanced testing configuration
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      css: true,
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: [
          'node_modules/',
          'src/test/',
          '**/*.d.ts',
          '**/*.config.*',
          '**/dist/**',
        ],
        thresholds: {
          global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
          },
        },
      },
      testTimeout: 10000,
      hookTimeout: 10000,
    },

    // Enhanced optimization
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@tanstack/react-query',
        '@supabase/supabase-js',
        'zustand',
        'zod',
        '@verding/shared',
      ],
      exclude: ['@tanstack/react-query-devtools'],
      esbuildOptions: {
        target: 'es2020',
      },
    },

    // Enhanced global constants
    define: {
      __APP_VERSION__: JSON.stringify(env['npm_package_version'] || '0.1.1'),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
      __APP_NAME__: JSON.stringify('Verding'),
      __ENVIRONMENT__: JSON.stringify(mode),
      __IS_PRODUCTION__: JSON.stringify(isProduction),
      __IS_DEVELOPMENT__: JSON.stringify(isDevelopment),
      __IS_TEST__: JSON.stringify(isTest),
    },

    // CSS configuration
    css: {
      devSourcemap: isDevelopment,
      modules: {
        localsConvention: 'camelCaseOnly',
        generateScopedName: isDevelopment 
          ? '[name]__[local]___[hash:base64:5]'
          : '[hash:base64:5]',
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`,
        },
      },
    },

    // Worker configuration
    worker: {
      format: 'es',
    },

    // JSON configuration
    json: {
      namedExports: true,
      stringify: false,
    },

    // Enhanced security and performance settings
    experimental: {
      renderBuiltUrl(filename: string, { hostType }: { hostType: 'js' | 'css' | 'html' }) {
        if (hostType === 'js') {
          return { js: `/${filename}` };
        } else {
          return { relative: true };
        }
      },
    },

    // Logging configuration
    logLevel: isDevelopment ? 'info' : 'warn',
    clearScreen: !isTest,
  };
}); 