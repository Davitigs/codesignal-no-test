import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DataElement } from '../../data.model';

@Component({
  selector: 'app-data-table-item',
  templateUrl: './data-table-item.component.html',
  styleUrls: ['./data-table-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableItemComponent {
  @Input() item!: DataElement;

}
