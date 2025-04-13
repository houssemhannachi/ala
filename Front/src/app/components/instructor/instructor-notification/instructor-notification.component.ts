import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EventService, Event } from 'src/app/shared/service/event.service';

@Component({
  selector: 'app-instructor-notification',
  templateUrl: './instructor-notification.component.html',
  styleUrls: ['./instructor-notification.component.scss']
})
export class InstructorNotificationComponent implements OnInit {
  events: Event[] = [];

  constructor(private eventService: EventService,private router:Router) {}

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

 

  // Récupérer l'URL du QR Code pour chaque événement
  // Remplacez cette méthode :
getQRCodeUrl(eventId: number): Observable<string> {
  return this.eventService.getEventQRCodeUrl(eventId);
}
// 🔥 Aller à la page de réservation
goToReservation(eventId: number): void {
  this.router.navigate(['reserve/:eventId', eventId]);
}

}
