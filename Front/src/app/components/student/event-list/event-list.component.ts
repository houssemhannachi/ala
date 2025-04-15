import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {EventService} from 'src/app/shared/service/event.service';
import {ReservationService} from 'src/app/shared/service/reservation';
import {routes} from 'src/app/shared/service/routes/routes';
import {AuthService} from "../../../shared/service/Auth/auth.service";
import {RatingService} from "../../../shared/service/rating.service";

@Component({
    selector: 'app-event-list',
    templateUrl: './event-list.component.html',
    styleUrl: './event-list.component.scss'
})
export class EventListComponent implements OnInit {
    events: any[] = [];
    public routes = routes;
    user: any;
    reservations: any[] | undefined;
    ratings: { [eventId: number]: number } = {}; // stores average ratings
    userRating: { [eventId: number]: number } = {}; // stores user's selected rating

    constructor(private authService: AuthService,
                private eventService: ReservationService,
                private rateService: RatingService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.loadEvents();
        this.loadUser();
    }

    loadUser() {
        this.authService.getProfile().subscribe({
            next: (response) => {
                this.user = response.ourUsers;
                this.getMyReservations();
            },
            error: (error) => {
                console.error('Error:', error);
            },
        });
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


    goToReservation(eventId?: number) {
        if (!eventId || !this.user?.id) {
            alert("Informations utilisateur ou événement manquantes.");
            return;
        }

        if (confirm("Voulez-vous vraiment réserver cet événement ?")) {
            const reservationData = {
                userId: this.user.id,
                eventId: eventId
            };

            this.eventService.addReservation(reservationData).subscribe({
                next: (response) => {
                    alert(response.message);
                    this.getMyReservations();
                },
                error: (error) => {
                    alert(error.error?.message || "Une erreur s'est produite.");
                }
            });
        }
    }


    getMyReservations(): void {
        this.eventService.getUserReservations(this.user.id).subscribe(
            (data) => {
                this.reservations = data;
                this.reservations.forEach(event => {
                    this.loadAverageRating(event.eventId);
                });
            },
            (error) => {
                console.error('Erreur lors du chargement des événements:', error);
            }
        );
    }

    loadAverageRating(eventId: number) {
        this.rateService.getAverageRating(eventId).subscribe(avg => {
            this.ratings[eventId] = avg;
        });
    }

    rateEvent(eventId: number, stars: number, comment: string = '') {
        const data = {
            userId: this.user.id,
            eventId,
            stars,
            comment
        };

        this.rateService.submitRating(data).subscribe({
            next: () => {
                alert("Merci pour votre note !");
                this.loadAverageRating(eventId);
            },
            error: (err) => {
                console.error(err);
                alert("Erreur lors de la soumission de la note.");
            }
        });
    }
}
