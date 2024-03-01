import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';

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
    });
  }

  activeCompany(companyId: string) {
    this.companyService.activedCompany(companyId).subscribe(() => {
      this.listCompanies();
      alert('Empresa Activada.');
    });
  }

  disbaledCompany(companyId: string) {
    this.companyService.disableCompany(companyId).subscribe(() => {
      this.listCompanies();
      alert('¡Empresa Inhabilitada.');
    });
  }

 
}
