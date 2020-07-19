import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';

import { Client } from '../../models/Client';
import { hasLifecycleHook } from '@angular/compiler/src/lifecycle_reflector';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  totalOwed: number=0;

  constructor(private clientService: ClientService) {
    this.clientService.getClients().subscribe((id,...data) => {
      this.clients = id;
      this.getTotalOwed();
    });
    
  }

  ngOnInit() {}

  getTotalOwed():number {
    let sum=0
    for(let i=0;i<=this.clients.length;i++){
      let numb=parseFloat(this.clients[i].balance.toString());
      this.totalOwed += numb;
      console.log(this.totalOwed);

    }
    return sum;
  }
  
}
