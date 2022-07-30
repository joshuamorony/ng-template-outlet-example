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
      <tr>
        <ng-container
          *ngTemplateOutlet="
            headers || defaultHeaderTemplate;
            context: { $implicit: data }
          "
        ></ng-container>
      </tr>
      <tr *ngFor="let row of data">
        <ng-container
          *ngTemplateOutlet="
            rows || defaultRowTemplate;
            context: { $implicit: row }
          "
        ></ng-container>
      </tr>
    </table>

    <!-- If no template is provided use keys as headers and display all values -->
    <ng-template #defaultHeaderTemplate let-data>
      <th *ngFor="let header of data[0] | keyvalue">{{ header.key }}</th>
    </ng-template>

    <ng-template #defaultRowTemplate let-row>
      <td *ngFor="let row of row | keyvalue">{{ row.value }}</td>
    </ng-template>
  `,
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
