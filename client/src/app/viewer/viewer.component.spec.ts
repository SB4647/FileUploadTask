import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ViewerComponent } from './viewer.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('', () => {
  let fixture: ComponentFixture<ViewerComponent>;
  let component: ViewerComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ViewerComponent],
      providers: [],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ViewerComponent);
        component = fixture.componentInstance;
      });
  }));

  it('should create the component', () => {
    const app = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
