import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskFormComponent } from './task-form.component';
import { TaskService } from '../services/task.service';
import { of } from 'rxjs';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let taskService: TaskService;

  beforeEach(() => {
    const taskServiceMock = {
      createTask: jasmine.createSpy('createTask').and.returnValue(of({ id: 1, title: 'Test Task', description: 'Test Description' })),
      updateTask: jasmine.createSpy('updateTask').and.returnValue(of({ id: 1, title: 'Updated Task', description: 'Updated Description' })),
    };

    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [TaskFormComponent],
      providers: [{ provide: TaskService, useValue: taskServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create a new task', () => {
    component.task = { title: 'New Task', description: 'New Task Description' };

    component.saveTask();

    expect(taskService.createTask).toHaveBeenCalledWith(component.task);
    expect(component.task).toEqual({ title: '', description: '' }); // Check if the form resets after submission
  });

  it('should update an existing task', () => {
    component.task = { id: 1, title: 'Existing Task', description: 'Existing Task Description' };

    component.saveTask();

    expect(taskService.updateTask).toHaveBeenCalledWith(component.task);
  });
});

