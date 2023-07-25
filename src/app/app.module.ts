import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ButtonComponent } from './components/button/button.component';
import { ModalComponent } from './components/modal/modal.component';
import { InputComponent } from "./components/input/input.component";
import { CheckboxComponent } from "./components/checkbox/checkbox.component";
import { RadioComponent } from "./components/radio/radio.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./screens/login/login.component";
import { SignUpComponent } from './screens/sign-up/sign-up.component';
import { ProfileComponent } from "./screens/profile/profile.component";
import { LoanSummaryComponent } from './components/loan-summary/loan-summary.component';
import { SeleccionarPerfilComponent } from './screens/seleccionar-perfil/seleccionar-perfil.component';
import { CrearPrestamoComponent } from './screens/crear-prestamo/crear-prestamo.component';
import { GraphComponent } from './components/graph/graph.component';
import { ChartModule } from '@syncfusion/ej2-angular-charts'; 
import { CategoryService, ColumnSeriesService, LineSeriesService } from '@syncfusion/ej2-angular-charts';
import { PrestamoComponent } from './screens/prestamo/prestamo.component';
import { BuscarPrestamoComponent } from './screens/buscar-prestamo/buscar-prestamo.component';
import { CardGroupComponent } from './components/card-group/card-group.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    FooterComponent,
    ButtonComponent,
    ModalComponent,
    InputComponent,
    CheckboxComponent,
    RadioComponent,

    // Screens o pantallas
    LoginComponent,
     SignUpComponent,
    ProfileComponent,
    LoanSummaryComponent,
    SeleccionarPerfilComponent,
    CrearPrestamoComponent,
    GraphComponent,
    PrestamoComponent,
    BuscarPrestamoComponent,
    CardGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ChartModule
  ],
  providers: [CategoryService, ColumnSeriesService, LineSeriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
