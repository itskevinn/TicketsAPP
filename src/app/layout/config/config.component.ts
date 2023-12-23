import {Component, Input} from '@angular/core';
import {LayoutService} from "../service/layout.service";

@Component({
    selector: 'app-config',
    templateUrl: './config.component.html'
})
export class ConfigComponent {

    @Input() minimal: boolean = false;

    scales: number[] = [12, 13, 14, 15, 16];

    constructor(public layoutService: LayoutService) {
    }

    get visible(): boolean {
        return this.layoutService.state.configSidebarVisible;
    }

    set visible(_val: boolean) {
        this.layoutService.state.configSidebarVisible = _val;
    }

    get scale(): number {
        return this.layoutService.config().scale;
    }

    set scale(_val: number) {
        this.layoutService.config.update((config) => ({
            ...config,
            scale: _val,
        }));
    }

    get menuMode(): string {
        return this.layoutService.config().menuMode;
    }

    set menuMode(_val: string) {
        this.layoutService.config.update((config) => ({
            ...config,
            menuMode: _val,
        }));
    }

    get inputStyle(): string {
        return this.layoutService.config().inputStyle;
    }

    set inputStyle(_val: string) {
        this.layoutService.config().inputStyle = _val;
    }

    get ripple(): boolean {
        return this.layoutService.config().ripple;
    }

    set ripple(_val: boolean) {
        this.layoutService.config.update((config) => ({
            ...config,
            ripple: _val,
        }));
    }

    onConfigButtonClick() {
        this.layoutService.showConfigSidebar();
    }

    changeTheme(theme: string, colorScheme: string) {
        this.layoutService.config.update((config) => ({...config, theme: theme, colorScheme: colorScheme}));
    }


    decrementScale() {
        this.scale--;
        this.applyScale();
    }

    incrementScale() {
        this.scale++;
        this.applyScale();
    }

    applyScale() {
        this.layoutService.config.update((config) => ({
            ...config,
            scale: this.scale,
        }));
    }
}
