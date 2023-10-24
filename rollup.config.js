import path from 'path';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs'; // commonjs模块转换插件
import cleanup from 'rollup-plugin-cleanup';
import ts from 'rollup-plugin-typescript2';
import alias from 'rollup-plugin-alias';

const plugins = [
    cleanup(),
    json(),
    nodeResolve(),
    ts({
        tsconfig: path.resolve(__dirname, './tsconfig.json'), // 导入本地ts配置
        clean: true,
        useTsconfigDeclarationDir: true,
        tsconfigOverride: {
            compilerOptions: {
                target: 'es5',
                downlevelIteration: true,
            },
        },
    }),
    commonjs(),
    alias({
        entries: [{ find: '@', replacement: './lib' }],
    }),
    terser(),
];

module.exports = {
    input: path.resolve('./lib/index.ts'),
    output: [
        {
            exports: 'auto',
            file: path.resolve(__dirname, './dist/pinyin-pro.min.js'),
            format: 'umd',
            name: 'pinyinPro',
        },
    ],
    plugins,
};
