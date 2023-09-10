import {Audio, OffthreadVideo, Sequence, staticFile} from 'remotion'
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
    let from = 0;
    for (let i = 0; i < index; i++) {
      from += Math.round(videos[i].durationInSeconds * FPS);
    }
    from += TRANSITION_DURATION * FPS;
    return from - TIMEBUFFER_TRANSITION;
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
            <Sequence key={index} name={video.title} durationInFrames={Math.round(video.durationInSeconds * FPS) + TIMEBUFFER_TRANSITION} from={calculateFrom(index)}>
              {
                index === 0 ? (
                  <>
                    <OffthreadVideo src={video.url} />
                  </>
                ) : (
                  <Transition type="in">
                    <Audio volume={0.4} src={staticFile('swoosh.mp3')} />
                    {
                      index === 4 && <CallToAction />
                    }
                    <OffthreadVideo src={video.url} />
                  </Transition>
                )
              }
            </Sequence>
        )
      })
    )
  }

  return (
    <>
      {/* <Sequence durationInFrames={(INTRO_DURATION * FPS) + TIMEBUFFER_TRANSITION}>
        <Intro />
      </Sequence> */}
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
