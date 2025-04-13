import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'loginPipe'
})
export class LoginPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
