import { Audio, Video, staticFile } from "remotion";

const OutroSencilla = () => {

  return (
    <>
    <Audio src={staticFile('outro_song.mp3')} volume={0.35} />
    <div style={{ 
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: -1,
      backgroundColor: '#141517',
      filter: "brightness(0.6)",
    }}>
      <Video loop muted src={staticFile('outro.mp4')} className="h-full w-full object-cover" style={{ filter: "blur(1.5em)" }} />
    </div>
    </>
  )
}

export default OutroSencilla;