import { Component, Input } from '@angular/core';
import { QuerywtService } from '../../../services/chatbot/chatbackWT/querywt.service';
import { SubcategoryWtService } from '../../../services/chatbot/chatbackWT/subcategory-wt.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Query } from '../../../Models/queries';
import { Subcategory } from '../../../Models/subcategory';

@Component({
  selector: 'app-edit-que-wt',
  templateUrl: './edit-que-wt.component.html',
  styleUrl: './edit-que-wt.component.scss'
})
export class EditQueWtComponent {
  @Input() queryId: string | null = null;
  query: Query = new Query('', '', '', { _id: '', name: '' });
  subcategories: Subcategory[] = [];
  subcategory: string = '';

  constructor(
    private toastr: ToastrService,
    private QServiceTW: QuerywtService,
    private SServiceWt: SubcategoryWtService,
    public activeModal: NgbActiveModal
  ) {this.loadSubcategories();}

  ngOnInit(): void {
   
  }

  loadSubcategories() {
    this.SServiceWt.showSubcategories().subscribe(
      (data: any[]) => {
        this.subcategories = data;
      },
      error => {
        console.error('Error al cargar las categorías:', error);
      }
    );
  }

  updateQuery() {
    if (!this.query.identifier || !this.query.question || !this.query.answer || !this.query.subcategory?._id) {
      this.toastr.error('Por favor, completa todos los campos.');
      return;
    }

    if (this.queryId) {
      const selectedSubcategory = this.subcategories.find(subcategory => subcategory._id === this.query.subcategory?._id);
      if (selectedSubcategory) {
        this.query.subcategory._id = selectedSubcategory._id;
        this.query.subcategory.name = selectedSubcategory.name;
      }

      this.QServiceTW.editQuery(this.queryId, this.query).subscribe(
        () => {
          this.toastr.success('La consulta se ha actualizado con éxito.', 'Actualización Exitosa');
          this.activeModal.close('Modal cerrado');
        },
        (error) => {
          console.error('Error al actualizar la consulta:', error);
          this.toastr.error('Error al actualizar la consulta. Por favor, inténtalo de nuevo.', 'Error');
        }
      );
    } else {
      console.error('No se ha proporcionado un ID válido para actualizar la consulta.');
    }
  }

}
