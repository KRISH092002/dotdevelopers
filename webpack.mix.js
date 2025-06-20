const mix = require('laravel-mix');
const SvgSpritemapPlugin = require('svg-spritemap-webpack-plugin');

mix
  .js('resources/js/app.js', 'public/js').react()
  .postCss("resources/css/app.css", "public/css", [
    require('postcss-preset-mantine'),
    require('autoprefixer'),
    require("tailwindcss"),
  ])





// Webpack Configuration for SVG Spritemap
mix.webpackConfig({
    module: {
        rules: [
            {
                test: /\.svg$/,
                // exclude: /resources\/svg/, // Exclude spritemap SVGs
                use: ['file-loader'],
            },
        ],
    },
    plugins: [
        new SvgSpritemapPlugin('resources/svg/**/*.svg', {
            output: {
                filename: 'svg/spritemap.svg', // Correct path (relative to public/)
                svgo: true,
            },
            sprite: {
                prefix: 'icon-',  // Adds 'icon-' to all IDs
            },
        }),
    ],
});

