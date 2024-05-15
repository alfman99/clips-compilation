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
    valString += `${new Date(sumaSegundos * 1000).toISOString().slice(14, 19)} - Clip #${i+1}\n`
    sumaSegundos += vid.duration;
  }
  return valString;
}


const sendChaptersToPastebin = (chapters: string) => {

  const loginToPastebin = async () => {
    const data = new FormData();
    data.append('api_dev_key', 'f57aa11c621e7df39de4be8b3387b306');
    data.append('api_user_name', 'Impaktado');
    data.append('api_user_password', 'Alfredo1%');

    try {
      const response = await fetch('https://corsproxy.io/?https://pastebin.com/api/api_login.php', {
        method: 'POST',
        body: data
      })
      const text = await response.text();
      return text;
    } catch (error) {
      console.error('Error al logearse en pastebin: ', error);
      return null;
    }
  }



  return new Promise(async (resolve, reject) => {
    const login = await loginToPastebin();

    console.log('Login: ', login);

    if (!login) {
      reject('Error al logearse en pastebin');
      return;
    }

    const data = new FormData();
    data.append('api_dev_key', 'f57aa11c621e7df39de4be8b3387b306');
    data.append('api_paste_name', `Capitulos ${new Date().toISOString().slice(0, 10)}`);
    data.append('api_option', 'paste');
    data.append('api_paste_code', chapters);
    data.append('api_paste_private', '1');
    data.append('api_paste_expire_date', '1Y');
    data.append('api_user_key', login);
    console.log('Enviando capitulos a pastebin...');
    try {
      const response = await fetch('https://pastebin.com/api/api_post.php', {
        method: 'POST',
        mode: 'no-cors',
        body: data
      })
      const text = await response.text();
      console.log('URL PASTEBIN: ', text);
      resolve(text);
    } catch (error) {
      console.error('Error al enviar los capitulos a pastebin: ', error);
      reject(error);
    }
  });
}

export {
  getMp4UrlCommand,
  sendChaptersToPastebin,
  crearCapitulosYT
}