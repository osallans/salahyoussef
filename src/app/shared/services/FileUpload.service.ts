import {Injectable, Inject} from '@angular/core';

@Injectable()
export class FileUploadService {
    progress$: any;
    progressObserver: any;
    progress: any;
 fileUpload(url: string, file: File)
    : Promise<any> {
    return new Promise((resolve, reject) => {
         let formData: FormData = new FormData(),
            xhr: XMLHttpRequest = new XMLHttpRequest();

            formData.append("FileUpload", file, file.name);


        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.response));
                } else {
                    reject(xhr.response);
                }
            }
        };

        xhr.upload.onprogress = (event) => {
            this.progress = Math.round(event.loaded / event.total * 100);
            this.progressObserver.next(this.progress);
        };
        xhr.open('POST', url, true);
        xhr.send(formData);
    });
}
}