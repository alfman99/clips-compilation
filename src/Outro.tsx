import {Img, useCurrentFrame} from 'remotion'
import {interpolate} from 'remotion'
import { Audio, staticFile } from "remotion";

const Outro = () => {

  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1]); // 0.5

  return (
    <>
      <Audio src={staticFile('outro_song.mp3')} volume={0.4} />
      {/* <Img className='absolute w-full h-full' src='https://img.freepik.com/premium-vector/youtube-end-screen-template_562076-202.jpg?w=996' style={{
        opacity: 0.5,
      }} /> */}
      <div className='flex h-full w-full bg-gray-700 items-center justify-center font-mono' style={{
        opacity,
        backgroundColor: '#11001a',
      }}>
        {/* <div className='absolute top-52 -right-1/2 h-2 w-full' style={{
          backgroundColor: '#BD2457',
          filter: 'drop-shadow(0 0 2px #fff) drop-shadow(0 0 3px #fff) drop-shadow(0 0 4px #e60073) drop-shadow(0 0 7px #e60073)',
          rotate: '-70deg'
        }} />
        <div className='absolute top-52 -right-1/3 h-2 w-full' style={{
          backgroundColor: '#BD2457',
          filter: 'drop-shadow(0 0 2px #fff) drop-shadow(0 0 3px #fff) drop-shadow(0 0 4px #e60073) drop-shadow(0 0 7px #e60073)',
          rotate: '-70deg'
        }} /> */}
        <h1 className='absolute top-32 left-96 text-7xl font-extrabold text-white' style={{
          filter: 'drop-shadow(0 0 2px #000) drop-shadow(0 0 4px #fff)'
        }}>Suscribete</h1>
        <h1 className='absolute bottom-28 text-7xl font-extrabold text-white' style={{
          left: '7.7em',
          filter: 'drop-shadow(0 0 2px #000) drop-shadow(0 0 4px #fff)'
        }}>Recomendación</h1>
        <Img src={staticFile('arrow.webp')} className='absolute w-48' style={{
          bottom: '8em',
          left: '22em',
          zIndex: 1,
          filter: 'invert(1) drop-shadow(0 0 2px #fff) drop-shadow(0 0 3px #fff) drop-shadow(0 0 4px #e60073) drop-shadow(0 0 7px #e60073)',
          transform: 'scaleX(-1) rotate(70deg)',
        }} /> 
        <Img src={staticFile('arrow.webp')} className='absolute w-48' style={{
          top: '8em',
          left: '50em',
          zIndex: 1,
          filter: 'invert(1) drop-shadow(0 0 2px #fff) drop-shadow(0 0 3px #fff) drop-shadow(0 0 4px #e60073) drop-shadow(0 0 7px #e60073)',
          transform: 'scaleX(-1) rotate(-100deg)',
        }} /> 
        {/* <rect className='absolute h-72' style={{
          left: '4.5em',
          width: '40.88em',
          height: '25em',
          backgroundColor: '#BD2457',
          filter: 'drop-shadow(0 0 4px #fff) drop-shadow(0 0 6px #fff) drop-shadow(0 0 8px #e60073) drop-shadow(0 0 14px #e60073)',
        }} /> */}
        <div className='absolute flex flex-col right-28 gap-32'>
          <rect className='flex h-72 right-28 justify-center items-center' style={{
            width: '38.9em',
            height: '7em',
            backgroundColor: '#BD2457',
            filter: 'drop-shadow(0 0 2px #fff) drop-shadow(0 0 3px #fff) drop-shadow(0 0 4px #e60073) drop-shadow(0 0 7px #e60073)',
          }}>
            <Img src={staticFile('website.png')} className='w-16 mr-10' style={{
              filter: 'brightness(0) invert(1)'
            }} />
            <h1 className='text-6xl text-white'>Clips.fail</h1>
          </rect>
          <rect className='flex h-72 right-28 justify-center items-center' style={{
            width: '38.9em',
            height: '7em',
            backgroundColor: '#BD2457',
            filter: 'drop-shadow(0 0 2px #fff) drop-shadow(0 0 3px #fff) drop-shadow(0 0 4px #e60073) drop-shadow(0 0 7px #e60073)',
          }}>
            <Img src={staticFile('pulgar_like.png')} className='w-16 mr-10' style={{
              filter: 'invert(1)'
            }} />
            <h1 className='text-6xl text-white'>Dale a like</h1>
          </rect>
        </div>
        {/* <circle className='absolute h-80 w-80 rounded-full' style={{
          backgroundColor: '#BD2457',
          filter: 'drop-shadow(0 0 4px #fff) drop-shadow(0 0 6px #fff) drop-shadow(0 0 8px #e60073) drop-shadow(0 0 14px #e60073)',
        }} /> */}
      </div>
    </>
  )
}

export default Outro;