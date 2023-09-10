import {Img} from 'remotion'
import {staticFile} from 'remotion'
import { Animated } from 'remotion-animated';
import Move from 'remotion-animated/dist/animations/Move';
import { Greenscreen } from "./GreenScreen";
import { FPS } from './Root';

const CallToAction = () => {

  // Const frame = useCurrentFrame();


  // const calculateScale = (frame: number) => {
  //   if (frame < 20) {
  //     return 0;
  //   }
  //   if (frame < 66) {
  //     return (frame - 20) / 50;
  //   }
  //   if (frame < 225) {
  //     return (66 - 20) / 50;
  //   }
  //   return 0;
  // }

  // const calculatePosY = (frame: number) => {
  //   if (frame < 200) {
  //     return 0;
  //   }
  //   if (frame < 425) {
  //     return (frame - 200) * 5;
  //   }
  //   return 200;
  // }

  return (
    <div className='relative w-full h-full'>
      <Animated animations={[
        Move({ y: 300, start: 7*FPS, duration: 100 }),
      ]}>
        <div className='absolute' style={{
          bottom: '-55em',
          right: '32em',
        }}>
          <Greenscreen style={{
            width: '40em'
          }} opacity={0} videoPath={staticFile('CALLTOACTION.mp4')} />
          <Img className='relative w-20 items-center' style={{
            top: '9em',
            left: '3em',
          }} src={staticFile('favicon.ico')} />
        </div>
      </Animated>
    </div>
  )
}

export default CallToAction;