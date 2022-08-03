import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableComponentModule } from '../shared/ui/table.component';

interface InventoryItem {
  price: number;
  supplier: string;
  plu: number;
  name: string;
  inStock: number;
  currency: string;
}

@Component({
  selector: 'app-home',
  template: `
    <!-- No templates provided, will use default layout -->
    <app-table [data]="employees"></app-table>

    <!-- Basic configured template -->
    <app-table [data]="employees">
      <ng-template appTableHeader>
        <th>First</th>
        <th>Last</th>
      </ng-template>
    </app-table>

    <!-- Highly configured template with conditional elements -->
    <app-table [data]="inventory">
      <ng-template appTableHeader>
        <th>Item</th>
        <th>Price</th>
        <th></th>
        <th></th>
      </ng-template>
      <ng-template [appTableRow]="inventory" let-row>
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
      </ng-template>
    </app-table>

    <!-- using structural directive syntax -->
    <app-table [data]="inventory">
      <ng-template appTableHeader>
        <th>Item</th>
        <th>Price</th>
        <th></th>
        <th></th>
      </ng-template>
      <ng-container *appTableRow="inventory as row">
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
      </ng-container>
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

  inventory: InventoryItem[] = [
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
