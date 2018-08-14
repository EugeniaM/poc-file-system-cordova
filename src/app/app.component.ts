import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fs: any;

  test() {
      (<any>window).requestFileSystem  = (<any>window).requestFileSystem || (<any>window).webkitRequestFileSystem;

      if ((<any>navigator).webkitPersistentStorage) {
        (<any>navigator).webkitPersistentStorage.requestQuota(5 * 1024 * 1024, (grantedBytes) => {
            (<any>window).requestFileSystem((<any>window).PERSISTENT, grantedBytes, this.onInitFs.bind(this), this.errorHandler);
          }, function(e) {
            console.log('Error ===>', e);
          });
      } else {
        (<any>window).requestFileSystem(
          (<any>window).LocalFileSystem.PERSISTENT,
          5 * 1024 * 1024,
          this.onInitFs.bind(this),
          this.errorHandler
        );
      }
  }

  onInitFs(fs) {
    console.log('file system open: ' + fs.name);
    this.fs = fs;
    fs.root.getFile('newPersistentFile.txt', { create: true, exclusive: false }, (fileEntry) => {
      console.log('FS Root', fs.root);
      console.log('FS', fs);

      console.log('fileEntry is file?' + fileEntry.isFile.toString());
      // fileEntry.name == 'someFile.txt'
      // fileEntry.fullPath == '/someFile.txt'
      // Create a FileWriter object for our FileEntry (log.txt).
      this.writeFile(fileEntry, null);
    }, () => { console.log('???????'); });
  }

  errorHandler(e) {
    console.log('ERROR', e);
  }

  readFile() {
    this.fs.root.getFile('newPersistentFile.txt', {}, (fileEntry) => {

      // Get a File object representing the file,
      // then use FileReader to read its contents.
      fileEntry.file((file) => {
        const reader = new FileReader();

        reader.onloadend = function(e) {
          const txtArea = document.createElement('textarea');
          txtArea.value = this.result;
          document.body.appendChild(txtArea);
        };

        reader.readAsText(file);
      }, (e) => { console.log('>>>>>>>'); });

    }, (e) => { console.log('>>>>>>>'); });
  }

  writeFile(fileEntry, dataObj) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter((fileWriter) => {

      fileWriter.onwriteend = function() {
        console.log('Successful file write...');
        // readFile(fileEntry);
      };

      fileWriter.onerror = function (e) {
        console.log('Failed file write: ' + e.toString());
      };

      // If data object is not passed in,
      // create a new Blob instead.
      if (!dataObj) {
        dataObj = new Blob(['some file data!!!!!!!!!'], { type: 'text/plain' });
      }

      fileWriter.write(dataObj);
    });
  }
}
