import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { UsersModule } from './users/users.module';
import { TeachersModule } from './teachers/teachers.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://rajatsonisoni77_db_user:qB1mPxKo4F2aaYcO@cluster0.amdmaxd.mongodb.net/?appName=Cluster0',
      {
        retryAttempts: 5,
        retryDelay: 3000,
      },
    ),
    UsersModule,
    TeachersModule,
  ],
})
export class AppModule {}
