import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbsenteesPage } from './absentees.page';

describe('AbsenteesPage', () => {
  let component: AbsenteesPage;
  let fixture: ComponentFixture<AbsenteesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AbsenteesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
