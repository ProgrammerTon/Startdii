import {
  UseInterceptors,
  UploadedFiles,
  Controller,
  Post,
  Get,
  Param,
  Res,
  NotFoundException,
  Response,
  StreamableFile,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';
import { extname } from 'path';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { join } from 'path';

@Controller('files')
export class FilesController {
  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads', // Save files to the 'uploads' folder
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
    // const uploadPath = path.join(__dirname, '..', 'uploads'); // Specify the directory where you want to save the file

    // // Ensure the upload directory exists
    // if (!fs.existsSync(uploadPath)) {
    //   fs.mkdirSync(uploadPath, { recursive: true });
    // }

    // const filePath = path.join(uploadPath, file.originalname);

    // // Write the file buffer to storage
    // fs.writeFileSync(filePath, file.buffer);
    return { message: 'File uploaded successfully!' };
    // return { message: 'File uploaded successfully!', filePath };
  }

  @Get('pdf/:filename')
  async getPdf(@Param('filename') filename: string): Promise<StreamableFile> {
    const file = createReadStream(
      join(process.cwd(), `./uploads/${filename}.pdf`),
    );
    return new StreamableFile(file, {
      type: 'application/pdf',
      disposition: 'inline; filename="sample.pdf"',
      // If you want to define the Content-Length value to another value instead of file's length:
      // length: 123,
    });
  }

  @Get('image')
  getImage(): StreamableFile {
    const file = createReadStream(
      join(process.cwd(), './uploads/sample-image.png'),
    );
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
