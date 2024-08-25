import {
  UseInterceptors,
  UploadedFile,
  Controller,
  Post,
  Get,
  StreamableFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';
import { createReadStream } from 'fs';
import { join } from 'path';

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

  @Get('pdf')
  getPdf(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'sample.pdf'));
    return new StreamableFile(file, {
      type: 'application/pdf',
      disposition: 'inline; filename="sample.pdf"',
      // If you want to define the Content-Length value to another value instead of file's length:
      // length: 123,
    });
  }

  @Get('image')
  getImage(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'sample-image.png'));
    return new StreamableFile(file, {
      type: 'image/png',
      disposition: 'inline; filename="sample-image.png"',
      // If you want to define the Content-Length value to another value instead of file's length:
      // length: 123,
    });
  }

  // @Get('download/:filename')
  // async downloadFile(
  //   @Param('filename') filename: string,
  //   @Res() res: Response,
  // ) {
  //   const filePath = path.join(__dirname, '..', 'uploads', filename);

  //   // Check if the file exists
  //   if (fs.existsSync(filePath)) {
  //     return res.download(filePath);
  //   } else {
  //     throw new NotFoundException('File not found');
  //   }
  // }

  // @Get(':filename')
  // async getFile(@Param('filename') filename: string, @Res() res: Response) {
  //   const filePath = path.join(__dirname, '..', 'uploads/pdf', filename);
  //   res.sendFile(filePath);
  //   res.blob
  // }
}
