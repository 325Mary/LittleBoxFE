import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { QueriesService } from '../../../services/chatbot/queries.service';
import { SubcategoryService } from '../../../services/chatbot/subcategory.service';
import { Subcategory } from '../../../Models/subcategory';
import { Query } from '../../../Models/queries';



@Component({
  selector: 'app-edit-queries',
  templateUrl: './edit-queries.component.html',
  styleUrls: ['./edit-queries.component.scss']
})
export class EditQueriesComponent {
  @Input() queryId: string | null = null;
  query: Query = new Query('', '', '', { _id: '', name: '' });
  subcategories: Subcategory[] = [];
  subcategory: string = '';

  constructor(
    private toastr: ToastrService,
    private queriesService: QueriesService,
    private SService: SubcategoryService,
    public activeModal: NgbActiveModal
  ) {this.loadSubcategories();}

  ngOnInit(): void {
   
  }

  loadSubcategories() {
    this.SService.showSubcategories().subscribe(
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

      this.queriesService.editQuery(this.queryId, this.query).subscribe(
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

