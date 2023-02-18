import { Component, Input } from '@angular/core';
import { IProductVm } from 'src/app/admin/utils/interfaces/products.interface';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product!: IProductVm;
}
