export type Pais = {
    _id: string
    nombre: string
    ficha_general_pais: {
        capital: string
        idiomas_oficiales: string[]
        region?: string
        poblacion_total?: string
    }
    costo_vida_mensual_usd?: {
        moneda?: string
        tipo_cambio_usd?: string
        residencia_universitaria_usd?: string
        supermercado_mensual_usd?: string
        transporte_publico_usd?: string
        seguro_medico_obligatorio?: string
    }
    sistema_educacion?: {
        descripcion_general?: string
        idiomas_instruccion: string[]
        calendario_academico?: string
    }
    universidades_mejor_rankeadas?: Array<{
        nombreRanking: string
        universidades: Array<{
            nombre: string
            posicion: number
            _id?: string
        }>
    }>
    comunidad_estudiantil_internacional?: {
        porcentaje_estudiantes_internacionales?: string
    }
    visa_y_requisitos_migratorios?: {
        tipo_visa_estudiante?: string
        documentacion_necesaria?: string[]
        trabajo_con_visa_estudiante?: string
    }
    clima_y_estilo_vida?: {
        clima_promedio_ciudades?: string
        nivel_seguridad?: string
        oferta_cultural_recreativa?: string
        enchufes_y_voltaje?: string
    }
}
