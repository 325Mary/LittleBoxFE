import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SubcategoryService } from '../../../services/chatbot/subcategory.service';
import { CategoryService } from '../../../services/chatbot/category.service';
import { Subcategory } from '../../../Models/subcategory';

@Component({
  selector: 'app-form-subcategory',
  templateUrl: './form-subcategory.component.html',
  styleUrl: './form-subcategory.component.scss'
})
export class FormSubcategoryComponent {
  subcategoryForm: FormGroup
  titulo = "CREAR SUBCATEGORIA";
  id: string | null
  categories: any[] = [];

  constructor (private buil : FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private SService: SubcategoryService,
              private CaService : CategoryService,
              private aRouter: ActivatedRoute,
              ){

    this.subcategoryForm = this.buil.group({
      identifier: ['', Validators.required],
      name: ['', Validators.required],
      category: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    
      this.XEditar()
      this.CaService.showCategories().subscribe(
        (data: any[]) => {
          this.categories = data;
        },
        error => {
          console.log(error);
        }
      );
    }

  addSubcategory(){
    const SUBCATEGORY: Subcategory = {
      identifier: this.subcategoryForm.get('identifier')?.value,
      name: this.subcategoryForm.get('name')?.value,
      category: this.subcategoryForm.get('category')?.value
    }

    if (this.id !== null) {
      
      this.SService.editSubcategory(this.id, SUBCATEGORY).subscribe(data => {
        this.toastr.info('La subclase se ha actualizado con exito.', 'Se ha actualizado con exito:')
        this.router.navigate(['/lista-subclase'])

      }, error =>{
        console.log(error)
        this.subcategoryForm.reset()
      })

    }else{

      this.SService.saveSubcategory(SUBCATEGORY).subscribe(data =>{
        this.toastr.success('La subclase fue registrada con exito.', 'Subclase resgitrada:')
        this.router.navigate(['/lista-subclase'])
      }, error =>{
        console.log(error)
        this.subcategoryForm.reset()
      })
    }
    }

  XEditar (){
    if (this.id !== null) {

      this.titulo = 'Editar subclase'
      this.SService.getASubcategory(this.id).subscribe(data=>{
        this.subcategoryForm.setValue({
          referencia: data.referencia,
          nombre: data.nombre,
          categoria: data.categoria
        })
      })
    }
  }
}
