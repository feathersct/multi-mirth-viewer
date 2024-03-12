import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SettingsComponent } from './instances/settings/settings.component';
import { ServerComponent } from './instances/settings/server/server.component';
import { HeaderComponent } from './header/header.component';
import { InstancesComponent } from './instances/instances.component';
import { HttpClientModule } from '@angular/common/http';
import { MirthService } from './mirth.service';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    ServerComponent,
    HeaderComponent,
    InstancesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [MirthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
