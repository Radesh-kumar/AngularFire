import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from '../../models/Client';
import { FlashMessagesModule } from 'angular2-flash-messages/module/module';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css'],
})
export class EditClientComponent implements OnInit {
  client: Client = {
    id:'',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  };
  disableBalanceOnEdit: boolean = true;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit() {
    // Get id from url
    this.client.id = this.route.snapshot.params['id'];
    // Get client
    this.clientService.getClients().subscribe((clients, ...data) => {
      for (let i = 0; i <= clients.length; i++) {
        if (clients[i] != null && clients[i].id == this.client.id) {
          this.client = clients[i];
        }
      }
    });
  }

  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    if (!valid) {
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger',
        timeout: 2000,
      });
    } else {
      // Add id to client
      
      // Update client
      this.clientService.updateClient(this.client);
      this.flashMessage.show('Client updated', {
        cssClass: 'alert-success',
        timeout: 2000,
      });
      this.router.navigate(['/client/' + this.client.id]);
    }
  }
}
