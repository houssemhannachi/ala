import {Component, OnInit} from '@angular/core';
import {routes} from 'src/app/shared/service/routes/routes';
import {ActivatedRoute} from "@angular/router";
import {RatingService} from "../../../shared/service/rating.service";
import {EventService} from "../../../shared/service/event.service";
import {Review, ReviewService} from "../../../shared/service/review.service";
import {AuthService} from "../../../shared/service/Auth/auth.service";

@Component({
  selector: 'app-student-event-details',
  templateUrl: './student-event-details.component.html',
  styleUrl: './student-event-details.component.scss'
})
export class StudentEventDetailsComponent implements OnInit {
  public routes = routes
  eventId: any;
  rate: any;
  event: any;
  reviewText: any;
  reviews: Review[] = [];
  user: any;
  userId: any;
  mostActiveReviewer: { name: string; count: number } | null = null;

  constructor(private authService: AuthService, private reviewService: ReviewService, private rateService: RatingService, private eventService: EventService, private route: ActivatedRoute) {
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadUser();
  }

  ngOnInit(): void {
    this.loadEvent();
    this.getReviews();
  }

  loadEvent(): void {
    this.eventService.getEventById(this.eventId).subscribe({
      next: (data) => {
        this.event = data;
        this.loadAverageRating();
      },
      error: (err) => console.error('Error loading post details:', err)
    });
  }

  loadAverageRating() {
    this.rateService.getAverageRating(this.eventId).subscribe(avg => {
      this.rate = avg;
    });
  }

  getReviews() {
    this.reviewService.loadReviews(this.eventId).subscribe((data: Review[]) => {
      this.reviews = data;
      this.findMostActiveReviewer(data);
    });
  }

  loadUser() {
    this.authService.getProfile().subscribe({
      next: (response) => {
        this.user = response.ourUsers;
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  addReview() {
    const newReview: Review = {
      content: this.reviewText,
      eventId: this.eventId,
      userId: this.user.id
    };

    this.reviewService.addReview(newReview).subscribe(() => {
      this.reviewText = '';
      this.getReviews();
    });
  }

  deleteReview(id?: any) {
    if (confirm('Are you sure you want to delete this review?')) {
      this.reviewService.deleteReview(id).subscribe(() => {
        this.getReviews(); // Refresh the list
      });
    }
  }
  findMostActiveReviewer(reviews: Review[]) {
    const reviewerCounts: { [username: string]: number } = {};

    for (let r of reviews) {
      const name = r.username || 'Anonymous';
      reviewerCounts[name] = (reviewerCounts[name] || 0) + 1;
    }

    let maxName = '';
    let maxCount = 0;

    for (let [name, count] of Object.entries(reviewerCounts)) {
      if (count > maxCount) {
        maxName = name;
        maxCount = count;
      }
    }

    this.mostActiveReviewer = maxCount ? { name: maxName, count: maxCount } : null;
  }

}
