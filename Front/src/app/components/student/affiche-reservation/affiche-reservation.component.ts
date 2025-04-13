import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  ReservationService } from 'src/app/shared/service/reservation';

@Component({
  selector: 'app-affiche-reservation',
  templateUrl:'./affiche-reservation.component.html',
  styleUrls: ['./affiche-reservation.component.scss']
})
export class AfficheReservationComponent  {
  eventId!: number;
  reservationForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private eventService: ReservationService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.reservationForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('eventId');
    if (id) {
        this.eventId = Number(id);
        console.log("ID de l'événement :", this.eventId);  // ✅ Debug
    } else {
        console.error("ID d'événement manquant dans l'URL !");
        alert("Erreur : ID d'événement manquant !");
        this.router.navigate(['/student/student-qa']);  // 🔄 Redirection en cas d'erreur
    }
}

submitReservation(): void {
  if (this.reservationForm.valid) {
      const reservationData = {
          eventId: this.eventId,
          ...this.reservationForm.value
      };
      console.log("Données de réservation envoyées :", reservationData);  // ✅ Debug

      this.eventService.reserveEvent(reservationData).subscribe({
          next: (response) => {
              console.log("Réponse du serveur :", response);  // ✅ Debug
              alert('Réservation réussie !');
              this.router.navigate(['/student/student-qa']);
          },
          error: (err) => {
              console.error("Erreur lors de la réservation :", err);  // ✅ Debug
              if (err.status === 409) {
                  alert('Cet événement est complet.');
              } else {
                  alert('Erreur lors de la réservation.');
              }
          }
      });
  } else {
      alert('Veuillez remplir tous les champs.');
  }
}
}