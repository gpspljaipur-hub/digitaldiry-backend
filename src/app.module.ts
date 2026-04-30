import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { UsersModule } from './users/users.module';
import { TeachersModule } from './teachers/teachers.module';
import { AttendanceModule } from './attendance/attendance.module';
import { StudentsModule } from './students/students.module';
import { ClassesModule } from './classes/classes.module';
import { SubjectsModule } from './subjects/subjects.module';
import { HomeworkModule } from './homework/homework.module';
import { MarksModule } from './marks/marks.module';
import { NoticeModule } from './notice/notice.module';
import { RegisterModule } from './register/register.module';
import { RelationModule } from './relation/relation.module';
import { SchoolModule } from './school/school.module';
import { LeaveModule } from './leave/leave.module';

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
    StudentsModule,
    AttendanceModule,
    ClassesModule,
    SubjectsModule,
    HomeworkModule,
    MarksModule,
    NoticeModule,
    RegisterModule,
    RelationModule,
    SchoolModule,
    LeaveModule,
  ],
})
export class AppModule {}
