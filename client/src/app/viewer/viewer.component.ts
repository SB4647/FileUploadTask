import { Component, OnInit, SecurityContext } from '@angular/core';
import { DocumentService } from '../_services/document.service';
import { base64StringToBlob, createObjectURL } from 'blob-util';
@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css'],
})
export class ViewerComponent implements OnInit {
  model: any = {};
  imageSrc: string = '';
  fileHeader: string = '';
  fileList: any = [];
  selectedFile: string = '';
  viewModel: any = {};
  imageExists: boolean = false;
  downloadClicked: boolean = false;

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.list();
  }

  list() {
    // send model via documentService
    this.documentService.list().subscribe(
      (response) => {
        this.fileList = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //method to download file from database
  view() {
    this.downloadClicked = true;
    // construct model to send to API
    this.model.filename = this.selectedFile;
    console.log(this.model.filename);

    // send model via documentService
    this.documentService.view(this.model).subscribe(
      (response) => {
        // use response to construct blob
        const contentType = response.fileHeader.match(/:(.+);/)[1];
        const blob = base64StringToBlob(response.fileData, contentType);

        // assign blobUrl to iframe src
        const obj_url = URL.createObjectURL(blob);
        const iframe = document.getElementById('viewer');
        iframe.setAttribute('src', obj_url);
        this.imageExists = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
