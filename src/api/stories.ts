import config from '../config';
import { StoryType } from '../types/story';
import axios from './axios';

export const getStoriesIds = async () => {
  const { data: storiesIds } = await axios.get<number[]>(
    `newstories.json?print=pretty&orderBy="$priority"&limitToFirst=${config.storiesLimit}`
  );

  return storiesIds;
};

export const getStoryById = async (id: number) => {
  const { data: story } = await axios.get<StoryType>(`item/${id}.json`);

  return story;
};
