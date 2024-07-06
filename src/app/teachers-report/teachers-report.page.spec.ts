import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeachersReportPage } from './teachers-report.page';

describe('TeachersReportPage', () => {
  let component: TeachersReportPage;
  let fixture: ComponentFixture<TeachersReportPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TeachersReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
