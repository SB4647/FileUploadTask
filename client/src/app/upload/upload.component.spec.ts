import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { UploadComponent } from './upload.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('', () => {
  let fixture: ComponentFixture<UploadComponent>;
  let component: UploadComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [UploadComponent],
      providers: [],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(UploadComponent);
        component = fixture.componentInstance;
      });
  }));

  it('should create the component', () => {
    const app = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  // it('file should be added to array when onSelect event method called and array to be updated', async(() => {
  //   spyOn(component, 'onSelect');

  //   let dropzone =
  //     fixture.debugElement.nativeElement.querySelector('ngx-dropzone');
  //   dropzone.change();

  //   fixture.whenStable().then(() => {
  //     expect(component.onSelect).toHaveBeenCalled();
  //   });
  // }));
});
