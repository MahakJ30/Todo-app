import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  task: any = { title: '', description: '' };

  constructor(private taskService: TaskService) {}

  saveTask(): void {
    if (this.task.id) {
      this.taskService.updateTask(this.task).subscribe();
    } else {
      this.taskService.createTask(this.task).subscribe(task => {
        this.task = { title: '', description: '' }; // Reset the form
      });
    }
  }
}



