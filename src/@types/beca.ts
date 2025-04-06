export interface IdiomaRequerido {
    idioma?: string
    nivelIdioma?: string
}

export interface Duracion {
    duracionMinima?: number
    duracionMaxima?: number
    duracionUnidad?: string
}

export interface Requisitos {
    nivelAcademicoMin?:
        | 'Doctorado'
        | 'Grado'
        | 'Maestría'
        | 'Posdoctorado'
        | 'Posgrado'
    idiomaCondicion?: boolean
    idiomasRequeridos?: IdiomaRequerido[]
    avalUnivProcedencia?: boolean
    avalUnivDestino?: boolean
    edadMax?: number
    cartaRecomendacion?: boolean
    promedioCondicion?: boolean
    promedioMin?: number
    necesidadEconom?: boolean
    examenesRequeridos?: string[]
    otros?: string[]
}

export interface Cobertura {
    matricula?: boolean
    estipendio?: boolean
    pasajes?: boolean
    seguroMedico?: boolean
    alojamiento?: boolean
    montoMensualMin?: number
    montoMensualMax?: number
}

export interface InformacionAdicional {
    sitioWeb?: string
    correoContacto?: string
}

export type TipoBeca =
    | 'Doctorado'
    | 'Fondos para investigación'
    | 'Estancia de investigación'
    | 'Grado'
    | 'Maestría'
    | 'Posdoctorado'
    | 'Posgrado'

export interface Beca {
    _id: string
    paisDestino: string
    regionDestino: string
    nombreBeca: string
    cantCupos?: number
    nivelAcademico: string
    areaEstudio: string
    universidadDestino?: string
    paisPostulante: string[]
    entidadBecaria?: string
    duracion?: Duracion
    fechaInicioAplicacion?: string
    fechaFinAplicacion?: string
    tipoBeca: TipoBeca
    requisitos?: Requisitos
    cobertura?: Cobertura
    informacionAdicional?: InformacionAdicional
    destacada?: boolean
    dificultad?: number
    imagen?: string
}

export type NuevaBeca = Omit<Beca, '_id'>

export type ActualizarBeca = Partial<Omit<Beca, '_id'>> & { _id: string }
