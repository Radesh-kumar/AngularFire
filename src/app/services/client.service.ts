import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../models/Client';

@Injectable()
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private afs: AngularFirestore) {
    // this.clients = firestore.collection('crud').valueChanges();

    this.clientsCollection = afs.collection<Client>('crud');
  }

  getClients(): Observable<Client[]> {
    // this.clients=this.afs.collection('crud').valueChanges();
    // Get clients with the id
    this.clientsCollection = this.afs.collection<Client>('crud');
    this.clients = this.clientsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Client;
          const id = a.payload.doc.id;
          let result = { id, ...data };
          return result;
        })
      )
    );

    return this.clients;
  }

  newClient(client: Client) {
    this.clientsCollection.add(client);
  }
  updateClient(client: Client) {
    this.afs.collection('crud').doc(client.id).update({
      firstName: client.firstName,
      lastName: client.lastName,
      balance: client.balance,
      email: client.email,
      phone: client.phone,
    });
  }

  deleteClient(client: Client) {
    this.clientDoc = this.afs.collection('crud').doc(client.id);
    this.clientDoc.delete();
  }
}
      