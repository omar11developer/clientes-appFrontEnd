import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  constructor(private clienteService:ClienteService){

  }
  clientes:Cliente[];

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );
  }

  public delete(cliente:Cliente):void{
    Swal.fire({
      title: "Estas seguro?",
      text: `¿Seguro que deseas eliminar al cliente ${cliente.nombre}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          response =>{
            this.clientes = this.clientes.filter(cli => cli != cliente)
            Swal.fire({
              title: "Eliminado!",
              text: `El cliente ${cliente.nombre} eliminado con exito`,
              icon: "success"
            });
          }
        )
       
      }
    });
  }


}
