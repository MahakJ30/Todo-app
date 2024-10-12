import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;
  let httpTestingController: HttpTestingController;

  const mockTasks = [
    { id: 1, title: 'Test Task 1', description: 'Description 1' },
    { id: 2, title: 'Test Task 2', description: 'Description 2' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });

    service = TestBed.inject(TaskService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that no unmatched requests remain
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch tasks', () => {
    service.getTasks().subscribe(tasks => {
      expect(tasks).toEqual(mockTasks);
    });

    // Mock HTTP request
    const req = httpTestingController.expectOne('http://localhost:3000/tasks');
    expect(req.request.method).toEqual('GET');
    req.flush(mockTasks); // Respond with mock data
  });

  it('should create a task', () => {
    const newTask = { title: 'New Task', description: 'New Task Description' };

    service.createTask(newTask).subscribe(task => {
      expect(task).toEqual({ id: 3, ...newTask }); // Expect the created task to have an id
    });

    const req = httpTestingController.expectOne('http://localhost:3000/tasks');
    expect(req.request.method).toEqual('POST');
    req.flush({ id: 3, ...newTask }); // Respond with the created task
  });

  it('should update a task', () => {
    const updatedTask = { id: 1, title: 'Updated Task', description: 'Updated Description' };

    service.updateTask(updatedTask).subscribe(task => {
      expect(task).toEqual(updatedTask); // Expect the updated task to match the input
    });

    const req = httpTestingController.expectOne(`http://localhost:3000/tasks/${updatedTask.id}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(updatedTask); // Respond with the updated task
  });

  it('should delete a task', () => {
    const taskId = 1;

    service.deleteTask(taskId).subscribe(response => {
      expect(response).toBeNull(); // Expect a null response after deletion
    });

    const req = httpTestingController.expectOne(`http://localhost:3000/tasks/${taskId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(null); // Respond with null (or you can use req.flush({}) if needed)
  });
});

