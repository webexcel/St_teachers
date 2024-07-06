import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarkEnterPage } from './mark-enter.page';

describe('MarkEnterPage', () => {
  let component: MarkEnterPage;
  let fixture: ComponentFixture<MarkEnterPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MarkEnterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
