import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-company-solicitud',
  templateUrl: './modal-company-solicitud.component.html',
  styleUrl: './modal-company-solicitud.component.scss'
})
export class ModalCompanySolicitudComponent {
  @Input() company: any;
  mostrarModal: boolean = false;
  egresoSeleccionado: any;



  cerrarModal() {
    this.mostrarModal = false;
    this.egresoSeleccionado = null;
  }

  
  async verRut(): Promise<void> {
    if (this.company && this.company.pdfRunt && this.company.nameCompany) {
      // Llamar al método para abrir la factura en el navegador
      await this.openPdf(this.company.pdfRunt, 'Rut', this.company.nameCompany);
    } else {
      // Manejar el caso donde no hay URL de factura definida en el egreso o no hay ID de egreso
      alert('Error al obtener la Factura');
    }
  }
  

  async openPdf(urlPdf: string, pdfRunt: string, nameCompany: string): Promise<void> {
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
  
            // Crear el nombre de archivo único combinando el ID del egreso con el nombre de la factura
            const uniqueFilename = `${nameCompany}_${pdfRunt}`;
  
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


  

