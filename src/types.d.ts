import type { VideoMetadata } from '@remotion/media-utils/dist/types';

export interface IVideoInfo extends VideoMetadata {
  url: string;
  title: string;
  viewCount: number;
}

export interface IClipsFailVideoInfo {
  id: string,
  broadcasterId: string,
  gameId: string,
  title: string,
  viewCount: number,
  createdAt: string,
  thumbnailUrl: string,
  duration: number,
  updatedAt: string,
  ytId: null,
  favs: number,
  hotness: number
}