import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IContestform } from '../contestform.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../contestform.test-samples';

import { ContestformService } from './contestform.service';

const requireRestSample: IContestform = {
  ...sampleWithRequiredData,
};

describe('Contestform Service', () => {
  let service: ContestformService;
  let httpMock: HttpTestingController;
  let expectedResult: IContestform | IContestform[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ContestformService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find('ABC').subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Contestform', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const contestform = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(contestform).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Contestform', () => {
      const contestform = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(contestform).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Contestform', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Contestform', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Contestform', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addContestformToCollectionIfMissing', () => {
      it('should add a Contestform to an empty array', () => {
        const contestform: IContestform = sampleWithRequiredData;
        expectedResult = service.addContestformToCollectionIfMissing([], contestform);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(contestform);
      });

      it('should not add a Contestform to an array that contains it', () => {
        const contestform: IContestform = sampleWithRequiredData;
        const contestformCollection: IContestform[] = [
          {
            ...contestform,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addContestformToCollectionIfMissing(contestformCollection, contestform);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Contestform to an array that doesn't contain it", () => {
        const contestform: IContestform = sampleWithRequiredData;
        const contestformCollection: IContestform[] = [sampleWithPartialData];
        expectedResult = service.addContestformToCollectionIfMissing(contestformCollection, contestform);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(contestform);
      });

      it('should add only unique Contestform to an array', () => {
        const contestformArray: IContestform[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const contestformCollection: IContestform[] = [sampleWithRequiredData];
        expectedResult = service.addContestformToCollectionIfMissing(contestformCollection, ...contestformArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const contestform: IContestform = sampleWithRequiredData;
        const contestform2: IContestform = sampleWithPartialData;
        expectedResult = service.addContestformToCollectionIfMissing([], contestform, contestform2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(contestform);
        expect(expectedResult).toContain(contestform2);
      });

      it('should accept null and undefined values', () => {
        const contestform: IContestform = sampleWithRequiredData;
        expectedResult = service.addContestformToCollectionIfMissing([], null, contestform, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(contestform);
      });

      it('should return initial array if no Contestform is added', () => {
        const contestformCollection: IContestform[] = [sampleWithRequiredData];
        expectedResult = service.addContestformToCollectionIfMissing(contestformCollection, undefined, null);
        expect(expectedResult).toEqual(contestformCollection);
      });
    });

    describe('compareContestform', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareContestform(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = null;

        const compareResult1 = service.compareContestform(entity1, entity2);
        const compareResult2 = service.compareContestform(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'CBA' };

        const compareResult1 = service.compareContestform(entity1, entity2);
        const compareResult2 = service.compareContestform(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'ABC' };

        const compareResult1 = service.compareContestform(entity1, entity2);
        const compareResult2 = service.compareContestform(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
