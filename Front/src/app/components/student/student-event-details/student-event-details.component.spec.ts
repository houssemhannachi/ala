import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEventDetailsComponent } from './student-event-details.component';

describe('StudentQuizDetailsComponent', () => {
  let component: StudentEventDetailsComponent;
  let fixture: ComponentFixture<StudentEventDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentEventDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
