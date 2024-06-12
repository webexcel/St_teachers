import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassStudentFeeReportPage } from './class-student-fee-report.page';

describe('ClassStudentFeeReportPage', () => {
  let component: ClassStudentFeeReportPage;
  let fixture: ComponentFixture<ClassStudentFeeReportPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ClassStudentFeeReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
