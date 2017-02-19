import { Observable } from 'rxjs'

var numbers = [1, 2, 10, 122];
let count = 0;
var source = Observable.create(observer => {
    console.log('Trying...', count++)
    observer.error('Something');
});

source
    .retryWhen(attempts => {
        return Observable.range(1, 5)
            .zip(attempts, i => i)
            .flatMap(i => {
                console.log('inner count: ', i);
                return i < 5 ? Observable.timer(2) : Observable.throw('asdfasdf');
            })
    })

    .subscribe(value => {
        console.log(value);
    }, error => {
        console.log('Error handler invoked: ', error);
    }, () => {
        console.log('Completed');
    });
