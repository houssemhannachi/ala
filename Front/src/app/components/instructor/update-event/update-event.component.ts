import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService, Event } from 'src/app/shared/service/event.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrl: './update-event.component.scss'
})
export class UpdateEventComponent{ // Initialiser l'événement à modifier
  eventId!:number;
  eventToUpdate:any;
  event:any;

constructor(
  private eventService: EventService,
  private route: ActivatedRoute,
  private router: Router
) {}

ngOnInit(): void {
  // Récupérer l'ID de l'événement depuis l'URL
   this.eventId = this.route.snapshot.params['id'];
    this.getEventById(this.eventId);
    console.log(this.event.id);
  
}

// Fonction pour récupérer l'événement à partir de son ID
getEventById(id: number): void {
  this.eventService.getEventById(id).subscribe(
    (event) => {
      this.event = event;
    },
    (error) => {
      console.error('Une erreur est survenue lors de la récupération du fournisseur', error);
    }
  );
}

// Fonction pour mettre à jour l'événement
updateEvent(): void {
    this.eventService.updateEvent(this.eventId,this.event).subscribe(
      () => {
        alert('L\'événement a été mis à jour avec succès!');
        this.router.navigate(['/instructor/instructor-wishlist']); // Rediriger vers la page des événements
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de l\'événement:', error);
        alert('Une erreur est survenue lors de la mise à jour.');
      }
    );
  
}

// Fonction pour annuler la modification et revenir à la page des événements
cancel(): void {
  this.router.navigate(['/instructor-wishlist']);
}

}
