import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  Input,
  NgModule,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-table',
  template: `
    <table>
      <thead>
        <tr>
          <ng-container
            *ngTemplateOutlet="
              headers || defaultHeaderTemplate;
              context: { $implicit: data }
            "
          ></ng-container>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let row of data">
          <ng-container
            *ngTemplateOutlet="
              rows || defaultRowTemplate;
              context: { $implicit: row }
            "
          ></ng-container>
        </tr>
      </tbody>
    </table>

    <!-- If no template is provided use keys as headers and display all values -->
    <ng-template #defaultHeaderTemplate let-data>
      <th *ngFor="let header of data[0] | keyvalue">{{ header.key }}</th>
    </ng-template>

    <ng-template #defaultRowTemplate let-row>
      <td *ngFor="let row of row | keyvalue">{{ row.value }}</td>
    </ng-template>
  `,
  styles: [
    `
      ::ng-deep table {
        width: 100%;
        margin: 2rem 0;
        border-collapse: collapse;
        font-family: sans-serif;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

        thead {
          tr {
            background-color: #dd0031;
            color: #ffffff;
            text-align: left;
          }
        }

        tbody tr:hover {
          background-color: #f6f6f6;
        }

        th,
        td {
          padding: 1rem;
        }
      }
    `,
  ],
})
export class TableComponent {
  @Input() data!: any[];
  @ContentChild('headers') headers!: TemplateRef<any>;
  @ContentChild('rows') rows!: TemplateRef<any>;
}

@NgModule({
  imports: [CommonModule],
  declarations: [TableComponent],
  exports: [TableComponent],
})
export class TableComponentModule {}
