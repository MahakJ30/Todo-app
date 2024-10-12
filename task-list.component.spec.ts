import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../services/task.service';
import { of } from 'rxjs';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: TaskService;

  const mockTasks = [
    { id: 1, title: 'Test Task 1', description: 'Description 1' },
    { id: 2, title: 'Test Task 2', description: 'Description 2' }
  ];

  beforeEach(() => {
    const taskServiceMock = {
      getTasks: jasmine.createSpy('getTasks').and.returnValue(of(mockTasks)),
      deleteTask: jasmine.createSpy('deleteTask').and.returnValue(of(null))
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TaskListComponent],
      providers: [{ provide: TaskService, useValue: taskServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch tasks on init', () => {
    component.ngOnInit(); // Call ngOnInit to trigger fetching tasks
    expect(taskService.getTasks).toHaveBeenCalled(); // Ensure getTasks was called
    expect(component.tasks).toEqual(mockTasks); // Ensure tasks are correctly set
  });

  it('should delete a task', () => {
    const taskId = 1;
    component.deleteTask(taskId); // Call the deleteTask method
    expect(taskService.deleteTask).toHaveBeenCalledWith(taskId); // Ensure deleteTask was called with the correct ID
    expect(component.tasks.length).toBe(2); // Verify that the task list length is still 2 (since we didn't actually remove from mock)
  });
});

