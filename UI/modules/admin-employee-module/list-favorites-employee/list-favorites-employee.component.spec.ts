import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFavoritesEmployeeComponent } from './list-favorites-employee.component';

describe('ListFavoritesEmployeeComponent', () => {
  let component: ListFavoritesEmployeeComponent;
  let fixture: ComponentFixture<ListFavoritesEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFavoritesEmployeeComponent],
    });
    fixture = TestBed.createComponent(ListFavoritesEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
