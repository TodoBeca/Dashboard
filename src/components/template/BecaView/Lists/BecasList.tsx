import React, { useState, useEffect } from 'react'
import { Table, Button } from '@/components/ui'
import THead from '@/components/ui/Table/THead'
import Th from '@/components/ui/Table/Th'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import { useBecas } from '@/utils/hooks/useBecas'
import { Skeleton } from '@/components/ui'
import '../becasViewStyles.css'
import { Beca } from '@/@types/beca'
import BecaEditForm from '../Forms/editBecaForm'
import AddBecaButton from '../Buttons/AddBecaButton'
import AddBecaForm from '../Forms/AddBecaForm'

const BecasList: React.FC = () => {
    const { becas, loading, error, fetchBecas } = useBecas()
    const [expandedBeca, setExpandedBeca] = useState<string | null>(null)
    const [selectedTipo, setSelectedTipo] = useState<string>('Mostrar Todos')
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [editingBeca, setEditingBeca] = useState<Beca | null>(null)
    const [isAddingBeca, setIsAddingBeca] = useState(false)

    useEffect(() => {
        fetchBecas()
    }, [fetchBecas])

    const toggleExpandBeca = (id: string) => {
        setExpandedBeca(expandedBeca === id ? null : id)
    }

    const filteredBecas = becas.filter((beca) => {
        const matchesType =
            selectedTipo === 'Mostrar Todos' || beca.tipoBeca === selectedTipo
        const matchesSearch =
            !searchTerm ||
            beca.nombreBeca.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (beca.paisDestino &&
                beca.paisDestino
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())) ||
            (beca.areaEstudio &&
                beca.areaEstudio
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()))

        return matchesType && matchesSearch
    })

    const handleEditSuccess = (updatedBeca: Beca) => {
        setEditingBeca(null)
        fetchBecas()
    }

    const handleAddBeca = () => {
        setIsAddingBeca(true)
    }

    const handleAddSuccess = (newBeca: Beca) => {
        setIsAddingBeca(false)
        fetchBecas()
    }

    if (loading) {
        return (
            <div>
                {Array.from(new Array(5)).map((_, index) => (
                    <Skeleton
                        key={index}
                        width="100%"
                        height={120}
                        style={{ marginBottom: '10px' }}
                    />
                ))}
            </div>
        )
    }

    if (error) {
        return (
            <div className="error-message">
                Error al cargar las becas: {error}
            </div>
        )
    }

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'No especificado'
        return new Date(dateString).toLocaleDateString()
    }

    const renderDetails = (beca: Beca) => (
        <div className="beca-details">
            <h4 className="pb-2">Detalles completos de la beca</h4>

            {/* Información Básica */}
            <div className="details-section">
                <h5 className="font-medium mb-2">Información Básica</h5>
                <div className="details-grid">
                    <div className="detail-item">
                        <strong>Nombre:</strong> {beca.nombreBeca}
                    </div>
                    <div className="detail-item">
                        <strong>Tipo:</strong> {beca.tipoBeca}
                    </div>
                    <div className="detail-item">
                        <strong>Nivel académico:</strong> {beca.nivelAcademico}
                    </div>
                    <div className="detail-item">
                        <strong>País destino:</strong> {beca.paisDestino}
                    </div>
                    <div className="detail-item">
                        <strong>Región destino:</strong>{' '}
                        {beca.regionDestino || 'No especificado'}
                    </div>
                    <div className="detail-item">
                        <strong>Área de estudio:</strong> {beca.areaEstudio}
                    </div>
                    <div className="detail-item">
                        <strong>Universidad destino:</strong>{' '}
                        {beca.universidadDestino || 'No especificado'}
                    </div>
                    <div className="detail-item">
                        <strong>Entidad becaria:</strong>{' '}
                        {beca.entidadBecaria || 'No especificado'}
                    </div>
                    <div className="detail-item">
                        <strong>Cantidad de cupos:</strong>{' '}
                        {beca.cantCupos || 'No especificado'}
                    </div>
                </div>
            </div>

            {/* Duración y Fechas */}
            <div className="details-section mt-4">
                <h5 className="font-medium mb-2">Duración y Fechas</h5>
                <div
                    className="details-grid"
                    style={{ gridTemplateColumns: '1fr 1fr 1fr' }}
                >
                    <div className="detail-item">
                        <strong>Duración:</strong>{' '}
                        {beca.duracion?.duracionMinima &&
                        beca.duracion?.duracionMaxima
                            ? `${beca.duracion.duracionMinima}-${beca.duracion.duracionMaxima} ${beca.duracion.duracionUnidad}`
                            : 'No especificado'}
                    </div>
                    <div className="detail-item">
                        <strong>Fecha inicio aplicación:</strong>{' '}
                        {formatDate(beca.fechaInicioAplicacion)}
                    </div>
                    <div className="detail-item">
                        <strong>Fecha fin aplicación:</strong>{' '}
                        {formatDate(beca.fechaFinAplicacion)}
                    </div>
                </div>
            </div>

            {/* Requisitos */}
            <div className="details-section mt-4">
                <h5 className="font-medium mb-2">Requisitos</h5>
                <div className="details-grid">
                    <div className="detail-item">
                        <strong>Nivel académico mínimo:</strong>{' '}
                        {beca.requisitos?.nivelAcademicoMin ||
                            'No especificado'}
                    </div>
                    <div className="detail-item">
                        <strong>Edad máxima:</strong>{' '}
                        {beca.requisitos?.edadMax || 'No especificado'}
                    </div>
                    <div className="detail-item">
                        <strong>Promedio mínimo:</strong>{' '}
                        {beca.requisitos?.promedioMin || 'No especificado'}
                    </div>
                    <div className="detail-item">
                        <strong>Requiere idioma:</strong>{' '}
                        {beca.requisitos?.idiomaCondicion ? 'Sí' : 'No'}
                    </div>
                    <div className="detail-item">
                        <strong>Aval universidad procedencia:</strong>{' '}
                        {beca.requisitos?.avalUnivProcedencia ? 'Sí' : 'No'}
                    </div>
                    <div className="detail-item">
                        <strong>Aval universidad destino:</strong>{' '}
                        {beca.requisitos?.avalUnivDestino ? 'Sí' : 'No'}
                    </div>
                    <div className="detail-item">
                        <strong>Carta de recomendación:</strong>{' '}
                        {beca.requisitos?.cartaRecomendacion ? 'Sí' : 'No'}
                    </div>
                    <div className="detail-item">
                        <strong>Necesidad económica:</strong>{' '}
                        {beca.requisitos?.necesidadEconom ? 'Sí' : 'No'}
                    </div>
                </div>

                {/* Idiomas Requeridos */}
                {beca.requisitos?.idiomasRequeridos &&
                    beca.requisitos.idiomasRequeridos.length > 0 && (
                        <div className="mt-2">
                            <strong>Idiomas requeridos:</strong>
                            <ul className="list-disc pl-5 mt-1">
                                {beca.requisitos.idiomasRequeridos.map(
                                    (idioma, idx) => (
                                        <li key={idx}>
                                            {idioma.idioma} - Nivel:{' '}
                                            {idioma.nivelIdioma}
                                        </li>
                                    ),
                                )}
                            </ul>
                        </div>
                    )}
            </div>

            {/* Cobertura */}
            <div className="details-section mt-4">
                <h5 className="font-medium mb-2">Cobertura</h5>
                <div className="details-grid">
                    <div className="detail-item">
                        <strong>Matrícula:</strong>{' '}
                        {beca.cobertura?.matricula ? 'Sí' : 'No'}
                    </div>
                    <div className="detail-item">
                        <strong>Estipendio:</strong>{' '}
                        {beca.cobertura?.estipendio ? 'Sí' : 'No'}
                    </div>
                    <div className="detail-item">
                        <strong>Pasajes:</strong>{' '}
                        {beca.cobertura?.pasajes ? 'Sí' : 'No'}
                    </div>
                    <div className="detail-item">
                        <strong>Seguro médico:</strong>{' '}
                        {beca.cobertura?.seguroMedico ? 'Sí' : 'No'}
                    </div>
                    <div className="detail-item">
                        <strong>Alojamiento:</strong>{' '}
                        {beca.cobertura?.alojamiento ? 'Sí' : 'No'}
                    </div>
                    <div className="detail-item">
                        <strong>Monto mensual:</strong>{' '}
                        {beca.cobertura?.montoMensualMin ||
                        beca.cobertura?.montoMensualMax
                            ? `${beca.cobertura.montoMensualMin || 0} - ${beca.cobertura.montoMensualMax || 0}`
                            : 'No especificado'}
                    </div>
                </div>
            </div>

            {/* Información Adicional */}
            <div className="details-section mt-4">
                <h5 className="font-medium mb-2">Información Adicional</h5>
                <div
                    className="details-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '75% 20%',
                        gap: '1rem',
                    }}
                >
                    <div className="detail-item">
                        <strong>Sitio web:</strong>{' '}
                        {beca.informacionAdicional?.sitioWeb ? (
                            <a
                                href={beca.informacionAdicional.sitioWeb}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {beca.informacionAdicional.sitioWeb}
                            </a>
                        ) : (
                            'No especificado'
                        )}
                    </div>
                    <div className="detail-item">
                        <strong>Dificultad:</strong>{' '}
                        {beca.dificultad || 'No especificado'}
                    </div>
                    <div className="detail-item">
                        <strong>Correo de contacto:</strong>{' '}
                        {beca.informacionAdicional?.correoContacto ||
                            'No especificado'}
                    </div>
                    <div className="detail-item">
                        <strong>Beca destacada:</strong>{' '}
                        {beca.destacada ? 'Sí' : 'No'}
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div className="becas-container">
            {isAddingBeca ? (
                <AddBecaForm
                    onAddSuccess={handleAddSuccess}
                    onCancel={() => setIsAddingBeca(false)}
                />
            ) : editingBeca ? (
                <BecaEditForm
                    beca={editingBeca}
                    onEditSuccess={handleEditSuccess}
                    onCancel={() => setEditingBeca(null)}
                />
            ) : (
                <>
                    <div className="filters-container">
                        <select
                            value={selectedTipo}
                            onChange={(e) => setSelectedTipo(e.target.value)}
                            className="filter-select"
                        >
                            <option value="Mostrar Todos">Mostrar Todos</option>
                            <option value="Doctorado">Doctorado</option>
                            <option value="Maestría">Maestría</option>
                            <option value="Grado">Grado</option>
                            <option value="Posgrado">Posgrado</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Buscar becas..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />

                        <AddBecaButton
                            onAddBeca={handleAddBeca}
                            size="medium"
                        />
                    </div>

                    {filteredBecas.length > 0 ? (
                        <Table className="becas-table">
                            <THead>
                                <Th
                                    className="text-center"
                                    style={{ width: '50px' }}
                                >
                                    #
                                </Th>
                                <Th className="text-center">Nombre</Th>
                                <Th className="text-center">Tipo</Th>
                                <Th className="text-center">País</Th>
                                <Th className="text-center">Área</Th>
                                <Th className="text-center">Acciones</Th>
                            </THead>
                            <TBody>
                                {filteredBecas.map((beca, index) => (
                                    <React.Fragment key={beca._id}>
                                        <tr>
                                            <Td className="text-center">
                                                {index + 1}
                                            </Td>
                                            <Td className="text-left">
                                                {beca.nombreBeca}
                                            </Td>
                                            <Td className="text-center">
                                                {beca.tipoBeca}
                                            </Td>
                                            <Td className="text-center">
                                                {beca.paisDestino}
                                            </Td>
                                            <Td className="text-center">
                                                {beca.areaEstudio}
                                            </Td>
                                            <Td className="text-center">
                                                <Button
                                                    size="sm"
                                                    onClick={() =>
                                                        toggleExpandBeca(
                                                            beca._id,
                                                        )
                                                    }
                                                    className="mr-2"
                                                >
                                                    {expandedBeca === beca._id
                                                        ? 'Ocultar'
                                                        : 'Ver más'}
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="solid"
                                                    onClick={() =>
                                                        setEditingBeca(beca)
                                                    }
                                                >
                                                    Editar
                                                </Button>
                                            </Td>
                                        </tr>
                                        {expandedBeca === beca._id && (
                                            <tr className="expanded-row">
                                                <Td colSpan={6}>
                                                    {renderDetails(beca)}
                                                </Td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </TBody>
                        </Table>
                    ) : (
                        <div className="no-results">
                            No se encontraron becas con los filtros
                            seleccionados.
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default BecasList
