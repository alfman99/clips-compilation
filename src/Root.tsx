/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Composition, continueRender, delayRender } from 'remotion';
import { ClipsCompilation } from './Composition';
import './style.css';
import { getVideoMetadata } from '@remotion/media-utils';
import { IClipsFailVideoInfo, IVideoInfo } from './types';
import { crearCapitulosYT, getMp4UrlCommand, sendChaptersToPastebin } from './util';

export const FPS = 30;
export const TRANSITION_DURATION = 0.19;
export const INTRO_DURATION = 0;
export const OUTRO_DURATION = 5;
export const TIMEBUFFER_TRANSITION = TRANSITION_DURATION * (FPS*2)
export const NUM_CLIPS = 50;
export const NUM_MIN_DURATION = 60*10;

const algoReorderVideosEngagement = (videos: IClipsFailVideoInfo[]) => { 
  // TODO: Crear un algoritmo que ordene los videos para maximizar el engagement
  videos = videos.sort((a, b) => a.viewCount - b.viewCount);

  const videosReturn = [];
  let duration = 0;
  while (duration < NUM_MIN_DURATION) {
    const video = videos.pop();
    if (!video) break;
    videosReturn.push(video);
    duration += video.duration;
  }
  return videosReturn;
}

export const RemotionRoot = () => {
  const [handle] = useState(() => delayRender('FETCH VIDEOS'))
  const [duration, setDuration] = useState(1);
  const [videos, setVideos] = useState<IVideoInfo[]>([]);

  const getAllVideosURLs = async () => {
    try {
      const promisesVideos = [];
      for (let i = 0; i < NUM_CLIPS; i += 45) {
        const urlParametrized = new URLSearchParams();
        urlParametrized.append('offset', i.toString());
        // urlParametrized.append('streamerId', '649885352');
        urlParametrized.append('time', 'month');
        urlParametrized.append('orderBy', 'viewed');
        // UrlParametrized.append('gameId', '506438');
        // urlParametrized.append('fromDate', new Date('2023-08-01').toISOString());
        // urlParametrized.append('toDate', new Date('2023-08-31').toISOString());
        urlParametrized.append('blocked', 'false');

        const urlFinal = `https://clips.fail/api/v1/getClips?${urlParametrized.toString()}`;
        console.log('URL: ', urlFinal);

        // No-cors para que no de error de CORS
        promisesVideos.push(fetch(urlFinal));
      }
      const allVideos = await Promise.all(promisesVideos);
      
      const allJsons = (await Promise.all(allVideos.map((video) => video.json()))).flat() as IClipsFailVideoInfo[];

      const videosSortedDescEngagement = algoReorderVideosEngagement(allJsons);

      return videosSortedDescEngagement;
    }
    catch (error) {
      console.error('[ERROR]', error);
      return [];
    }
  }

  const doAll = async () => {
    const videos = await getAllVideosURLs();
    const promisesMetadata = [];
    for (const video of videos) {
      const videoUrl = getMp4UrlCommand(video.thumbnailUrl);
      promisesMetadata.push(getVideoMetadata(videoUrl));
    }
    const videosMetadata = await Promise.all(promisesMetadata);
    console.log('[videosMetadata]', videosMetadata)
    const totalDuration = videosMetadata.reduce((acc, curr) => acc + curr.durationInSeconds, 0);
    console.log('[totalDuration]', totalDuration)
    console.log('[handle]', handle)
    setDuration(Math.round(totalDuration));
    setVideos(videosMetadata.map((videoMetadata, index) => {
      return {
        ...videoMetadata,
        url: getMp4UrlCommand(videos[index].thumbnailUrl),
        title: videos[index].title,
        viewCount: videos[index].viewCount,
      }
    }));

    const capitulos = crearCapitulosYT(videos);

    if (process.env.NODE_ENV !== 'development') {
      sendChaptersToPastebin(capitulos);
    }
    continueRender(handle);
  }

  useEffect(() => {
    doAll();
  }, [])

	return (
    <Composition
      id="ClipsCompilation"
      component={ClipsCompilation}
      durationInFrames={Math.round((duration + INTRO_DURATION + OUTRO_DURATION) * FPS)}
      width={1920}
      height={1080}
      fps={FPS}
      defaultProps={{ videos }} />
	);
};
