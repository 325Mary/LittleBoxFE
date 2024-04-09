import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { TokenValidationService } from "../../services/token-validation-service.service";
import Swal from 'sweetalert2';



@Component({
  selector: 'app-list-companies-aproved',
  templateUrl: './list-companies-aproved.component.html',
  styleUrls: ['./list-companies-aproved.component.scss']
})
export class ListCompaniesAprovedComponent implements OnInit {
  companies: any = [];
  selectedCompany: any;

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.listCompanies();
  }

  listCompanies() {
    this.companyService.listCompanies().subscribe(companies => {
      this.companies = companies;
    }
    );
  }

  activeCompany(companyId: string) {
    this.companyService.activedCompany(companyId).subscribe(() => {
      this.listCompanies();
      Swal.fire('Éxito', 'Empresa Activada correctamente.', 'success');
      // alert('Empresa Activada.');
    },
    error =>{
      console.error('Hubo un error al activar la empresa:', error);
      Swal.fire('Error', 'Hubo un error al activar la empresa.', 'error');
    });
  }

  disbaledCompany(companyId: string) {
    this.companyService.disableCompany(companyId).subscribe(() => {
      this.listCompanies();
      // alert('¡Empresa Inhabilitada.');
      Swal.fire('Éxito', 'Empresa Inhabilitada correctamente.', 'success');
    },
    error =>{
      console.error('Error al Inhabilitar la empresa:', error);
      Swal.fire('Error', 'Error al Inhabilitar la empresa.', 'error');
    });
  }

 
}