import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { CommentType } from '../../types/comment';
import { StoryType } from '../../types/story';
import {
  fetchCurrentComments,
  fetchCurrentStory,
  fetchStoriesIds,
  fetchStoryById,
} from './asyncActions';

type InitialState = {
  storiesIds: number[];
  stories: Array<StoryType | null>;
  currentStory: StoryType | null;
  currentComments: CommentType[] | null;
};

const initialState: InitialState = {
  storiesIds: [],
  stories: [],
  currentStory: null,
  currentComments: null,
};

export const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    updateStory(state, action: PayloadAction<StoryType>) {
      state.currentStory = action.payload;
    },
    setComments(state, action: PayloadAction<CommentType[]>) {
      state.currentComments = action.payload;
    },
    resetComments(state) {
      state.currentComments = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchStoriesIds.fulfilled, (state, action) => {
      state.storiesIds = action.payload;
      state.stories = new Array(state.storiesIds.length).fill(null);
    });

    builder.addCase(fetchStoryById.fulfilled, (state, action) => {
      state.stories[action.payload.index] = action.payload.story;
    });

    builder.addCase(fetchCurrentStory.fulfilled, (state, action) => {
      state.currentStory = action.payload;
    });

    builder.addCase(fetchCurrentComments.fulfilled, (state, action) => {
      state.currentComments = action.payload;
    });
  },
});

export const selectStoryByIndex = (index: number) => (state: RootState) =>
  state.stories.stories[index];

export const { updateStory, resetComments, setComments } = storiesSlice.actions;

export default storiesSlice.reducer;
