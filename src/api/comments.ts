import { CommentType } from '../types/comment';
import axios from './axios';

export const getCommentById = async (id: number) => {
  const { data: comment } = await axios.get<CommentType>(`item/${id}.json`);

  return comment;
};
