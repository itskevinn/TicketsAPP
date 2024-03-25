import {Injectable} from '@angular/core';
import {Response} from "../../data/models/response.model";
import {MessageService} from "primeng/api";
import {Message} from "primeng/api/message";

@Injectable({
    providedIn: 'root'
})
export class CustomMessageService {

    constructor(private messageService: MessageService) {
    }

    public handleResponse(r: Response<any>, showSuccess = true): void {
        if (!r.success) {
            this.messageService.add({
                closable: true,
                key: 'gt',
                severity: 'error',
                summary: 'Ha ocurrido un error',
                detail: `${r.message}: ${r.exceptionMessage}`,
            });
            return;
        }
        if (showSuccess) {
            this.messageService.add({
                closable: true,
                key: 'gt',
                severity: 'success',
                summary: 'Hecho',
                detail: r.message,
            });
        }
    }

    public add(message: Message) {
        this.messageService.add(message);
    }
}
