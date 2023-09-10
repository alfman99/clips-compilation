import { Audio, Video, staticFile } from "remotion";

const OutroSencilla = () => {

  return (
    <>
    <div className="absolute h-full w-full" style={{ 
      zIndex: -1,
      backgroundColor: '#141517',
      filter: "brightness(0.6)",
    }}>
      <Video loop muted src={staticFile('outro.mp4')} className="h-full w-full object-cover" style={{ filter: "blur(1.5em)" }} />
    </div>
    <div className="flex h-full w-full items-center justify-center font-sans">
      <Audio src={staticFile('outro_song.mp3')} volume={0.35} />
      <div className="flex flex-col items-center justify-center" style={{ color: '#D92067' }}>
     <h1 className="font-bold text-8xl" style={{WebkitTextStroke: '3px lightgreen'}}>Compartelo con tus amigos!</h1>
        <br />
        <br />
        <h1 style={{WebkitTextStroke: '1px lightgreen'}} className="font-bold text-6xl">Nos vemos en el próximo video 💓</h1>
        <h1 style={{WebkitTextStroke: '1px lightgreen'}} className="font-bold text-6xl">Gracias por ver!</h1>
      </div>
    </div>
    </>
  )
}

export default OutroSencilla;