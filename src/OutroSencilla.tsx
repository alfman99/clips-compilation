import { Audio, Video, staticFile } from "remotion";

const OutroSencilla = () => {

  return (
    <>
      <h1 style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '5em',
        fontWeight: 'bold',
        zIndex: 1000,
      }}>Clips.fail</h1>
      <div style={{
        backgroundColor: 'black',
      }}>
        <Audio src={staticFile('outro_song.mp3')} volume={0.35} />
        <Video width={'100%'} loop muted src={staticFile('outro.mp4')} className="h-full w-full object-cover" style={{ filter: "blur(1.5em)" }} />
      </div>
    </>
  )
}

export default OutroSencilla;