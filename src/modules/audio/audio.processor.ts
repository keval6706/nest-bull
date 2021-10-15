import { OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('audio')
export class AudioProcessor {
  private readonly logger = new Logger(AudioProcessor.name);

  @Process('audio')
  handleTranscode(job: Job) {
    this.logger.debug('Start transcoding...');
    this.logger.debug(job.data);
  }

  @OnQueueCompleted()
  handleTranscodeComplete(job: Job) {
    this.logger.debug(job.data);
    this.logger.debug('Transcoding completed');
  }
}
