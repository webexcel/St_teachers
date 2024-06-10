import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadsPage } from './uploads.page';

describe('UploadsPage', () => {
  let component: UploadsPage;
  let fixture: ComponentFixture<UploadsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UploadsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
