import { Controller } from '@nestjs/common';
import { VideosService } from './videos.service';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  // @Post()
  // create(@Body() createVideoDto: CreateVideoDto) {
  //   return this.videosService.create(createVideoDto);
  // }

  // @Get()
  // findAll() {
  //   return this.videosService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.videosService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
  //   return this.videosService.update(+id, updateVideoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.videosService.remove(+id);
  // }
}
