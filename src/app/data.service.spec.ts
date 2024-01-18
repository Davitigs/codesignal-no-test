// data.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import { DataElement } from './data.model';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchData method', () => {
    it('should return an observable of DataElement array', (done) => {
      const size = 5;
      const interval = 1000;
      const additionalIds = ['ID1', 'ID2', 'ID3', 'ID4', 'ID5'];

      service.fetchData(size, interval, additionalIds).subscribe((data) => {
        // Ensure the returned data is an array
        expect(Array.isArray(data)).toBeTruthy();

        // Ensure each item in the array is an instance of DataElement
        data.forEach((item) => {
          expect(item instanceof DataElement).toBeTruthy();
        });

        done();
      });
    });
  });
});
