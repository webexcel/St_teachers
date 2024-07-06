import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StaffFreePeriodPage } from './staff-free-period.page';

describe('StaffFreePeriodPage', () => {
  let component: StaffFreePeriodPage;
  let fixture: ComponentFixture<StaffFreePeriodPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StaffFreePeriodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
