import { Inject, Injectable } from '@angular/core';
import {
  getDocs,
  Firestore,
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
} from '@angular/fire/firestore';
import { ProjectorArticle } from '../Types/ProjectorArticle.type';

@Injectable({
  providedIn: 'root',
})
export class FirebaseDBService {
  firestore: Firestore = Inject(Firestore);

  constructor() {}

  async addDcoument(
    dataType: string,
    projectorArticledata: ProjectorArticle
  ): Promise<DocumentReference<DocumentData, DocumentData> | undefined> {
    try {
      const docRef = await addDoc(
        collection(this.firestore, dataType),
        projectorArticledata
      );
      return docRef;
    } catch (e) {
      console.error('Error adding : ' + dataType, e);
      return;
    }
  }

  async getAllDocuments(
    dataType: string
  ): Promise<QuerySnapshot<DocumentData, DocumentData> | undefined> {
    try {
      const querySnapshot = await getDocs(collection(this.firestore, dataType));
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
        collection(this.firestore, dataType),
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
      const docRef = doc(this.firestore, dataType, id);
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
      const deletedoc = await deleteDoc(doc(this.firestore, dataType, id));
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
      const udpatedDoc =  await updateDoc(doc(this.firestore, dataType, id), projectorArticledata as any );
      return udpatedDoc;
    } catch (e) {
      console.error(`Error fetching ${dataType}  document: `, e);
      return;
    }
  }




}
