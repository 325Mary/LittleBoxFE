import { Component } from '@angular/core';
import { TercerosService } from "../../services/terceros.service";
import { TokenValidationService } from "../../services/token-validation-service.service";
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  ModalTerceroComponent} from "../modal-tercero/modal-tercero.component";
@Component({
  selector: 'app-list-terceros',
  templateUrl: './list-terceros.component.html',
  styleUrl: './list-terceros.component.scss'
})
export class ListTercerosComponent {
  
  terceros: any[] = [];

  constructor(private tercerosService: TercerosService, private tokenValidationService: TokenValidationService, private modalService: NgbModal) { }


  ngOnInit(): void {
    this.obtenerTercerosPorTenantId();
  }

  obtenerTercerosPorTenantId() {
    this.tercerosService.obtenerTerceros().subscribe(
      (response: any) => {
        this.terceros = response.data; // Asignar la matriz de terceros desde la propiedad 'data' del objeto de respuesta
        console.log(this.terceros);
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }
  
  openEditModal(tercero: any) {
    const modalRef = this.modalService.open(ModalTerceroComponent); // Abre el modal
    modalRef.componentInstance.tercero = tercero; // Pasa el tercero seleccionado al modal
  }

}