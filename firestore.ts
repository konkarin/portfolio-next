import { firebaseApp } from "./firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  OrderByDirection,
  query,
  QueryConstraint,
  serverTimestamp,
  setDoc,
  where,
  WhereFilterOp,
} from "firebase/firestore";

export interface Query {
  fieldPath: string;
  filterStr: WhereFilterOp;
  value: any;
}

export interface Order {
  fieldPath: string;
  direction?: OrderByDirection;
  limit?: number;
}

export default class Firestore {
  private static readonly db = getFirestore(firebaseApp);

  /**
   * Firestoreのサーバータイムスタンプを取得
   */
  static getTimestamp() {
    return serverTimestamp();
  }

  private static query(path: string, ...queryConstraint: QueryConstraint[]) {
    return queryConstraint === undefined
      ? query(collection(this.db, path))
      : query(collection(this.db, path), ...queryConstraint);
  }

  private static docRef(path: string, ...queryConstraint: string[]) {
    return queryConstraint === undefined
      ? doc(collection(this.db, path))
      : doc(collection(this.db, path), ...queryConstraint);
  }

  static async getDocs(
    collectionPath: string,
    whereQueries?: Query[],
    order?: Order
  ) {
    const conditions: QueryConstraint[] = [];

    if (whereQueries !== undefined) {
      whereQueries
        .map((q) => {
          return where(q.fieldPath, q.filterStr, q.value);
        })
        .forEach((query) => {
          conditions.push(query);
        });
    }

    if (order !== undefined) {
      conditions.push(orderBy(order.fieldPath, order.direction));

      if (order.limit !== undefined) {
        conditions.push(limit(order.limit || 30));
      }
    }

    const q = this.query(collectionPath, ...conditions);
    const snap = await getDocs(q).catch((e) => {
      throw e;
    });

    return snap.docs;
  }

  /**
   * コレクション内のすべてのドキュメントのIDを取得
   * @param collectionPath
   * @param whereQueries
   * @param order
   */
  static async getDocIds(
    collectionPath: string,
    whereQueries?: Query[],
    order?: Order
  ) {
    const docs = await this.getDocs(collectionPath, whereQueries, order);
    return docs.map((doc) => doc.id);
  }

  /**
   * コレクション内のすべてのドキュメントを取得
   * @param collectionPath
   * @param whereQueries
   * @param order
   */
  static async getDocsData(
    collectionPath: string,
    whereQueries?: Query[],
    order?: Order
  ) {
    const docs = await this.getDocs(collectionPath, whereQueries, order);
    return docs.map((doc) => doc.data());
  }

  /**
   * 指定した数の並べ替えたドキュメントを取得
   * @param collectionPath
   * @param fieldPath
   * @param direction
   * @param limitNumber
   */
  static async getOrderDocs(
    collectionPath: string,
    fieldPath: string,
    direction?: OrderByDirection,
    limitNumber?: number
  ) {
    const q = this.query(
      collectionPath,
      orderBy(fieldPath, direction),
      limit(limitNumber || 30)
    );
    const snap = await getDocs(q).catch((e) => {
      throw e;
    });

    return snap.docs.map((doc) => doc.data());
  }

  /**
   * 指定したドキュメントIDを取得
   * @param collectionPath
   * @param docId
   */
  static async getDocById(collectionPath: string, docId: string) {
    const docRef = this.docRef(collectionPath, docId);
    const snap = await getDoc(docRef).catch((e) => {
      throw e;
    });

    return snap.data();
  }

  /**
   * 指定したクエリでドキュメントを取得
   * @param collectionPath
   * @param queries
   * @param order
   */
  static async getOrderDocsByQueries(
    collectionPath: string,
    queries: Query,
    order: Order
  ) {
    const q = this.query(
      collectionPath,
      where(queries.fieldPath, queries.filterStr, queries.value),
      orderBy(order.fieldPath, order.direction),
      limit(order.limit || 30)
    );
    const snap = await getDocs(q).catch((e) => {
      throw e;
    });

    return snap.docs.map((doc) => doc.data());
  }

  /**
   * 指定した複数のクエリでドキュメントを取得
   * @param collectionPath
   * @param whereQueries
   * @param order
   */
  static async getDocsByCompoundQueries(
    collectionPath: string,
    whereQueries: Query[],
    order?: Order
  ) {
    const conditions = whereQueries.map((q) => {
      return where(q.fieldPath, q.filterStr, q.value);
    });

    if (order !== undefined) {
      conditions.push(orderBy(order.fieldPath, order.direction));

      if (order.limit) {
        conditions.push(limit(order.limit || 30));
      }
    }

    const q = this.query(collectionPath, ...conditions);
    const snap = await getDocs(q).catch((e) => {
      throw e;
    });

    return snap.docs.map((doc) => doc.data());
  }

  /**
   * 指定したドキュメントIDを更新
   * @param path
   * @param docId
   * @param data
   */
  static async updateDoc(path: string, docId: string, data: any) {
    // update()は新規作成できないためset
    const docRef = this.docRef(path, docId);
    await setDoc(docRef, data).catch((e) => {
      throw e;
    });
  }

  static async deleteDoc(path: string, docId: string) {
    const docRef = this.docRef(path, docId);

    await deleteDoc(docRef).catch((e) => {
      throw e;
    });
  }
}
