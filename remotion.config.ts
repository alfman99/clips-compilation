import {Config} from '@remotion/cli/config';
import {webpackOverride} from './src/webpack-override';

Config.setVideoImageFormat('jpeg');

Config.setOverwriteOutput(true);
Config.setCodec('h264');
Config.setCrf(2)

Config.overrideWebpackConfig(webpackOverride);