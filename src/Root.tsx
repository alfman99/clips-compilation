/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Composition, continueRender, delayRender } from 'remotion';
import { ClipsCompilation } from './Composition';
import './style.css';
import { getVideoMetadata } from '@remotion/media-utils';
import { IClipsFailVideoInfo, IVideoInfo } from './types';
import { crearCapitulosYT, getMp4UrlCommand } from './util';

export const FPS = 30;
export const TRANSITION_DURATION = 1;
export const INTRO_DURATION = 1.6;
export const OUTRO_DURATION = 10;
export const TIMEBUFFER_TRANSITION = TRANSITION_DURATION * (FPS*2)
export const NUM_CLIPS = 42;

export const RemotionRoot: React.FC = () => {
  const [handle] = useState(() => delayRender())
  const [duration, setDuration] = useState(1);
  const [videos, setVideos] = useState<IVideoInfo[]>([]);

  const getAllVideosURLs = async () => {
    try {
      const promisesVideos = [];
      for (let i = 0; i < NUM_CLIPS; i += 15) {
        const urlParametrized = new URLSearchParams();
        urlParametrized.append('offset', i.toString());
        urlParametrized.append('streamerId', '90075649');
        // UrlParametrized.append('time', 'month');
        urlParametrized.append('orderBy', 'interval');
        urlParametrized.append('fromDate', new Date('2022-01-01').toISOString());
        urlParametrized.append('toDate', new Date('2022-12-31').toISOString());

        promisesVideos.push(fetch(`https://clips.fail/api/v1/getClips?${urlParametrized.toString()}`));
      }
      const allVideos = await Promise.all(promisesVideos);
      const allJsons = (await Promise.all(allVideos.map((video) => video.json()))).flat() as IClipsFailVideoInfo[];
      const videosSortedDescViews = allJsons.sort((a, b) => b.viewCount - a.viewCount);
      const relevantVideos = videosSortedDescViews.splice(0, NUM_CLIPS).reverse()

      console.log(crearCapitulosYT(relevantVideos))

      return relevantVideos;
    }
    catch (error) {
      console.error('[ERROR]', error);
      return [];
    }
  }

  useEffect(() => {
    getAllVideosURLs()
      .then((videos) => {
        const promisesMetadata = [];
        for (const video of videos) {
          const videoUrl = getMp4UrlCommand(video.thumbnailUrl);
          promisesMetadata.push(getVideoMetadata(videoUrl));
        }
        Promise.all(promisesMetadata)
          .then((videosMetadata) => {
            const totalDuration = videosMetadata.reduce((acc, curr) => acc + curr.durationInSeconds, 0);
            setDuration(Math.round(totalDuration));
            setVideos(videosMetadata.map((videoMetadata, index) => {
              continueRender(handle);
              return {
                ...videoMetadata,
                url: getMp4UrlCommand(videos[index].thumbnailUrl),
                title: videos[index].title,
                viewCount: videos[index].viewCount,
              }
            }));
          })
      })
      .catch((error) => {
        console.error('[ERROR]', error);
      })
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