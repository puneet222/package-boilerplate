
const path = require('path')
const webpack = require('webpack');
const fs = require('fs');
const helpers = require('./webpack.helpers.js');
const WBMetaJsonGenerator = require("meta-json-generator");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const fileSystem = helpers.generateFS(__dirname + '/src/actions', "workerB")

const entryFiles = helpers.generateEntryPaths(fileSystem.children);

const mode = process.argv.filter(val => val.includes("--mode"));
let environment = "production";
if(mode.length > 0 && mode[0].includes("dev")) {
  environment = "development";
}

const entryPaths = helpers.getFiles(entryFiles, ".ts").map(file => file.replace('.ts', ''));

/**
 * Add a description of the required folders in folderDescriptionList 
 * as an object with path and description as property
 * 
 * @property {path} [string] relative path of the folder w.r.t. Entrypoint
 * EntryPoint => /src/actions
 * @property {description} [string] description for the folder
 * 
 * Example:
 * 
 * const folderDescriptionList = [
 *    {path: "/orgs", description: "List all the organizations"}
 * ]
 * 
 */

const folderDescriptionList = [
  {path: "/component", description: "List all the inner components and actions"}
]

/**
 * Add relevant <package name> and <package description> in 
 * WBMetaJsonGenerator in plugins
 * 
 */

module.exports = {
    entry: entryPaths.reduce((result, entryPath) => {
        result[entryPath] = "./src/actions/" + entryPath + ".ts"
        return result;
    }, {}),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        globalObject: 'this',
        libraryTarget: 'umd',
        library: 'main',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: { "presets": ["@babel/preset-env"] }
            }
        ]
    },
    plugins: [
        new WBMetaJsonGenerator({
            environment,
            package: "<*****package name*****>",
            packageDescription: "<*****add short package description*****>",
            folderDescriptionList
        })
    ],
    optimization: {
        minimizer: [
          new UglifyJsPlugin({
            uglifyOptions: {
              output: {
                comments: /(@description|@name|@ignore)/i,
              },
            }
          }),
        ],
      }
}