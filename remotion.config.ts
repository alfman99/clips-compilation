import {Config} from 'remotion';
import {webpackOverride} from './src/webpack-override';

Config.Rendering.setImageFormat('jpeg');

Config.Output.setOverwriteOutput(true);
Config.Output.setCodec('h264');
Config.Output.setCrf(2)

Config.Bundling.overrideWebpackConfig(webpackOverride);
