import { Component, OnInit } from '@angular/core';
import{CompanyService} from '../../services/company.service'


@Component({
  selector: 'app-list-companies',
  templateUrl: './list-companies.component.html',
  styleUrl: './list-companies.component.scss'
})
export class ListCompaniesComponent  implements OnInit {
  companies: any = [];

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies() {
    this.companyService.listCompanySuperU().subscribe(companies => {
      this.companies = companies;
    });
  }

  approveCompany(companyId: string) {
    this.companyService.approveCompany(companyId).subscribe(() => {
      // Recargar la lista de empresas después de aprobar
      this.loadCompanies();
    });
  }

  denyCompany(companyId: string) {
    this.companyService.denyCompany(companyId).subscribe(() => {
      // Recargar la lista de empresas después de denegar
      this.loadCompanies();
    });
  }

  async openPdf(urlPdf: string, companyName: string): Promise<void> {
    try {
        const response = await fetch(urlPdf, {
            method: 'GET'
        });

        if (response.ok) {
            // Obtener el contenido del encabezado Content-Disposition para obtener el nombre del archivo
            const contentDisposition = response.headers.get('Content-Disposition');
            let filename = 'documento.pdf'; // Nombre de archivo predeterminado

            if (contentDisposition) {
                const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                const matches = filenameRegex.exec(contentDisposition);
                if (matches != null && matches[1]) {
                    filename = matches[1].replace(/['"]/g, '');
                }
            }

            // Agregar el nombre de la empresa al nombre del archivo
            const uniqueFilename = `${companyName}_${filename}`;

            // Crear el Blob y descargar el archivo
            const blob = new Blob([await response.blob()], { type: 'application/pdf' });
            const downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(blob);
            downloadLink.download = uniqueFilename; // Utilizar el nombre único del archivo
            downloadLink.click();
            window.URL.revokeObjectURL(downloadLink.href);
        } else {
            // Manejar errores de la solicitud HTTP (por ejemplo, mostrar un mensaje de error)
        }
    } catch (error) {
        // Manejar errores de red u otros errores
    }
}


  
}