import { Component } from '@angular/core';
import { Category } from '../../../Models/category';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/chatbot/category.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrl: './form-category.component.scss'
})
export class FormCategoryComponent {

   //Modal:
   cerrarModal() {
    this.activeModal.close('Modal cerrada');
  }


  //Component: 
  categoryForm: FormGroup
  titulo = "CREAR CATEGORIA";
  id: string | null

  constructor (private buil : FormBuilder,
              private toastr: ToastrService,
              private CaService: CategoryService,
              private aRouter: ActivatedRoute,
              public activeModal: NgbActiveModal){



    this.categoryForm = this.buil.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
      this.XEditar()
  }

  addCategory(){
    const CATEGORY: Category = {
      name: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value
    }

    if (this.id !== null) {
      
      this.CaService.editCategory(this.id, CATEGORY).subscribe(data => {
        this.toastr.info('La categoria se ha actualizado con exito.', 'Se ha actualizado con exito:')

      }, error =>{
        console.log(error)
        this.categoryForm.reset()
      })

    }else{

      this.CaService.saveCategory(CATEGORY).subscribe(data =>{
        this.toastr.success('La categoria fue registrada con exito.', 'Categoria registrada:')
      }, error =>{
        console.log(error)
        this.categoryForm.reset()
      })
    }
    }

  XEditar (){
    if (this.id !== null) {

      this.titulo = 'Editar categoria'
      this.CaService.getACategory(this.id).subscribe(data=>{
        this.categoryForm.setValue({
          name: data.name,
          description: data.description,
        })
      })
    }
  }

}
