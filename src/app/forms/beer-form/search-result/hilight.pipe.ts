import { PipeTransform, Pipe } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'highlight' })
export class HighlightPipe implements PipeTransform {
  transform(text: string, highlight: string): SafeHtml {
    if (highlight && text) {
      let pattern = highlight.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
      pattern = pattern.split(' ').filter((t) => {
        return t.length > 0;
      }).join('|');
      const regex = new RegExp(pattern, 'gi');

      return text.replace(regex, (match) => `<span class="search-highlight">${match}</span>`);
    } else {
      return text;
    }
  }
}
