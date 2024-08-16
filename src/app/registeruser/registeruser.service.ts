// organization.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  private validNames: string[] = [''];

  constructor() {}

  isValidOrganizationName(name: string): boolean {
    return this.validNames.includes(name);
  }
}
