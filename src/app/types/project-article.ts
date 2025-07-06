import { IWhatILearnt, Tag, Icategory } from '../common/utilities/data';

export interface ProjectorArticle {
  id?: string;
  title: string;
  description: string;
  uniqueId?: string;
  imageUrl: string;
  linkedInLink: string;
  githubLink: string;
  externalURL?: string;
  mediumLink: string;
  imageURL: string;
  tags?: Tag[];
  technologyUsed?: string;
  whatiLearnt?: IWhatILearnt[];
  categories: String[];
  updated_at?: Date;
  created_at?: Date;
}
