import { Component, Input, OnInit } from '@angular/core';
import { MirthService } from '../../../mirth.service';
import { DataPrunerSettings, ServerSettings, SystemInfo, SystemStats } from './serverSettings.model';
import { map } from 'rxjs';


@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrl: './server.component.css'
})
export class ServerComponent implements OnInit {
  @Input() selectedInstance:string;
  
  serverSettings:ServerSettings;
  systemInfo:SystemInfo;
  systemStats:SystemStats;
  jvmVersion:string;
  mirthVersion:string;
  dataPrunerSettings:DataPrunerSettings;

  constructor(private mirthService: MirthService){}
  
  ngOnInit() {
    this.mirthService.setDomain(this.selectedInstance);
    this.setServerSettings();
    this.setJvmVersion();
    this.setMirthVersion();
    this.setSystemInfo();
    this.setSystemStats();
    this.setDataPrunerStatus();
  }

  setServerSettings(){
    this.mirthService.getServerSettings().pipe(
      map((response:any) => {
        const serverSettings: ServerSettings = {
          environmentName: response.serverSettings.environmentName,
          serverName: response.serverSettings.serverName,
          clearGlobalMap: response.serverSettings.clearGlobalMap,
          smtpHost: response.serverSettings.smtpHost,
          smtpPort: response.serverSettings.smtpPort,
          smtpTimeout: response.serverSettings.smtpTimeout,
          smtpFrom: response.serverSettings.smtpFrom,
          smtpUsername: response.serverSettings.smtpUsername,
          smtpPassword: response.serverSettings.smtpPassword
        };

        return serverSettings;
      })
    ).subscribe((serverSettings: ServerSettings) => {
      this.serverSettings = serverSettings;
    });
  }

  setJvmVersion(){
    this.mirthService.getJvm().subscribe(response => {
      this.jvmVersion = response;
    })
  }

  setMirthVersion(){
    this.mirthService.getMirthVersion().subscribe(response => {
      this.mirthVersion = response;
    })
  }

  setSystemInfo(){
    this.mirthService.getSystemInfo().pipe(
      map((response:any) => {
        const systemInfo: SystemInfo = {
          jvmVersion: response["com.mirth.connect.model.SystemInfo"].jvmVersion,
          osName: response["com.mirth.connect.model.SystemInfo"].osName,
          osVersion: response["com.mirth.connect.model.SystemInfo"].osVersion,
          osArchitecture: response["com.mirth.connect.model.SystemInfo"].osArchitecture,
          dbName: response["com.mirth.connect.model.SystemInfo"].dbName,
          dbVersion: response["com.mirth.connect.model.SystemInfo"].dbVersion
        };

        return systemInfo;
      })
    ).subscribe((systemInfo: SystemInfo) => {
      this.systemInfo = systemInfo;
    });
  }

  setSystemStats(){
    this.mirthService.getSystemStats().pipe(
      map((response:any) => {
        const systemStats: SystemStats = {
          cpuUsagePct: response["com.mirth.connect.model.SystemStats"].cpuUsagePct,
          allocatedMemoryBytes: response["com.mirth.connect.model.SystemStats"].allocatedMemoryBytes,
          freeMemoryBytes: response["com.mirth.connect.model.SystemStats"].freeMemoryBytes,
          maxMemoryBytes: response["com.mirth.connect.model.SystemStats"].maxMemoryBytes,
          diskFreeBytes: response["com.mirth.connect.model.SystemStats"].diskFreeBytes,
          diskTotalBytes: response["com.mirth.connect.model.SystemStats"].diskTotalBytes
        };

        return systemStats;
      })
    ).subscribe((systemStats: SystemStats) => {
      this.systemStats = systemStats;
    });
  }

  setDataPrunerStatus(){
    this.mirthService.getDataPrunerStatus().pipe(
      map((response:any) => {
        let dataPrunerSettings = new DataPrunerSettings();
        console.log(response.properties.property)
        response.properties.property.forEach(element => {
          console.log(element)
          let name = element['@name'];
          let value = element['$'];
          console.log(name, value)

          if (name === 'archiveEnabled')
            dataPrunerSettings.archiveEnabled = value.replace('<boolean>','').replace('</boolean>','')
          else if (name === 'enabled')
            dataPrunerSettings.enabled = value
          else if (name === 'archiverBlockSize')
            dataPrunerSettings.archiverBlockSize = value
          else if (name === 'includeAttachments')
            dataPrunerSettings.includeAttachments = value.replace('<boolean>','').replace('</boolean>','')
          else if (name === 'pruneEvents')
            dataPrunerSettings.pruneEvents = value
          else if (name === 'pruningBlockSize')
            dataPrunerSettings.pruningBlockSize = value
        });
        return dataPrunerSettings;
      })
    ).subscribe((dataPrunerSettings: DataPrunerSettings) => {
      this.dataPrunerSettings = dataPrunerSettings;
    })
  }
}
