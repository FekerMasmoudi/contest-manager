import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFieldcontestform, NewFieldcontestform } from '../fieldcontestform.model';

export type PartialUpdateFieldcontestform = Partial<IFieldcontestform> & Pick<IFieldcontestform, 'id'>;

export type EntityResponseType = HttpResponse<IFieldcontestform>;
export type EntityArrayResponseType = HttpResponse<IFieldcontestform[]>;

@Injectable({ providedIn: 'root' })
export class FieldcontestformService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/fieldcontestforms');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(fieldcontestform: NewFieldcontestform): Observable<EntityResponseType> {
    return this.http.post<IFieldcontestform>(this.resourceUrl, fieldcontestform, { observe: 'response' });
  }

  update(fieldcontestform: IFieldcontestform): Observable<EntityResponseType> {
    return this.http.put<IFieldcontestform>(
      `${this.resourceUrl}/${this.getFieldcontestformIdentifier(fieldcontestform)}`,
      fieldcontestform,
      { observe: 'response' }
    );
  }

  partialUpdate(fieldcontestform: PartialUpdateFieldcontestform): Observable<EntityResponseType> {
    return this.http.patch<IFieldcontestform>(
      `${this.resourceUrl}/${this.getFieldcontestformIdentifier(fieldcontestform)}`,
      fieldcontestform,
      { observe: 'response' }
    );
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IFieldcontestform>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFieldcontestform[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getFieldcontestformIdentifier(fieldcontestform: Pick<IFieldcontestform, 'id'>): string {
    return fieldcontestform.id;
  }

  compareFieldcontestform(o1: Pick<IFieldcontestform, 'id'> | null, o2: Pick<IFieldcontestform, 'id'> | null): boolean {
    return o1 && o2 ? this.getFieldcontestformIdentifier(o1) === this.getFieldcontestformIdentifier(o2) : o1 === o2;
  }

  addFieldcontestformToCollectionIfMissing<Type extends Pick<IFieldcontestform, 'id'>>(
    fieldcontestformCollection: Type[],
    ...fieldcontestformsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const fieldcontestforms: Type[] = fieldcontestformsToCheck.filter(isPresent);
    if (fieldcontestforms.length > 0) {
      const fieldcontestformCollectionIdentifiers = fieldcontestformCollection.map(
        fieldcontestformItem => this.getFieldcontestformIdentifier(fieldcontestformItem)!
      );
      const fieldcontestformsToAdd = fieldcontestforms.filter(fieldcontestformItem => {
        const fieldcontestformIdentifier = this.getFieldcontestformIdentifier(fieldcontestformItem);
        if (fieldcontestformCollectionIdentifiers.includes(fieldcontestformIdentifier)) {
          return false;
        }
        fieldcontestformCollectionIdentifiers.push(fieldcontestformIdentifier);
        return true;
      });
      return [...fieldcontestformsToAdd, ...fieldcontestformCollection];
    }
    return fieldcontestformCollection;
  }
}
