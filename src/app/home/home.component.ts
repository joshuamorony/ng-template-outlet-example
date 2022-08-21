import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableComponentModule } from '../shared/ui/table.component';

@Component({
  selector: 'app-home',
  template: `
    <!-- No templates provided, will use default layout -->
    <app-table [data]="employees"></app-table>

    <!-- Basic configured template -->
    <app-table [data]="employees">
      <ng-template #headers>
        <th>First</th>
        <th>Last</th>
      </ng-template>
    </app-table>

    <!-- Highly configured template with conditional elements -->
    <app-table [data]="inventory">
      <ng-template #headers>
        <th></th>
        <th>Item</th>
        <th>Price</th>
        <th></th>
        <th></th>
      </ng-template>
      <ng-template #rows let-row let-i="index">
        <tr>
          <td>{{ i + 1 }}</td>
          <td>{{ row.name }}</td>
          <td>{{ row.price | currency: row.currency }}</td>
          <td>
            <button *ngIf="row.inStock > 0" (click)="purchaseItem(row.plu)">
              Buy now
            </button>
          </td>
          <td>
            <button>Delete</button>
          </td>
        </tr>
      </ng-template>
    </app-table>
  `,
})
export class HomeComponent {
  employees = [
    { firstName: 'Employee', lastName: 'One' },
    { firstName: 'Employee', lastName: 'Two' },
    { firstName: 'Employee', lastName: 'Three' },
    { firstName: 'Employee', lastName: 'Four' },
    { firstName: 'Employee', lastName: 'Five' },
  ];

  inventory = [
    {
      plu: 110,
      supplier: 'X Corp',
      name: 'Table extender',
      inStock: 500,
      price: 50,
      currency: 'GBP',
    },
    {
      plu: 120,
      supplier: 'X Corp',
      name: 'Heated toilet seat',
      inStock: 0,
      price: 80,
      currency: 'GBP',
    },
    {
      plu: 155,
      supplier: 'Y Corp',
      name: 'Really good pencil',
      inStock: 1,
      price: 8000,
      currency: 'AUD',
    },
  ];

  purchaseItem(plu: number) {
    console.log('handle purchase for', plu);
  }
}

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    TableComponentModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
  ],
})
export class HomeModule {}
