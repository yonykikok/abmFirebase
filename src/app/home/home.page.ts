import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  usuario = {
    email: "jonathan@gmail.com",
    password: "123456"
  }

  listaDeUsuarios = [];

  constructor(private database: DatabaseService) { }

  ngOnInit() {
    this.database.getAll('usuarios').then(firebaseResponse => {
      firebaseResponse.subscribe(listaDeUsuariosRef => {

        this.listaDeUsuarios = listaDeUsuariosRef.map(usuarioRef => {
          let usuario = usuarioRef.payload.doc.data();
          usuario['id'] = usuarioRef.payload.doc.id;
          return usuario;
        })
        console.log(this.listaDeUsuarios);

      })
    })
  }

  eliminar(id) {
    this.database.delete('usuarios', id).then(res => {
      alert("Se elimino con exito");
    }).catch(err => {
      console.log("ERROR al eliminar ", err);
    });
  }


  altaUsuario() {
    this.database.create('usuarios', this.usuario).then(res => {
      console.log(res);
    }).catch(err => {
      console.log("error en alta: ", err);
    });
  }

  modificar() {
    let id = "93NQ2BPoxIEL6ASGl1bn";
    this.database.update('usuarios', id, this.usuario).then(res => {
      alert("se modifico el usuario");
    }).catch(err => {
      console.log("Error al modificar: ", err)
    })
  }

  obtenerPorId(id) {

    this.database.getById('usuarios', id).then(res => {
      res.subscribe(docRef => {
        let usuario = docRef.data();
        usuario['id'] = docRef.id;
        console.log(usuario)
      })
    })
  }

}
