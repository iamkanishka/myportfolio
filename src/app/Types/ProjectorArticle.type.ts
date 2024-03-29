import { IWhatILearnt, Tag } from '../Common/Utilities/Data';

export interface ProjectorArticle {
  id?: string;
  title: string;
  description: string;
  uniqueId?: string;
  imageUrl: string;
  linkedInLink: string;
  githubLink: string;
  mediumLink: string;
  imageURL: string;
  tags?: Tag[];
  whatiLearnt?:IWhatILearnt[],
  isPinned?:boolean
}
