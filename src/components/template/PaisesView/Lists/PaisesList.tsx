import React, { useState, useEffect } from 'react'
import { Table, Button } from '@/components/ui'
import THead from '@/components/ui/Table/THead'
import Th from '@/components/ui/Table/Th'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import { usePaises } from '@/utils/hooks/usePaises'
import { Skeleton } from '@/components/ui'
import { Pais } from '@/@types/pais'
import DeleteButton from '../../DeleteButton'
import EditButton from '../../EditButton'
import Swal from 'sweetalert2'
import AddPaisButton from '../Buttons/AddPaisButton'
import PaisDetailsButton from '../Buttons/PaisDetailsButton'
import AddPaisForm from '../Forms/AddPaisForm'
import EditPaisForm from '../Forms/editPaisForm'

const PaisesList: React.FC = () => {
    const { paises, loading, error, fetchPaises, removePais } = usePaises()
    const [expandedPais, setExpandedPais] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [editingPais, setEditingPais] = useState<Pais | null>(null)
    const [isAddingPais, setIsAddingPais] = useState(false)

    useEffect(() => {
        fetchPaises()
    }, [fetchPaises])

    const toggleExpandPais = (id: string) => {
        setExpandedPais(expandedPais === id ? null : id)
    }

    const filteredPaises = paises.filter((pais) => {
        const matchesSearch =
            !searchTerm ||
            pais.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (pais.ficha_general_pais.region &&
                pais.ficha_general_pais.region
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())) ||
            (pais.ficha_general_pais.capital &&
                pais.ficha_general_pais.capital
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()))

        return matchesSearch
    })

    const handleEditSuccess = (updatedPais: Pais): void => {
        setEditingPais(null)
        fetchPaises()
    }

    const handleAddPais = () => {
        setIsAddingPais(true)
    }

    const handleAddSuccess = (newPais: Pais) => {
        setIsAddingPais(false)
        fetchPaises()
    }

    const handleDeletePais = async (id: string) => {
        try {
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: 'Esta acción eliminará el país permanentemente y no se podrá recuperar.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
            })

            if (result.isConfirmed) {
                await removePais(id)
                Swal.fire({
                    title: 'Eliminado',
                    text: 'El país ha sido eliminado correctamente.',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                })
            }
        } catch (error) {
            console.error('Error deleting pais:', error)
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al eliminar el país.',
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

    const renderDetails = (pais: Pais) => (
        <div className="pais-details">
            <h4 className="pb-2">Detalles completos del país</h4>

            {/* Información Básica */}
            <div className="details-section">
                <h5 className="font-medium mb-2">Información Básica</h5>
                <div className="details-grid">
                    <div className="detail-item">
                        <strong>Nombre:</strong> {pais.nombre}
                    </div>
                    <div className="detail-item">
                        <strong>Capital:</strong>{' '}
                        {pais.ficha_general_pais.capital}
                    </div>
                    <div className="detail-item">
                        <strong>Región:</strong>{' '}
                        {pais.ficha_general_pais.region || 'No especificado'}
                    </div>
                    <div className="detail-item">
                        <strong>Población:</strong>{' '}
                        {pais.ficha_general_pais.poblacion_total ||
                            'No especificado'}
                    </div>
                    <div className="detail-item">
                        <strong>Idiomas oficiales:</strong>{' '}
                        {pais.ficha_general_pais.idiomas_oficiales?.join(
                            ', ',
                        ) || 'No especificado'}
                    </div>
                </div>
            </div>

            {/* Costo de Vida */}
            {pais.costo_vida_mensual_usd && (
                <div className="details-section mt-4">
                    <h5 className="font-medium mb-2">Costo de Vida</h5>
                    <div className="details-grid">
                        <div className="detail-item">
                            <strong>Moneda:</strong>{' '}
                            {pais.costo_vida_mensual_usd.moneda ||
                                'No especificado'}
                        </div>
                        <div className="detail-item">
                            <strong>Tipo de cambio USD:</strong>{' '}
                            {pais.costo_vida_mensual_usd.tipo_cambio_usd ||
                                'No especificado'}
                        </div>
                        <div className="detail-item">
                            <strong>Residencia universitaria (USD):</strong>{' '}
                            {pais.costo_vida_mensual_usd
                                .residencia_universitaria_usd
                                ? `${pais.costo_vida_mensual_usd.residencia_universitaria_usd.min || '?'} - ${pais.costo_vida_mensual_usd.residencia_universitaria_usd.max || '?'}`
                                : 'No especificado'}
                        </div>
                        <div className="detail-item">
                            <strong>Supermercado mensual (USD):</strong>{' '}
                            {pais.costo_vida_mensual_usd
                                .supermercado_mensual_usd || 'No especificado'}
                        </div>
                        <div className="detail-item">
                            <strong>Transporte público (USD):</strong>{' '}
                            {pais.costo_vida_mensual_usd
                                .transporte_publico_usd || 'No especificado'}
                        </div>
                        <div className="detail-item">
                            <strong>Seguro médico obligatorio:</strong>{' '}
                            {pais.costo_vida_mensual_usd
                                .seguro_medico_obligatorio || 'No especificado'}
                        </div>
                    </div>
                </div>
            )}

            {/* Sistema de Educación */}
            {pais.sistema_educacion && (
                <div className="details-section mt-4">
                    <h5 className="font-medium mb-2">Sistema de Educación</h5>
                    <div className="details-grid">
                        <div className="detail-item">
                            <strong>Descripción general:</strong>{' '}
                            {pais.sistema_educacion.descripcion_general ||
                                'No especificado'}
                        </div>
                        <div className="detail-item">
                            <strong>Idiomas de instrucción:</strong>{' '}
                            {pais.sistema_educacion.idiomas_instruccion?.join(
                                ', ',
                            ) || 'No especificado'}
                        </div>
                        <div className="detail-item">
                            <strong>Calendario académico:</strong>{' '}
                            {pais.sistema_educacion.calendario_academico ||
                                'No especificado'}
                        </div>
                    </div>
                </div>
            )}

            {/* Universidades */}
            {pais.universidades_mejor_rankeadas &&
                pais.universidades_mejor_rankeadas.length > 0 && (
                    <div className="details-section mt-4">
                        <h5 className="font-medium mb-2">
                            Universidades Mejor Rankeadas
                        </h5>
                        <ul className="list-disc pl-5">
                            {pais.universidades_mejor_rankeadas.map(
                                (universidad, index) => (
                                    <li key={index}>{universidad}</li>
                                ),
                            )}
                        </ul>
                    </div>
                )}

            {/* Comunidad Estudiantil */}
            {pais.comunidad_estudiantil_internacional && (
                <div className="details-section mt-4">
                    <h5 className="font-medium mb-2">
                        Comunidad Estudiantil Internacional
                    </h5>
                    <div className="detail-item">
                        <strong>
                            Porcentaje de estudiantes internacionales:
                        </strong>{' '}
                        {pais.comunidad_estudiantil_internacional
                            .porcentaje_estudiantes_internacionales ||
                            'No especificado'}
                        %
                    </div>
                </div>
            )}

            {/* Visa y Requisitos Migratorios */}
            {pais.visa_y_requisitos_migratorios && (
                <div className="details-section mt-4">
                    <h5 className="font-medium mb-2">
                        Visa y Requisitos Migratorios
                    </h5>
                    <div className="details-grid">
                        <div className="detail-item">
                            <strong>Tipo de visa estudiante:</strong>{' '}
                            {pais.visa_y_requisitos_migratorios
                                .tipo_visa_estudiante || 'No especificado'}
                        </div>
                        <div className="detail-item">
                            <strong>Trabajo con visa estudiante:</strong>{' '}
                            {pais.visa_y_requisitos_migratorios
                                .trabajo_con_visa_estudiante ||
                                'No especificado'}
                        </div>
                        {pais.visa_y_requisitos_migratorios
                            .documentacion_necesaria && (
                            <div className="detail-item">
                                <strong>Documentación necesaria:</strong>
                                <ul className="list-disc pl-5">
                                    {pais.visa_y_requisitos_migratorios.documentacion_necesaria.map(
                                        (doc, index) => (
                                            <li key={index}>{doc}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Clima y Estilo de Vida */}
            {pais.clima_y_estilo_vida && (
                <div className="details-section mt-4">
                    <h5 className="font-medium mb-2">Clima y Estilo de Vida</h5>
                    <div className="details-grid">
                        <div className="detail-item">
                            <strong>Clima promedio:</strong>{' '}
                            {pais.clima_y_estilo_vida.clima_promedio_ciudades ||
                                'No especificado'}
                        </div>
                        <div className="detail-item">
                            <strong>Nivel de seguridad:</strong>{' '}
                            {pais.clima_y_estilo_vida.nivel_seguridad ||
                                'No especificado'}
                        </div>
                        <div className="detail-item">
                            <strong>Oferta cultural y recreativa:</strong>{' '}
                            {pais.clima_y_estilo_vida
                                .oferta_cultural_recreativa ||
                                'No especificado'}
                        </div>
                        <div className="detail-item">
                            <strong>Enchufes y voltaje:</strong>{' '}
                            {pais.clima_y_estilo_vida.enchufes_y_voltaje ||
                                'No especificado'}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )

    return (
        <div className="paises-container">
            {isAddingPais ? (
                <AddPaisForm
                    onAddSuccess={handleAddSuccess}
                    onCancel={() => setIsAddingPais(false)}
                />
            ) : editingPais ? (
                <EditPaisForm
                    pais={editingPais}
                    onEditSuccess={handleEditSuccess}
                    onCancel={() => setEditingPais(null)}
                />
            ) : (
                <>
                    <div className="flex justify-between align-items-center">
                        <div className="filters-container">
                            <input
                                type="text"
                                placeholder="Buscar países..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                            <AddPaisButton
                                onAddPais={handleAddPais}
                                size="medium"
                            />
                        </div>
                    </div>

                    {error ? (
                        <div className="error-message mt-4">
                            Error al cargar los países: {error}
                        </div>
                    ) : filteredPaises.length === 0 ? (
                        <div className="no-results mt-4">
                            No se encontraron países con los filtros
                            seleccionados.
                        </div>
                    ) : (
                        <Table className="paises-table">
                            <THead>
                                <Th className="text-center">Nombre</Th>
                                <Th className="text-center">Capital</Th>
                                <Th className="text-center">Región</Th>
                                <Th className="text-center">Idiomas</Th>
                                <Th className="text-center">Acciones</Th>
                            </THead>
                            <TBody>
                                {filteredPaises.map((pais, index) => (
                                    <React.Fragment key={pais._id}>
                                        <tr>
                                            <Td className="text-center">
                                                {pais.nombre}
                                            </Td>
                                            <Td className="text-center">
                                                {
                                                    pais.ficha_general_pais
                                                        .capital
                                                }
                                            </Td>
                                            <Td className="text-center">
                                                {pais.ficha_general_pais
                                                    .region || '-'}
                                            </Td>
                                            <Td className="text-center">
                                                {pais.ficha_general_pais.idiomas_oficiales?.join(
                                                    ', ',
                                                ) || '-'}
                                            </Td>
                                            <Td className="text-center">
                                                <div className="action-buttons">
                                                    <PaisDetailsButton
                                                        size="medium"
                                                        paisInfo={() =>
                                                            toggleExpandPais(
                                                                pais._id,
                                                            )
                                                        }
                                                        className="mr-2"
                                                    />
                                                    <EditButton
                                                        size="medium"
                                                        isOpen={() =>
                                                            setEditingPais(pais)
                                                        }
                                                    />
                                                    <DeleteButton
                                                        size="medium"
                                                        onDelete={() =>
                                                            handleDeletePais(
                                                                pais._id,
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </Td>
                                        </tr>
                                        {expandedPais === pais._id && (
                                            <tr className="expanded-row">
                                                <Td colSpan={6}>
                                                    {renderDetails(pais)}
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

export default PaisesList
