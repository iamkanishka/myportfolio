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
      return await this.http.post(`${environment.MongoRESTAPIURL}/${dataType}`, projectorArticledata).toPromise()
    } catch (err) {
      console.log(err);
      
    }
  }

async  updateDoc(
  dataType: string,
  projectorArticledata: ProjectorArticle
): Promise<any> {
  try {
    return await this.http.post(`${environment.MongoRESTAPIURL}/${dataType}/${projectorArticledata.id}`, projectorArticledata).toPromise()
  } catch (err) {
    return 
    console.log(err);
    
  }
}
}
