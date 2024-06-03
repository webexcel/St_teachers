import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VideoProcessingService {
  // Prompts the user to select a video file
  public promptForVideo(): Promise<File> {
    return new Promise<File>((resolve, reject) => {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept =
        'image/*, application/pdf, .doc, .docx, .txt, .xls, .xlsx, .mp3, .mp4';

      fileInput.onchange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
          resolve(file);
        } else {
          reject('No file selected');
        }
      };

      fileInput.click();
    });
  }

  // Generates a thumbnail from the video file
  public generateThumbnail(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const video = document.createElement('video');
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === 'string') {
          video.src = reader.result;
          video.muted = true;

          video.addEventListener('loadeddata', () => {
            video.currentTime = 4;
          });

          video.addEventListener('seeked', () => {
            const canvas = document.createElement('canvas');
            canvas.width = 100;
            canvas.height = 70;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              const thumbnailData = canvas.toDataURL('image/jpeg');
              resolve(thumbnailData);
            } else {
              reject('Canvas context is not available.');
            }
          });
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }

  uploadVideo(data: any, file: any) {
    const reader = new FileReader();

    reader.onload = async (e: any) => {
      await this.generateFallbackThumbnail(data, file);
    };

    reader.readAsDataURL(file);
  }

  generateFallbackThumbnail(data: any, file: any) {
    const video = document.createElement('video');
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        video.src = reader.result;
        video.addEventListener('loadeddata', () => {
          video.currentTime = 4;
        });
        video.addEventListener('seeked', () => {
          const canvas = document.createElement('canvas');
          canvas.width = 100;
          canvas.height = 70;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            data['thumbnail'] = canvas.toDataURL('image/jpeg');
          } else {
            console.error('Canvas context is not available.');
          }
        });
      }
    };

    reader.readAsDataURL(file);
  }
}
