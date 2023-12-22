import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  public cliente:Cliente = new Cliente();
  public titulo:string='Crear Cliente';
  constructor(private clienteService:ClienteService, 
    private router:Router, 
    private activetedRouter:ActivatedRoute){}
    
    ngOnInit(): void {
      this.cargarCliente();
    }

  cargarCliente():void{
    this.activetedRouter.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe(cliente =>{
          this.cliente = cliente
          this.titulo='Editar Cliente'
        })
      }
    })
  }

  public create():void{
    this.clienteService.create(this.cliente).subscribe(
      cliente =>{
        this.router.navigate(['/clientes'])
        Swal.fire('Nuevo Cliente',`${cliente.nombre} creado con éxito`, 'success');
      }
    );
  }

  public update():void{
    this.clienteService.update(this.cliente).subscribe(
      cliente =>{
        this.router.navigate(['/clientes'])
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `El cliente ${cliente.nombre} fue editado`,
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }
}
