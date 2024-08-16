import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  private users = [
    {
      email: 'umer@gmail.com',
      fullName: 'Umer',
      Number: 1111111111,
      Password: '1234',
    },
    {
      email: 'Rahul@gmail.com',
      fullName: 'Rahul',
      Number: 2222222222,
      Password: '1234',
    },
    {
      email: 'batman@gmail.com',
      fullName: 'Batman',
      Number: 3333333333,
      Password: '1234',
    },
    {
      email: 'bane@gmail.com',
      fullName: 'Bane',
      Number: 4444444444,
      Password: '1234',
    },
  ];

  private organizations = [
    { organizationId: '001', organizationName: 'Solvei8' },
    { organizationId: '002', organizationName: 'Buyogo' },
    { organizationId: '003', organizationName: 'Lynks' },
    { organizationId: '004', organizationName: 'Ananta' },
    { organizationId: '005', organizationName: 'Crony Group' },
    { organizationId: '006', organizationName: 'Dress Men' },
    { organizationId: '007', organizationName: 'Man Holding' },
    { organizationId: '008', organizationName: 'Radnick' },
    { organizationId: '009', organizationName: 'BH Group' },
    { organizationId: '010', organizationName: 'Urmi Group' },
    { organizationId: '011', organizationName: 'Epyllion Group' },
    { organizationId: '012', organizationName: 'Stylo' },
  ];

  getUsers(): Observable<any[]> {
    return of(this.users);
  }
  getOrganizations(): Observable<any[]> {
    return of(this.organizations);
  }
}
