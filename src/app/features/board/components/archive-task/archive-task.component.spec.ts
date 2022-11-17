import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { ArchiveTaskComponent } from './archive-task.component';

describe('ArchiveTaskComponent', () => {
  let component: ArchiveTaskComponent;
  let fixture: ComponentFixture<ArchiveTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveTaskComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, PipesModule, FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiveTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
