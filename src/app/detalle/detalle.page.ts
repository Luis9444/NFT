import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  nft: any;
  idNftSeleccionado: any;
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.idNftSeleccionado = this.activatedRoute.snapshot.paramMap.get('id');

    console.log('este es el id: ', this.idNftSeleccionado);

    this.http
      .get<any>(
        'https://api.coingecko.com/api/v3/nfts/' + this.idNftSeleccionado
      )
      .subscribe((res) => {
        console.log(res);
        this.nft = res;
      });
  }
}
