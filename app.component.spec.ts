import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent] // Declare the AppComponent
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance; // Get instance of the AppComponent
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy(); // Verify that the component is created successfully
  });

  it(`should have as title 'To-Do List Application'`, () => {
    expect(component.title).toEqual('To-Do List Application'); // Verify the title is set correctly
  });

  it('should render title in a h1 tag', () => {
    fixture.detectChanges(); // Trigger change detection
    const compiled = fixture.nativeElement; // Get the compiled element
    expect(compiled.querySelector('h1').textContent).toContain('To-Do List Application'); // Verify the title is rendered
  });
});

