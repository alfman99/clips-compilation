import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');

Config.setOverwriteOutput(true);
Config.setCodec('h264');
Config.setCrf(2)

// Disable cors protection
Config.setChromiumDisableWebSecurity(true);