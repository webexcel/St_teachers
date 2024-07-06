import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpencesPage } from './expences.page';

describe('ExpencesPage', () => {
  let component: ExpencesPage;
  let fixture: ComponentFixture<ExpencesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ExpencesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
