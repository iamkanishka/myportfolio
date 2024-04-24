import { IWhatILearnt, Tag, Icategory } from '../Common/Utilities/Data';

export interface ProjectorArticle {
  id?: string;
  title: string;
  description: string;
  uniqueId?: string;
  imageUrl: string;
  linkedInLink: string;
  githubLink: string;
  externalURL?:string
  mediumLink: string;
  imageURL: string;
  tags?: Tag[];
  technologyUsed?:string;
  whatiLearnt?:IWhatILearnt[],
 categories:String[]
}
