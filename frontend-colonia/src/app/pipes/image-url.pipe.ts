import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({ name: 'imageUrl', standalone: true })
export class ImageUrlPipe implements PipeTransform {
  transform(input?: string | null): string {
    if (!input) return '';

    let s = String(input).trim();

    if (/^https?:\/\//i.test(s)) {
      try {
        const u = new URL(s);
        if (u.hostname === 'localhost' || u.hostname === '127.0.0.1') {
          return s.replace(/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i, environment.apiBaseUrl);
        }
        return s;
      } catch {
      }
    }

    s = s.replace(/\\/g, '/');

    const iPub = s.toLowerCase().indexOf('/public/');
    if (iPub >= 0) s = s.slice(iPub + '/public/'.length);

    const iUp = s.toLowerCase().indexOf('uploads/');
    if (iUp >= 0) s = s.slice(iUp);

    s = s.replace(/^\/+/, '');

    return `${environment.apiBaseUrl}/public/${s}`;
  }
}
