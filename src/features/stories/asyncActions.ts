import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';
import { RootState } from '../../app/store';
import { CommentType } from '../../types/comment';
import { StoryType } from '../../types/story';

export const fetchStoriesIds = createAsyncThunk<number[], void>(
  'stories/fetchStoriesIds',
  async () => {
    const storiesIds = await api.stories.getStoriesIds();

    return storiesIds;
  }
);

export const fetchStoryById = createAsyncThunk<
  { story: StoryType; index: number },
  number,
  {
    state: RootState;
  }
>('stories/fetchStoryById', async (id, thunkApi) => {
  const story = await api.stories.getStoryById(id);
  const state = thunkApi.getState();
  const index = state.stories.storiesIds.findIndex(curId => curId === id);

  return { story, index };
});

export const fetchCurrentStory = createAsyncThunk<StoryType, number>(
  'stories/fetchCurrentStory',
  async id => {
    const story = await api.stories.getStoryById(id);

    return story;
  }
);

export const fetchCurrentComments = createAsyncThunk<CommentType[], number[]>(
  'stories/fetchCurrentComments',
  async commentsIds => {
    const comments = await Promise.all(commentsIds.map(api.comments.getCommentById));

    return comments;
  }
);
