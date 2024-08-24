import {
  UseInterceptors,
  UploadedFile,
  Controller,
  Post,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('files')
export class FilesController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    const uploadPath = path.join(__dirname, '..', 'uploads'); // Specify the directory where you want to save the file

    // Ensure the upload directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const filePath = path.join(uploadPath, file.originalname);

    // Write the file buffer to storage
    fs.writeFileSync(filePath, file.buffer);

    return { message: 'File uploaded successfully!', filePath };
  }
}
