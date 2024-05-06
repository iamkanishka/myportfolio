import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectorArticle } from '../../Types/ProjectorArticle.type';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class RestAPIServiceService {
  constructor(private http: HttpClient) {}
  async addDoc(
    dataType: string,
    projectorArticledata: ProjectorArticle
  ): Promise<any> {
    try {
      return await this.http.post(`${environment.MongoRESTAPIURL}${dataType}`, projectorArticledata).toPromise()
    } catch (err) {
      console.log(err);
      
    }
  }

async  updateDoc(
  dataType: string,
  projectorArticledata: ProjectorArticle,
  projectOrArticleId: string
): Promise<any> {
  try {
    return await this.http.patch(`${environment.MongoRESTAPIURL}${dataType}/${projectOrArticleId}`, projectorArticledata).toPromise()
  } catch (err) {
    return 
    console.log(err);
    
  }
}

async  deleteDoc(
  dataType: string, projectOrArticleId: string
): Promise<any> {
  try {
    return await this.http.delete(`${environment.MongoRESTAPIURL}${dataType}/${projectOrArticleId}`,).toPromise()
  } catch (err) {
    return 
    console.log(err);
    
  }
}


async  GetDocsBySearch(
  dataType: string, query: string): Promise<any> {
  try {
    return await this.http.get(`${environment.MongoRESTAPIURL}${dataType}/search/${query}`,).toPromise()
  } catch (err) {
    return 
    console.log(err);
    
  }
}






}
