import { Tag } from "../Common/Utilities/Data";

export interface ProjectorArticle {
  id?:string
    title: string;
    description: string;
    imageUrl: string;
    linkedInLink: string;
    githubLink: string;
    mediumLink: string;
    imageURL:string;
    tags?: Tag[];
  }