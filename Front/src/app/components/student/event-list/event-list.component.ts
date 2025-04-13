import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EventService } from 'src/app/shared/service/event.service';
import { ReservationService } from 'src/app/shared/service/reservation';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent  implements OnInit{
  events: any[] = [];
  public routes = routes;
  
    constructor(private eventService: ReservationService,private router:Router) {}
  
    ngOnInit(): void {
      this.loadEvents();
    }
  
    // Charger la liste des événements
    loadEvents(): void {
      this.eventService.getUpcomingEvents().subscribe(
        (data) => {
          this.events = data;
        },
        (error) => {
          console.error('Erreur lors du chargement des événements:', error);
        }
      );
    }
  
   update_Stage(eventId: number) {
  this.router.navigate(['/student/students/reserve', eventId]);
}

goToReservation(id?: number) {
  if (id && confirm("Voulez-vous vraiment ajouter dans cette cet événement ?")) {
    console.log(id);
    this.update_Stage(id);
    }
  }
  
  
 
 /* goToReservation(eventId: number): void {
    this.router.navigate([`${this.routes.afficheReservation}/${eventId}`]);
    console.log("Path généré :",` ${this.routes.afficheReservation}/${eventId}`);
    console.log("Base URL :", this.routes.students);
}*/

}
