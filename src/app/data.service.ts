import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable, Subscription, interval as rxInterval } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { DataElement } from './data.model';

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnDestroy {
  private worker!: Worker;
  private dataSubject: Subject<any> = new Subject<any[]>();
  private subscription: Subscription | null = null;

  constructor() {
    this.initWorker();
  }

  initWorker(): void {
    const workerScript = `
      self.addEventListener('message', (event) => {
        const { size, additionalIds } = event.data;
        const data = generatePseudoSocketData(size, additionalIds);
        postMessage(data);
      });

      function generatePseudoSocketData(size, additionalIds) {
        const data = [];
        for (let i = 0; i < size; i++) {
          const element = {
            id:  \`ID\${i}\`,
            int: Math.floor(Math.random() * 100),
            float: Math.random().toPrecision(18),
            color: getRandomColor(),
            child: {
              id: \`\${i}\`,
              color: getRandomColor(),
            },
          };
          data.push(element);
        }
        return data;
      }

      function getRandomColor() {
        return \`#\${Math.floor(Math.random() * 16777215).toString(16)}\`;
      }
    `;

    const workerBlob = new Blob([workerScript], { type: 'application/javascript' });
    this.worker = new Worker(URL.createObjectURL(workerBlob));
    this.worker.onmessage = (event) => {
      this.dataSubject.next([event.data]);
    };
  }

  fetchData(size: number, interval: number, additionalIds: string[]): Observable<DataElement[]> {
    // Clear existing subscription before creating a new one
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    // Create a new observable for the data stream
    return new Observable<DataElement[]>((observer) => {
      // Initial data generation and post to worker
      const initialData = this.generatePseudoSocketData(size, additionalIds);
      this.worker.postMessage({
        size,
        additionalIds,
      });

      // Use RxJS interval to control the timing
      this.subscription = rxInterval(interval)
        .pipe(
          switchMap(() => {
            // Generate new data and post to worker
            const newData = this.generatePseudoSocketData(size, additionalIds);
            this.worker.postMessage({
              size,
              additionalIds,
            });
            return [newData];
          }),
          takeUntil(new Observable(() => this.ngOnDestroy())) // Fix for typescript issue
        )
        .subscribe((data: DataElement[]) => {
          observer.next(data);
        });
    });
  }

  generatePseudoSocketData(size: number, additionalIds: string[]): any[] {
    const data: DataElement[] = [];
    for (let i = 0; i < size; i++) {
      const element = new DataElement({
        uid: i + 1,
        id: `${i}`,
        int: Math.floor(Math.random() * 100),
        float: Math.random().toPrecision(18) ,
        color: this.getRandomColor(),
        child: {
          id: `${i}`,
          color: this.getRandomColor(),
        },
      });
      data.push(element);
    }
    return data;
  }

  getRandomColor(): string {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  ngOnDestroy(): void {
    // Unsubscribe when the service is destroyed
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
