const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const JavaScriptObfuscator = require("webpack-obfuscator");
const TerserPlugin = require("terser-webpack-plugin");

const mode = process.env.NODE_ENV || "development";
const devMode = mode === "development";
const target = devMode ? "web" : "browserslist";
const devtool = devMode ? "source-map" : undefined;

const PATHS = {
  src: path.join(__dirname, "src"),
  build: path.join(__dirname, "build"),
  assets: "assets/",
};

const PGES_DIR = PATHS.src;
const PAGES = fs
  .readdirSync(PGES_DIR)
  .filter((filename) => filename.endsWith(".html"));
const polifill = "@babel/polyfill";

module.exports = {
  mode,
  target,
  devtool,
  devServer: {
    static: {
      directory: path.join(__dirname, "build"),
    },
    port: 8080,
    open: true,
    hot: true,
  },
  // entry: ['@babel/polyfill', path.resolve(__dirname, 'src', 'index.js')],
  entry: {
    polifill,
    app: PATHS.src,
    // calc: `${PATHS.src}/components/calc.js`,
  },
  output: {
    // path: path.resolve(__dirname, 'build'),
    path: PATHS.build,
    publicPath: "/",
    clean: true,
    // filename: 'index.[contenthash].js',
    filename: "[name].[hash].js",
    assetModuleFilename: "assets/imgs/[hash][ext]",
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        libs: {
          name: "libs",
          test: /node_modules/,
          chunks: "all",
          enforce: true,
        },
      },
    },
    minimize: true,
    minimizer: ["...", new CssMinimizerPlugin(), new TerserPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "style.[contenthash].css",
    }),
    // new BundleAnalyzerPlugin(),
    new JavaScriptObfuscator(
      {
        rotateStringArray: true,
      },
      ["abc.js"]
    ),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(c|sc|sa)ss$/i,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [[require("postcss-preset-env")]],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(woff|woff2|ttf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]",
        },
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          // {
          //   loader: 'file-loader', // WTF?
          // },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
        type: "asset/resource",
      },
      {
        test: /\.m?js$/i,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        // use: 'ts-loader',
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
          },
        },
      },
    ],
  },
};
