import { Injectable } from '@angular/core';
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
  setDoc,
  or,
} from '@angular/fire/firestore';
import { ProjectorArticle } from '../types/projectorarticle';
import { Tag } from '../common/utilities/data';

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

  async setDocument(
    dataType: string,
    projectorArticledata: ProjectorArticle,
    uniqueId: string
  ): Promise<DocumentReference<DocumentData, DocumentData> | undefined | void> {
    try {
      const docRef = await setDoc(
        doc(this.db, dataType, String(uniqueId)),
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
    dataLimit: number,
    tags: Tag[] | null,
    category: String[] | [] | null,
  
  ): Promise<QuerySnapshot<DocumentData, DocumentData> | undefined> {
 
  try {
      let querySnapshot;
      if (tags != null) {
        category = null;
      }

      if (tags && category === null) {
        querySnapshot = await getDocs(
          query(
            collection(this.db, dataType),
            orderBy('created_at'),
            limit(dataLimit),
            where('tags', 'array-contains-any', tags)
          )
        );
      } else if (category && tags === null) {
         querySnapshot = await getDocs(
          query(
            collection(this.db, dataType),
            orderBy('created_at'),
            limit(dataLimit),
            where('categories', 'array-contains-any', category)
          )
        );
      }

      return querySnapshot;
    } catch (e) {
      console.error(`Error fetching ${dataType}  document: `, e);
      return;
    }
  }

  async getFilteredDocumentsByTags(
    dataType: string,
    tag: Tag | null
  ): Promise<QuerySnapshot<DocumentData, DocumentData> | undefined> {
    try {
      const q = query(
        collection(this.db, dataType),
        where('tags', 'array-contains', tag)
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

      // if (docSnap.exists()) {
      //   console.log('Document data:', docSnap.data());
      // } else {
      //   // docSnap.data() will be undefined in this case
      //   console.log('No such document!');
      // }

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

  async paginateLoadMore(
    dataType: string,
    lastDoc: ProjectorArticle,
    dataLimit: number,
    tags: Tag[] | null,
    category: String[] | [] | null,
    
  ) {
    try {
      let querySnapshot;
 

      if (tags != null) {
        category = null;
      }

      if (tags && category === null) {
        querySnapshot = await getDocs(
          query(
            collection(this.db, dataType),
            orderBy('created_at'),
            limit(dataLimit),
            where('tags', 'array-contains-any', tags),
            startAfter(lastDoc)
          )
        );
      } else if (category && tags === null) {
         querySnapshot = await getDocs(
          query(
            collection(this.db, dataType),
            orderBy('created_at'),
            limit(dataLimit),
            where('categories', 'array-contains-any', category),
            startAfter(lastDoc)
          )
        );
      }



      return querySnapshot;
    } catch (e) {
      console.error(`Error fetching ${dataType}  document: `, e);
      return;
    }
  }
}
