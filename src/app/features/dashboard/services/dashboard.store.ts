// import {Injectable} from '@angular/core';
// import {BehaviorSubject, Observable, throwError} from 'rxjs';
// import {catchError, map, shareReplay, tap} from 'rxjs/operators';
// import {HttpClient} from '@angular/common/http';
// import { MessagesService } from 'src/app/shared/services/messages.service';
// import { Board } from '../models/board.interface';



// @Injectable({
//     providedIn: 'root'
// })
// export class CoursesStore {

//     private subject = new BehaviorSubject<Board[]>([]);

//     boards$ : Observable<Board[]> = this.subject.asObservable();

//     constructor(
//         private http:HttpClient,
//         private messages: MessagesService) {

//         this.getAllBoards();

//     }

//     private getAllBoards() {

//         const loadBoards$ = this.http.get<Board[]>('/api/boards')
//             .pipe(
//                 map(response => response.),
//                 catchError(err => {
//                     this.messages.showErrors(err);
//                     return throwError(err);
//                 }),
//                 tap(boards => this.subject.next(boards))
//             );

//     }

//     saveCourse(courseId:string, changes: Partial<Course>): Observable<any> {

//         const courses = this.subject.getValue();

//         const index = courses.findIndex(course => course.id == courseId);

//         const newCourse: Course = {
//           ...courses[index],
//           ...changes
//         };

//         const newCourses: Course[] = courses.slice(0);

//         newCourses[index] = newCourse;

//         this.subject.next(newCourses);

//         return this.http.put(`/api/courses/${courseId}`, changes)
//             .pipe(
//                 catchError(err => {
//                     const message = "Could not save course";
//                     console.log(message, err);
//                     this.messages.showErrors(message);
//                     return throwError(err);
//                 }),
//                 shareReplay()
//             );
//     }

//     filterByCategory(category: string): Observable<Course[]> {
//         return this.courses$
//             .pipe(
//                 map(courses =>
//                     courses.filter(course => course.category == category)
//                         .sort(sortCoursesBySeqNo)
//                 )
//             )
//     }

// }