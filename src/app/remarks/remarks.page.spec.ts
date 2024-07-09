import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemarksPage } from './remarks.page';

describe('RemarksPage', () => {
  let component: RemarksPage;
  let fixture: ComponentFixture<RemarksPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RemarksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
