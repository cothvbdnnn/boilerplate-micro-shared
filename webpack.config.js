const merge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");
const webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "bizfly",
    projectName: "shared",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader",
        },
        {
          test: /\.(css|sass|scss)$/,
          exclude: /node_modules/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env),
      }),
    ],
    externals: [
      "vue",
      "bizfly-ui",
      "axios",
      "js-cookie",
      "vue-i18n",
      "dayjs",
      "ravenjs",
      "vue-raven",
    ],
  });
};
