import {useCurrentFrame} from 'remotion'
import {Img} from 'remotion'
import {staticFile} from 'remotion'
import { Greenscreen } from "./GreenScreen";

const CallToAction = () => {

  const frame = useCurrentFrame();


  const calculateScale = (frame: number) => {
    if (frame < 20) {
      return 0;
    }
    if (frame < 66) {
      return (frame - 20) / 50;
    }
    if (frame < 225) {
      return (66 - 20) / 50;
    }
    return 0;
  }

  const calculatePosY = (frame: number) => {
    if (frame < 200) {
      return 0;
    }
    if (frame < 425) {
      return (frame - 200) * 5;
    }
    return 200;
  }

  return (
    <div className='relative w-full h-full'>
      <div className='absolute' style={{
        bottom: '-55em',
        right: '32em',
        transform: `translateY(${calculatePosY(frame)}px)`
      }}>
        <Greenscreen style={{
          width: '40em'
        }} opacity={0} videoPath={staticFile('CALLTOACTION.mp4')} />
        <Img className='relative w-20' style={{
          top: '9em',
          left: '3em',
          transform: `scale(${calculateScale(frame )})`
        }} src={staticFile('favicon.ico')} />
      </div>
    </div>
  )
}

export default CallToAction;