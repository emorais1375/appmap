import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';

@Injectable()
export class LocalProvider {

  constructor(private storage: Storage, private datepipe: DatePipe) { }

  public insert(local: Local) {
    let key = this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");
    return this.save(key, local);
  }

  public update(key: string, local: Local) {
    return this.save(key, local);
  }

  private save(key: string, local: Local) {
    return this.storage.set(key, local)
  }

  public remove(key: string) {
    return this.storage.remove(key);
  }

  public getAll() {

    let locais: LocalList[] = [];

    return this.storage.forEach((value: Local, key: string, iterationNumber: number) => {
      let local = new LocalList();
      local.key = key;
      local.local = value;
      locais.push(local);
    })
    .then(() => {
      return Promise.resolve(locais);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
  }
}

export class Local {
  name: string;
  description: string;
  date: number;
  longitude: number;
  latitude: number;
}

export class LocalList {
  key: string;
  local: Local;
}