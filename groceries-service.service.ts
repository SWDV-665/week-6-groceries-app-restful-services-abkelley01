import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { map,catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class GroceriesServiceService {
/*all functions pertaining to list items can be found here: add, remove, edit*/
  items: any = [];

  data: any;

  dataChanged$: Observable<boolean>;

  private dataChangedSubject: Subject<boolean>;

  baseURL= "http://localhost:8080";

  constructor(public http: HttpClient) { 
    console.log('Hello GroceryServicesProvider Provider');

    this.dataChangedSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangedSubject.asObservable();
  }


getItems(): Observable<object[]> {
  return this.http.get(this.baseURL + '/api/groceries').pipe(
    map(this.extractData),
    catchError(this.handleError)
  );
}



  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

private handleError(error: Response | any) {
  let errMsg: string;
  if (error instanceof Response) {
    const err = error || '';
    errMsg = '${error.status} - ${error.statusText} ${err}';
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.error(errMsg);
  return Observable.throw(errMsg);
}

  removeItem(id) {
    console.log('#### Remove Item - id = ', id);
    this.http.delete(this.baseURL + "api/groceries" + id).subscribe(res => {
      this.items = res;
      this.dataChangedSubject.next(true);
    });
  }

  addItem(item) {
    this.http.post(this.baseURL + "/api/groceries", item).subscribe(res => {
      this.items = res;
      this.dataChangedSubject.next(true);
    });
  }

  editItem(item,index) {
    console.log("Editing item = ", item);
    this.http.put(this.baseURL + "/api/groceries" + item._id, item).subscribe(res => {
      this.items = res;
      this.dataChangedSubject.next(true);
    });
  }



}
