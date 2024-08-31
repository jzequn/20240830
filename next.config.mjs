/** @type {import('next').NextConfig} */
// const path = require("path");

import 'core-js/full/promise/with-resolvers.js';

const nextConfig = {
    webpack: (config, options) => {
        config.resolve.alias.canvas = false;
        return config;
    },

    experimental: {
        // You may not need this, it's just to support moduleResolution: 'node16'
        extensionAlias: {
            '.js': ['.tsx', '.ts', '.jsx', '.js'],
        },
        turbo: {
            resolveAlias: {
                // Turbopack does not support standard ESM import paths yet
                './Sample.js': './app/Sample.tsx',
                /**
                 * Critical: prevents " ⨯ ./node_modules/canvas/build/Release/canvas.node
                 * Module parse failed: Unexpected character '�' (1:0)" error
                 */
                canvas: './empty-module.ts',
            },
        },
        esmExternals: 'loose'
    },
    /**
     * Critical: prevents ''import', and 'export' cannot be used outside of module code" error
     * See https://github.com/vercel/next.js/pull/66817
     */
    swcMinify: false,
};

export default nextConfig;
