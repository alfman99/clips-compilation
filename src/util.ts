import { IClipsFailVideoInfo } from "./types";

const getMp4UrlCommand = (thumbnailUrl: string) => {
  const thumbNailUrlSplitted = thumbnailUrl.split('-preview-')[0];
  return `${thumbNailUrlSplitted}.mp4`;
};

const crearCapitulosYT = (videos: IClipsFailVideoInfo[]) => {
  let valString = "";
  let sumaSegundos = 0;
  for (let i = 0; i < videos.length; i++) {
    const vid = videos[i];
    valString += `${new Date(sumaSegundos * 1000).toISOString().slice(14, 19)} - #${videos.length - i}\n`
    sumaSegundos += vid.duration;
  }
  return valString;
}

export {
  getMp4UrlCommand,
  crearCapitulosYT
}