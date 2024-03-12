export interface ServerSettings {
    environmentName: string;
    serverName: string;
    clearGlobalMap: boolean;
    defaultMetaDataColumns?: Array<MetaDataColumn>;
    defaultAdministratorBackgroundColor?: MirthColor;
    smtpHost?: string;
    smtpPort?: number;
    smtpTimeout: number;
    smtpFrom?: string;
    smtpUsername?: string;
    smtpPassword?: string;
}

export class MetaDataColumn{
    name: string;
    type: string;
    mappingName: string;
}

export class MirthColor{
    red: number;
    green: number;
    blue: number;
    alpha: number;
}

export class SystemInfo{
    jvmVersion: string;
    osName: string;
    osVersion: string;
    osArchitecture: string;
    dbName: string;
    dbVersion: string;
}

export class SystemStats{
    cpuUsagePct: number;
    allocatedMemoryBytes: number;
    freeMemoryBytes: number;
    maxMemoryBytes: number;
    diskFreeBytes: number;
    diskTotalBytes: number;
}

export class DataPrunerSettings{
    enabled:boolean;
    includeAttachments:boolean;
    maxEventAge?:number;
    archiveEnabled:boolean;
    archiverBlockSize:number;
    archiverOptions?:string;
    pruneEvents?:string;
    pruningBlockSize:number;

}