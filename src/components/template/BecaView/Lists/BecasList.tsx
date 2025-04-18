import React, { useState, useEffect, useCallback } from 'react'
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
import AddBecaListForm from '../Forms/AddBecaListForm'
import DeleteButton from '../../DeleteButton'
import BecaDetailsButton from '../Buttons/BecaDetailsButton'
import EditButton from '../../EditButton'
import Swal from 'sweetalert2'
import DuplicateBecaButton from '../Buttons/DuplicateBecaButton'

const BecasList: React.FC = () => {
    const { becas, loading, error, fetchBecas, removeBeca, addBeca } =
        useBecas()
    const [expandedBeca, setExpandedBeca] = useState<string | null>(null)
    const [selectedTipo, setSelectedTipo] = useState<string>('Mostrar Todos')
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [editingBeca, setEditingBeca] = useState<Beca | null>(null)
    const [isAddingBeca, setIsAddingBeca] = useState(false)
    const [isAddingBecaList, setIsAddingBecaList] = useState(false)
    const [showAllCountries, setShowAllCountries] = useState<boolean>(false)

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
                    .join(', ')
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())) ||
            (beca.areaEstudio &&
                beca.areaEstudio
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()))

        return matchesType && matchesSearch
    })

    const handleEditSuccess = (updatedBeca: Beca): void => {
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

    const handleDeleteBeca = async (id: string) => {
        try {
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: 'Esta acción eliminará la beca permanentemente y no se podrá recuperar.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
            })

            if (result.isConfirmed) {
                await removeBeca(id)
                Swal.fire({
                    title: 'Eliminado',
                    text: 'La beca ha sido eliminada correctamente.',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                })
            }
        } catch (error) {
            console.error('Error deleting beca:', error)
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al eliminar la beca.',
                icon: 'error',
                confirmButtonColor: '#d33',
            })
        }
    }

    const handleFileUpload = (data: Beca[]) => {
        console.log('Uploaded Becas:', data)
    }

    const handleDuplicateBeca = async (beca: Beca) => {
        try {
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: 'Esta acción duplicará la beca seleccionada.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, duplicar',
                cancelButtonText: 'Cancelar',
            })

            if (result.isConfirmed) {
                const duplicatedBeca = { ...beca, _id: undefined }
                await addBeca(duplicatedBeca)
                Swal.fire({
                    title: 'Duplicado',
                    text: 'La beca ha sido duplicada correctamente.',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                })
                fetchBecas()
            }
        } catch (error) {
            console.error('Error duplicando beca:', error)
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al duplicar la beca.',
                icon: 'error',
                confirmButtonColor: '#d33',
            })
        }
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

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'No especificado'
        const date = new Date(dateString)
        date.setDate(date.getDate() + 1) // Adjusting the date by adding one day
        return date.toLocaleDateString()
    }

    const isBecaExpired = (beca: Beca): boolean => {
        if (!beca.fechaFinAplicacion) return false
        const endDate = new Date(beca.fechaFinAplicacion)
        const today = new Date()
        return endDate < today
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
                        <strong>País destino:</strong>{' '}
                        {beca.paisDestino && beca.paisDestino.length > 0 ? (
                            <>
                                {beca.paisDestino.length > 3
                                    ? `${beca.paisDestino.slice(0, 3).join(', ')}... `
                                    : beca.paisDestino.join(', ')}
                                {beca.paisDestino.length > 3 && (
                                    <button
                                        onClick={() => {
                                            setShowAllCountries((prev) => !prev)
                                        }}
                                        className="text-blue-500"
                                    >
                                        ver más
                                    </button>
                                )}
                                {showAllCountries && (
                                    <div>{beca.paisDestino.join(', ')}</div>
                                )}
                            </>
                        ) : (
                            'No especificado'
                        )}
                    </div>
                    <div className="detail-item">
                        <strong>Región destino:</strong>{' '}
                        {beca.regionDestino && beca.regionDestino.length > 0
                            ? beca.regionDestino.join(', ')
                            : 'No especificado'}
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
                    <div className="detail-item">
                        <strong>Fecha inicio programa:</strong>{' '}
                        {formatDate(beca.fechaInicioPrograma)}
                    </div>
                </div>
            </div>

            <div className="details-section mt-4">
                <h5 className="font-medium mb-2">Paises postulantes</h5>
                <div className="w-full">
                    <div className="detail-item">
                        <strong>Paises Postulantes:</strong>{' '}
                        {beca.paisPostulante && beca.paisPostulante.length > 0
                            ? beca.paisPostulante.join(', ')
                            : 'No especificado'}
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
                <div className="details-grid">
                    {beca.requisitos?.idiomasRequeridos &&
                        beca.requisitos.idiomasRequeridos.length > 0 && (
                            <div className="detail-item">
                                <div>
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
                            </div>
                        )}

                    {beca.requisitos?.examenesRequeridos &&
                        beca.requisitos.examenesRequeridos.length > 0 && (
                            <div className="detail-item">
                                <div>
                                    <strong>Exámenes requeridos:</strong>
                                    <ul className="list-disc pl-5 mt-1">
                                        {beca.requisitos.examenesRequeridos.map(
                                            (examen, idx) => (
                                                <li key={idx}>{examen}</li>
                                            ),
                                        )}
                                    </ul>
                                </div>
                            </div>
                        )}
                </div>
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
            ) : isAddingBecaList ? (
                <AddBecaListForm
                    onAddSuccess={handleAddSuccess}
                    onCancel={() => setIsAddingBecaList(false)}
                    onFileUpload={handleFileUpload}
                />
            ) : (
                <>
                    <div className="flex justify-between align-items-center">
                        <div className="filters-container">
                            <select
                                value={selectedTipo}
                                onChange={(e) =>
                                    setSelectedTipo(e.target.value)
                                }
                                className="filter-select"
                            >
                                <option value="Mostrar Todos">
                                    Mostrar Todos
                                </option>
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
                    </div>

                    {error ? (
                        <div className="error-message mt-4">
                            Error al cargar las becas: {error}
                        </div>
                    ) : filteredBecas.length === 0 ? (
                        <div className="no-results mt-4">
                            No se encontraron becas con los filtros
                            seleccionados.
                        </div>
                    ) : (
                        <Table className="becas-table">
                            <THead>
                                <Th className="text-center">#</Th>
                                <Th className="text-center">Nombre</Th>
                                <Th className="text-center">Tipo</Th>
                                <Th className="text-center">País</Th>
                                <Th className="text-center">Área</Th>
                                <Th
                                    className="text-center"
                                    style={{ whiteSpace: 'nowrap' }}
                                >
                                    Acciones
                                </Th>
                            </THead>
                            <TBody>
                                {filteredBecas.map((beca, index) => (
                                    <React.Fragment key={beca._id}>
                                        <tr
                                            className={
                                                isBecaExpired(beca)
                                                    ? 'expired-beca'
                                                    : ''
                                            }
                                        >
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
                                                {beca.paisDestino.length > 3
                                                    ? `${beca.paisDestino.slice(0, 3).join(', ')}...`
                                                    : beca.paisDestino.join(
                                                          ', ',
                                                      )}
                                            </Td>
                                            <Td className="text-center">
                                                {beca.areaEstudio}
                                            </Td>
                                            <Td
                                                className="text-center"
                                                style={{ whiteSpace: 'nowrap' }}
                                            >
                                                <div className="action-buttons">
                                                    <BecaDetailsButton
                                                        size="medium"
                                                        becaInfo={() =>
                                                            toggleExpandBeca(
                                                                beca._id,
                                                            )
                                                        }
                                                        className="mr-2"
                                                    />
                                                    <EditButton
                                                        size="medium"
                                                        isOpen={() =>
                                                            setEditingBeca(beca)
                                                        }
                                                    />
                                                    <DuplicateBecaButton
                                                        size="medium"
                                                        onDuplicateBeca={() =>
                                                            handleDuplicateBeca(
                                                                beca,
                                                            )
                                                        }
                                                    />
                                                    <DeleteButton
                                                        size="medium"
                                                        onDelete={() =>
                                                            handleDeleteBeca(
                                                                beca._id,
                                                            )
                                                        }
                                                    />
                                                </div>
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
                    )}
                </>
            )}
        </div>
    )
}

export default BecasList
