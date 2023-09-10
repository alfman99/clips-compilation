import {Config} from '@remotion/cli/config';
import {webpackOverride} from './src/webpack-override';

Config.setVideoImageFormat('jpeg');

Config.setOverwriteOutput(true);
Config.setCodec('h264');
Config.setVideoBitrate('9000k')


Config.overrideWebpackConfig(webpackOverride);
