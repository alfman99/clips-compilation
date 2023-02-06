/* eslint-disable @remotion/volume-callback */
import { Video, Sequence, Audio, interpolate, staticFile, useCurrentFrame, Img } from 'remotion'
import { FPS, INTRO_DURATION, TIMEBUFFER_TRANSITION } from './Root'

const Intro = () => {

  const frame = useCurrentFrame();

  const scaleText = interpolate(frame, [15, INTRO_DURATION * FPS / 2], [0, 1.3], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  })

  const rotateLogo = interpolate(frame, [15, INTRO_DURATION * FPS / 1.3], [0, 350], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <div className='h-full w-full bg-black'>
      <Sequence durationInFrames={15}>
        <Audio src={staticFile('bzzt_tv.mp3')} volume={0.4} />
        <Video src={staticFile('tv_estatica.mp4')} />
      </Sequence>

      <Sequence from={15} durationInFrames={75 + TIMEBUFFER_TRANSITION}>
        <Audio src={staticFile('omfg_hello.mp3')} volume={(f) =>
          interpolate(f, [0, INTRO_DURATION * FPS + FPS], [1, 0], { extrapolateLeft: "clamp" })
        } />
        <div className='w-full h-full' style={{
          backgroundColor: '#11001a',
        }}>
          <Audio src={staticFile('encender_tv.mp3')} volume={0.4} />
          <div className='flex h-full w-full flex-col items-center justify-center' style={{
            transform: `scale(${scaleText})`,
          }}>
            <div className='flex flex-row items-center gap-10' style={{
              filter: 'drop-shadow(0 0 2px #fff) drop-shadow(0 0 3px #fff) drop-shadow(0 0 4px #e60073) drop-shadow(0 0 7px #e60073)',
            }}>
              <Img src={staticFile('favicon.ico')} style={{
                width: 150,
                height: 150,
                transform: `rotate(${rotateLogo}deg)`,
              }} />
              <h1 className='text-9xl font-extrabold h-44' style={{
                color: '#BD2457',
              }}>Clips.fail</h1>
            </div>
            <h2 className='text-5xl font-normal font-mono tracking-tighter text-white' style={{
              filter: 'drop-shadow(0 0 2px #000) drop-shadow(0 0 4px #fff)'
            }}>Tu página de clips de confianza</h2>
          </div>
        </div>
      </Sequence>
    </div>
  )
}

export default Intro;