import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardModule, GridModule, NavModule, UtilitiesModule, TabsModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { ColorsComponent, ThemeColorComponent } from './colors.component';
import { TypographyComponent } from './typography.component';

import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
// Theme Routing
import { ThemeRoutingModule } from './theme-routing.module';

import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ThemeRoutingModule,
    CardModule,
    GridModule,
    UtilitiesModule,
    IconModule,
    NavModule,
    TabsModule,
    HttpClientModule,
    AngularEditorModule,
    FormsModule

  ],
  declarations: [
    ColorsComponent,
    ThemeColorComponent,
    TypographyComponent,
  ]
})
export class ThemeModule {
}
