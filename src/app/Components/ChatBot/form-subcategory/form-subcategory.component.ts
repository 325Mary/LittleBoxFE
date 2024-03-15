import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SubcategoryService } from '../../../services/chatbot/subcategory.service';
import { Subcategory } from '../../../Models/subcategory';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../../../services/chatbot/category.service';

@Component({
  selector: 'app-form-subcategory',
  templateUrl: './form-subcategory.component.html',
  styleUrls: ['./form-subcategory.component.scss']
})
export class FormSubcategoryComponent implements OnInit {
  subcategoryForm: FormGroup;
  titulo = "CREAR SUBCATEGORIA";
  @Input() id: string | null = null;
  categories: any[] = [];

  constructor(private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private subcategoryService: SubcategoryService,
              private CaService: CategoryService,
              public activeModal: NgbActiveModal) {

    this.subcategoryForm = this.formBuilder.group({
      identifier: ['', Validators.required],
      name: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadSubcategoryForEdit();
  }

  loadCategories(): void {
    this.CaService.showCategories().subscribe( 
      (data: any[]) => {
        this.categories = data;
      },
      error => { 
        console.log(error);
      }
    );
  }

  loadSubcategoryForEdit(): void {
    if (this.id !== null) {
      this.titulo = 'Editar subclase';
      this.subcategoryService.getASubcategory(this.id).subscribe(data => {
        this.subcategoryForm.setValue({
          identifier: data.identifier,
          name: data.name,
          category: data.category
        });
      });
    }
  }

  addSubcategory(): void {
    const subcategory: Subcategory = {
      identifier: this.subcategoryForm.get('identifier')?.value,
      name: this.subcategoryForm.get('name')?.value,
      category: this.subcategoryForm.get('category')?.value
    };

    if (this.id !== null) {
      this.subcategoryService.editSubcategory(this.id, subcategory).subscribe(data => {
        this.toastr.info('La subclase se ha actualizado con éxito.', 'Se ha actualizado con éxito:');
        this.activeModal.close('Modal cerrada');
      }, error => {
        console.log(error);
        this.subcategoryForm.reset();
      });
    } else {
      this.subcategoryService.saveSubcategory(subcategory).subscribe(data => {
        this.toastr.success('La subclase fue registrada con éxito.', 'Subclase registrada:');
        this.activeModal.close('Modal cerrada');
      }, error => {
        console.log(error);
        this.subcategoryForm.reset();
      });
    }
  }

  cerrarModal(): void {
    this.activeModal.close('Modal cerrada');
  }
}
