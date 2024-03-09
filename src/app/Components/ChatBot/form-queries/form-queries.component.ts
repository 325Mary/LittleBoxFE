import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../services/chatbot/category.service';
import { SubcategoryService } from '../../../services/chatbot/subcategory.service';
import { Query } from '../../../Models/queries';
import { QueriesService } from '../../../services/chatbot/queries.service';


@Component({
  selector: 'app-form-queries',
  templateUrl: './form-queries.component.html',
  styleUrl: './form-queries.component.scss'
})
export class FormQueriesComponent {
  queryForm: FormGroup;
  titulo = "CREAR CONSULTA";
  id: string | null;
  errorReferenciaEnUso: string = '';
  subcategories: any[] = [];

  constructor(
    private buil: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private QService: QueriesService,
    private aRouter: ActivatedRoute,
    private SService: SubcategoryService,
  ) {
    this.queryForm = this.buil.group({
      identifier: ['', Validators.required],
      question: ['', Validators.required],
      answer: ['', Validators.required],
      subcategory: ['', Validators.required]
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  
  ngOnInit(): void {
    this.XEditar()
    this.SService.showSubcategories().subscribe(
      (data: any[]) => {
        this.subcategories = data;
      },
      error => {
        console.log(error);
      }
    );
  }
    
  onlyNumber(event: any) {
    const pattern = /^[0-9]*$/;
    if (event.key.length === 1 && !pattern.test(event.key)) {
      event.preventDefault();
    }
  }
  
  esTeclaBorrado(event: any): boolean {
    return event.key === 'Backspace' || event.key === 'Delete';
  }

  addQuery() {
    const QUERY: Query = {
      identifier: this.queryForm.get('identifier')?.value,
      question: this.queryForm.get('question')?.value,
      answer: this.queryForm.get('answer')?.value,
      subcategory: this.queryForm.get('subcategory')?.value,
    };

    if (this.id !== null) {
      this.QService.editQuery(this.id, QUERY).subscribe(data => {
        this.toastr.info('La consulta se ha actualizado con éxito.', 'Se ha actualizado con éxito:');
        this.router.navigate(['/listCategory']);
      }, error => {
        console.log(error);
        this.queryForm.reset();
      });

    } else {
      this.QService.saveQuery(QUERY).subscribe(data => {
        this.toastr.success('La consulta fue registrada con éxito.', 'Consulta registrada:');
        this.router.navigate(['/listCategory']);
      }, error => {
        console.log(error);
        this.queryForm.reset();
      });
    }
  }

  XEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar consulta';
      this.QService.getAQuery(this.id).subscribe(data => {
        this.queryForm.setValue({
          identifier: data.identifier,
          question: data.question,
          answer: data.answer,
          subcategory: data.subcategory,
        });
      });
    }
  }
}
