import * as FileSystem from 'expo-file-system';

class FileSystemService {
  async saveFirebaseImagesLocally(images: string[]): Promise<string[]> {
    const localImages = [];
    for (const image of images) {
      const fileNameWithToken = image.split('/').pop();
      const fileName = fileNameWithToken?.split('?')[0];
      const destPath = `${FileSystem.documentDirectory}${fileName}`;
      const fileInfo = await FileSystem.getInfoAsync(destPath);

      if (fileInfo.exists) {
        localImages.push(destPath);
        continue;
      } else {
        const downloadResult = await FileSystem.downloadAsync(image, destPath);
        localImages.push(downloadResult.uri);
      }
    }

    return localImages;
  }
}

export const fileSystemService = new FileSystemService();
