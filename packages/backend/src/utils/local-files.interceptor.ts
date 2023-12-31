import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
  Type,
  mixin,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { DiskStorageOptions, diskStorage } from 'multer';
import { Request } from 'express';

interface LocalFilesInterceptorOptions {
  fieldName: string;
  basePath?: string;
  fileFilter?: MulterOptions['fileFilter'];
}

function LocalFilesInterceptor(
  options: LocalFilesInterceptorOptions,
): Type<NestInterceptor> {
  @Injectable()
  class Interceptor implements NestInterceptor {
    private mediaFolderDest: string;

    constructor(configService: ConfigService) {
      this.mediaFolderDest = configService.get('UPLOADED_FILES_DESTINATION');
    }
    private readonly logger = new Logger(Interceptor.name);

    intercept(context: ExecutionContext, next: CallHandler<any>) {
      const { folderName, fileName, ext } = context
        .switchToHttp()
        .getRequest<Request>().body;
      this.logger.debug(
        'body in interceptor',
        Object.keys(context.switchToHttp().getRequest().body),
      );

      const destination = `${this.mediaFolderDest}${options.basePath ?? ''}/${
        folderName ?? ''
      }`;

      const diskStorageOptions: DiskStorageOptions = {
        destination,
      };
      if (fileName && ext) {
        diskStorageOptions.filename = (req, file, cb) => {
          cb(null, `${fileName}.${ext}`);
        };
      }
      const multerOptions: MulterOptions = {
        storage: diskStorage(diskStorageOptions),
        fileFilter: options.fileFilter,
      };

      return new (FileInterceptor(
        options.fieldName,
        multerOptions,
      ))().intercept(context, next);
    }
  }
  return mixin(Interceptor);
}

export default LocalFilesInterceptor;
