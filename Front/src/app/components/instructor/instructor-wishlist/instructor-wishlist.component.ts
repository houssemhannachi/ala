import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {EventService, Event} from 'src/app/shared/service/event.service';
import {routes} from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-instructor-wishlist',
  templateUrl: './instructor-wishlist.component.html',
  styleUrl: './instructor-dashboard.component.css'
})
export class InstructorWishlistComponent {
  events: any[] = [];
  selectedEvent: Event | null = null;
  isEditing: boolean = false;
  public routes = routes;
  minDateTime: any;

  constructor(private eventService: EventService, private router: Router
  ) {
    const now = new Date();
    this.minDateTime = now.toISOString().slice(0, 16);
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getUpcomingEvents().subscribe(data => {
      this.events = data;
    });
  }

  addEvent(title: string, description: string, scheduledAt: string, capacity: string) {
    const newEvent: Event = {title, description, scheduledAt: new Date(scheduledAt), capacity: parseInt(capacity, 10)};
    this.eventService.addEvent(newEvent).subscribe(() => {
      this.loadEvents();
    });
  }

  deleteEvent(id?: number) {
    if (id && confirm("Voulez-vous vraiment supprimer cet événement ?")) {
      this.eventService.deleteEvent(id).subscribe(() => {
        this.loadEvents();
      });
    }
  }

  updateEvent(id?: number) {
    if (id && confirm("Voulez-vous vraiment modifier cet événement ?")) {
      this.router.navigate(['/instructor/updatevent', id]);
    }
  }


  cancelEdit() {
    this.isEditing = false;  // Ferme la modale sans enregistrer
    this.selectedEvent = null;  // Réinitialise la sélection
  }

  goToAddTest() {
    this.router.navigate([this.routes.updateevent]);
  }

}
