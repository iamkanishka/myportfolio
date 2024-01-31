import { Inject, Injectable } from '@angular/core';
import {
  getDocs,
  addDoc,
  collection,
  DocumentReference,
  DocumentData,
  QuerySnapshot,
  where,
  query,
  doc,
  getDoc,
  DocumentSnapshot,
  deleteDoc,
  updateDoc,
  getFirestore,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
} from '@angular/fire/firestore';
import { ProjectorArticle } from '../Types/ProjectorArticle.type';

@Injectable({
  providedIn: 'root',
})
export class FirebaseDBService {
  db = getFirestore();

  constructor() {}

  async addDocument(
    dataType: string,
    projectorArticledata: ProjectorArticle
  ): Promise<DocumentReference<DocumentData, DocumentData> | undefined> {
    try {
      const docRef = await addDoc(
        collection(this.db, dataType),
        projectorArticledata
      );
      return docRef;
    } catch (e) {
      console.error('Error adding : ' + dataType, e);
      return;
    }
  }

  async getAllDocuments(
    dataType: string,
    dataLimit?: number
  ): Promise<QuerySnapshot<DocumentData, DocumentData> | undefined> {
    try {
      let querySnapshot;
      if (dataLimit) {
        querySnapshot = await getDocs(
          query(
            collection(this.db, dataType),
            orderBy('createdAt'),
            limit(dataLimit)
          )
        );
      } else {
        querySnapshot = await getDocs(
          query(collection(this.db, dataType), orderBy('createdAt'))
        );
      }
      return querySnapshot;
    } catch (e) {
      console.error(`Error fetching ${dataType}  document: `, e);
      return;
    }
  }

  async getFilteredDocumentsByTags(
    tagKeyword: string,
    dataType: string
  ): Promise<QuerySnapshot<DocumentData, DocumentData> | undefined> {
    try {
      const q = query(
        collection(this.db, dataType),
        where('tags', 'array-contains', tagKeyword)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot;
    } catch (e) {
      console.error(`Error fetching ${dataType}  document: `, e);
      return;
    }
  }

  async getDocumentId(
    id: string,
    dataType: string
  ): Promise<DocumentSnapshot<DocumentData, DocumentData> | undefined> {
    try {
      const docRef = doc(this.db, dataType, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log('No such document!');
      }

      return docSnap;
    } catch (e) {
      console.error(`Error fetching ${dataType}  document: `, e);
      return;
    }
  }

  async deleteDocumentId(
    id: string,
    dataType: string
  ): Promise<void | undefined> {
    try {
      const deletedoc = await deleteDoc(doc(this.db, dataType, id));
      return deletedoc;
    } catch (e) {
      console.error(`Error fetching ${dataType}  document: `, e);
      return;
    }
  }

  async updateDocumentId(
    id: string,
    dataType: string,
    projectorArticledata: ProjectorArticle
  ): Promise<void | undefined> {
    try {
      const udpatedDoc = await updateDoc(
        doc(this.db, dataType, id),
        projectorArticledata as any
      );
      return udpatedDoc;
    } catch (e) {
      console.error(`Error fetching ${dataType}  document: `, e);
      return;
    }
  }

  async paginateLoadMore(dataType: string, lastDoc: ProjectorArticle, limitData:number) {
    try {
    
      console.log('last', lastDoc);

      // Construct a new query starting at this document,
      // get the next 25 cities.
      const next = await getDocs(
        query(
          collection(this.db, dataType),
          orderBy('createdAt'),
          startAfter(lastDoc),
          limit(limitData)
        )
      );

      return next;
    } catch (e) {
      console.error(`Error fetching ${dataType}  document: `, e);
      return;
    }
  }
}
