import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../_services/document.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  uploadComplete: Boolean = false;
  model: any = {};
  files: File[] = [];

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {}

  upload() {
    // iterate through loaded files
    for (let file in this.files) {
      const reader = new FileReader();

      // FileReader has an onload event that you handle when it has loaded data
      reader.onload = (e: any) => {
        // store contents of blob
        const data = e.target.result as any;

        // regex split blob into header/data
        var headerString = /(.+),/.exec(data)[0];
        var dataString = /,(.+)/.exec(data)[1];

        // construct model to send to API
        this.model.filename = this.files[file]['name'];
        this.model.fileheader = headerString;
        this.model.filedata = dataString;
        this.model.filesize = this.files[file]['size'];

        console.log(this.model);

        // send model via documentService
        this.documentService.upload(this.model).subscribe(
          (response) => {
            console.log(response);
            this.uploadComplete = true;
          },
          (error) => {
            console.log(error);
          }
        );
      };

      //refresh page to show data in view table
      window.location.reload();

      // kick off the onload handler above
      reader.readAsDataURL(this.files[file]);
    }
  }

  onSelect(event) {
    console.log(this.files);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
