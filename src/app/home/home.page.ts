import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listadoNfts: any;
  cantidad = 10;
  listadoPlataformas: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.traerListadoPlataformas();
    this.llamarApi();
  }

  handleChange() {
    if (this.cantidad == 10) {
      this.cantidad = 50;
      this.llamarApi();
    } else {
      this.cantidad = 10;
      this.llamarApi();
    }
  }

  llamarApi() {
    this.http
      .get<any>(
        `https://api.coingecko.com/api/v3/nfts/list?per_page=${this.cantidad}&page=1`
      )
      .subscribe((res) => {
        this.listadoNfts = res;
      });
  }

  traerListadoPlataformas() {
    this.http
      .get<any>(`https://api.coingecko.com/api/v3/asset_platforms?filter=nft`)
      .subscribe((res) => {
        this.listadoPlataformas = res;
      });
  }

  handleBuscar(event: any) {
    let textoBuscado = event.detail.value.toLowerCase();
    if (textoBuscado == '') {
      this.llamarApi();
    } else {
      this.listadoNfts = this.listadoNfts.filter((nft: any) => {
        return nft.name.toLowerCase().includes(textoBuscado);
      });
    }
  }

  handleClearBusqueda() {
    this.llamarApi();
  }

  handleFiltrar(event: any) {
    let plataformaElegida = event.detail.value;
    this.listadoNfts = this.listadoNfts.filter((nft: any) => {
      return nft.asset_platform_id === plataformaElegida;
    });
  }

  handleCancelFiltrar(event: any) {
    this.llamarApi();
  }
}
