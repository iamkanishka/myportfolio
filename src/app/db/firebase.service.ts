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
  orderBy,
  limit,
  startAfter,
  setDoc,
} from 'firebase/firestore'; // ⚠️ Use firebase native here
import { Firestore } from '@angular/fire/firestore'; // ✅ Angular DI wrapper
import { ProjectorArticle } from '../types/projectorarticle';
import { Tag } from '../common/utilities/data';

@Injectable({ providedIn: 'root' })
export class FirebaseDBService {
  constructor(private db: Firestore) {} // ✅ inject Firestore

  async addDocument(
    dataType: string,
    projectorArticledata: ProjectorArticle
  ): Promise<DocumentReference<DocumentData> | undefined> {
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
  ): Promise<void> {
    try {
      await setDoc(
        doc(this.db, dataType, String(uniqueId)),
        projectorArticledata
      );
    } catch (e) {
      console.error('Error setting : ' + dataType, e);
    }
  }

  async getAllDocuments(
    dataType: string,
    dataLimit: number,
    tags: Tag[] | null,
    category: string[] | null
  ): Promise<QuerySnapshot<DocumentData> | undefined> {
    try {
      let querySnapshot;

      if (tags != null) category = null;

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
      console.error(`Error fetching ${dataType} document: `, e);
      return;
    }
  }

  async getFilteredDocumentsByTags(
    dataType: string,
    tag: Tag | null
  ): Promise<QuerySnapshot<DocumentData> | undefined> {
    try {
      const q = query(
        collection(this.db, dataType),
        where('tags', 'array-contains', tag)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot;
    } catch (e) {
      console.error(`Error fetching ${dataType} document: `, e);
      return;
    }
  }

  async getDocumentId(
    id: string,
    dataType: string
  ): Promise<DocumentSnapshot<DocumentData> | undefined> {
    try {
      const docRef = doc(this.db, dataType, id);
      const docSnap = await getDoc(docRef);
      return docSnap;
    } catch (e) {
      console.error(`Error fetching ${dataType} document: `, e);
      return;
    }
  }

  async deleteDocumentId(
    id: string,
    dataType: string
  ): Promise<void | undefined> {
    try {
      return await deleteDoc(doc(this.db, dataType, id));
    } catch (e) {
      console.error(`Error deleting ${dataType} document: `, e);
      return;
    }
  }

  async updateDocumentId(
    id: string,
    dataType: string,
    projectorArticledata: ProjectorArticle
  ): Promise<void | undefined> {
    try {
      return await updateDoc(
        doc(this.db, dataType, id),
        projectorArticledata as any
      );
    } catch (e) {
      console.error(`Error updating ${dataType} document: `, e);
      return;
    }
  }

  async paginateLoadMore(
    dataType: string,
    lastDoc: ProjectorArticle,
    dataLimit: number,
    tags: Tag[] | null,
    category: string[] | null
  ): Promise<QuerySnapshot<DocumentData> | undefined> {
    try {
      let querySnapshot;

      if (tags != null) category = null;

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
      console.error(`Error paginating ${dataType} document: `, e);
      return;
    }
  }
}
