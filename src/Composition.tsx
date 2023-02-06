import {Audio, Sequence, staticFile} from 'remotion'
import {Video} from 'remotion'
import CallToAction from './CallToAction';
import Intro from './Intro';
import Outro from './Outro';
import { FPS, INTRO_DURATION, OUTRO_DURATION, TIMEBUFFER_TRANSITION, TRANSITION_DURATION } from './Root';
import { Transition } from './Transition';
import { IVideoInfo } from './types';

export interface IClipsCompilationProps {
  videos: IVideoInfo[];
}

export const ClipsCompilation = ({ videos }: IClipsCompilationProps) => {
  const calculateFrom = (index: number) => {
    let from = INTRO_DURATION * FPS;
    for (let i = 0; i < index; i++) {
      from += Math.round(videos[i].durationInSeconds * FPS);
    }
    from += TRANSITION_DURATION * FPS;
    return from;
  }

  const renderNumPos = (index: number, total: number) => {
    const position = total - index;
    const colorText = position === 1 ? 'text-amber-400' : position === 2 ? 'text-neutral-300' : position === 3 ? 'text-orange-600' : 'text-white';
    const colorBg = position === 1 ? 'bg-amber-400' : position === 2 ? 'bg-neutral-300' : position === 3 ? 'bg-orange-600' : 'bg-black';
    return (
      <div className={`absolute top-4 right-5 bg-black rounded-md px-3 pb-1 bg-opacity-30 ${colorBg}`}>
        <h1 className={`text-5xl font-bold drop-shadow-lg ${colorText}`}># {total - index} </h1>
      </div>
    )
  }

  const renderAllVideos = () => {
    return (
      videos.map((video, index) => {
        return (
          <>
            <Sequence key={index} name={video.title} durationInFrames={Math.round(video.durationInSeconds * FPS) + TIMEBUFFER_TRANSITION} from={calculateFrom(index)}>
              <Transition type="in">
                <Audio volume={0.4} src={staticFile('swoosh.mp3')} />
                {renderNumPos(index, videos.length)}
                {/* <div className='absolute top-4 right-5 bg-black rounded-md px-3 pb-1 pt-2 bg-opacity-30'>
                  <h1 className='text-5xl font-bold text-white drop-shadow-lg max-w-5xl text-center truncate h-14'>{video.title}</h1>
                  <h2 className='text-white'>{video.viewCount}</h2>
                </div> */}
                {
                  index === 3 && <CallToAction />
                }
                <Video src={video.url} />
              </Transition>
            </Sequence>
          </>
        )
      })
    )
  }

  return (
    <>
      <Sequence durationInFrames={(INTRO_DURATION * FPS) + TIMEBUFFER_TRANSITION}>
        <Intro />
      </Sequence>
      {renderAllVideos()}
      {
        videos.length > 0 && (
          <Sequence from={calculateFrom(videos.length - 1) + Math.round(videos[videos.length - 1].durationInSeconds * FPS) - Number(FPS)} durationInFrames={(OUTRO_DURATION * FPS) + TIMEBUFFER_TRANSITION}>
            <Transition type="in">
              <Outro/>
            </Transition>
          </Sequence>
        )
      }
    </>
  );
};
