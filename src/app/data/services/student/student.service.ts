import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class StudentService {
    getData() {
        return[
            {
                id: 1000,
                name: 'jhonson',
                country: {
                    name: 'Butt',
                    code: 'dz'
                }
            },
            {
                id: 1000,
                name: 'James',
                country: {
                    name: 'Algeria',
                    code: 'dz'
                }
            },
            {
                id: 1000,
                name: 'James',
                country: {
                    name: 'baca',
                    code: 'dz'
                }
            },
            {
                id: 1000,
                name: 'cut',
                country: {
                    name: 'sex',
                    code: 'dz'
                }
            },
            {
                id: 1000,
                name: 'j Butt',
                country: {
                    name: 'coma',
                    code: 'dz'
                }
            },
            {
                id: 1000,
                name: 'el',
                country: {
                    name: 'paspi',
                    code: 'dz'
                }
            },
            {
                id: 1000,
                name: 'elkin',
                country: {
                    name: 'sex',
                    code: 'dz'
                }
            },
            {
                id: 1000,
                name: 'fernando',
                country: {
                    name: 'elbellaquito',
                    code: 'dz'
                }
            },
            {
                id: 1000,
                name: 'sharadia',
                country: {
                    name: 'diaz',
                    code: 'dz'
                }
            },
            {
                id: 1000,
                name: 'mario',
                country: {
                    name: 'white',
                    code: 'dz'
                }
            },
        ];
    }

    constructor(private http: HttpClient) {}
    
    getCustomersMini() {
        return Promise.resolve(this.getData().slice(0, 5));
    }

    getCustomersSmall() {
        return Promise.resolve(this.getData().slice(0, 10));
    }

    getCustomersMedium() {
        return Promise.resolve(this.getData().slice(0, 50));
    }

    getCustomersLarge() {
        return Promise.resolve(this.getData().slice(0, 200));
    }

    getCustomersXLarge() {
        return Promise.resolve(this.getData());
    }

    getCustomers(params?: any) {
        return this.http.get<any>('https://www.primefaces.org/data/customers', { params: params }).toPromise();
    }
};