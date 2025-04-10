export const tipoBecaOptions = [
    { value: 'Doctorado', label: 'Doctorado' },
    { value: 'Maestría', label: 'Maestría' },
    { value: 'Grado', label: 'Grado' },
    { value: 'Posgrado', label: 'Posgrado' },
    { value: 'Fondos para investigación', label: 'Fondos para investigación' },
    { value: 'Estancia de investigación', label: 'Estancia de investigación' },
    { value: 'Posdoctorado', label: 'Posdoctorado' },
]

export const nivelAcademicoOptions = [
    { value: 'Doctorado', label: 'Doctorado' },
    { value: 'Maestría', label: 'Maestría' },
    { value: 'Grado', label: 'Grado' },
    { value: 'Posgrado', label: 'Posgrado' },
    { value: 'Posdoctorado', label: 'Posdoctorado' },
]

export const regionOptions = [
    { value: 'África', label: 'África' },
    { value: 'América del Norte', label: 'América del Norte' },
    { value: 'América Latina', label: 'América Latina' },
    { value: 'Asia', label: 'Asia' },
    { value: 'Centroamérica', label: 'Centroamérica' },
    { value: 'Europa', label: 'Europa' },
    { value: 'Oceanía', label: 'Oceanía' },
].sort((a, b) => a.label.localeCompare(b.label))

export const countryOptions = [
    // América Latina
    { value: 'Argentina', label: 'Argentina' },
    { value: 'Bolivia', label: 'Bolivia' },
    { value: 'Brasil', label: 'Brasil' },
    { value: 'Chile', label: 'Chile' },
    { value: 'Colombia', label: 'Colombia' },
    { value: 'Cuba', label: 'Cuba' },
    { value: 'República Dominicana', label: 'República Dominicana' },
    { value: 'Ecuador', label: 'Ecuador' },
    { value: 'México', label: 'México' },
    { value: 'Paraguay', label: 'Paraguay' },
    { value: 'Perú', label: 'Perú' },
    { value: 'Uruguay', label: 'Uruguay' },
    { value: 'Venezuela', label: 'Venezuela' },
    // Centroamérica
    { value: 'Costa Rica', label: 'Costa Rica' },
    { value: 'El Salvador', label: 'El Salvador' },
    { value: 'Guatemala', label: 'Guatemala' },
    { value: 'Honduras', label: 'Honduras' },
    { value: 'Nicaragua', label: 'Nicaragua' },
    { value: 'Panamá', label: 'Panamá' },
    { value: 'Belice', label: 'Belice' },
    // América del Norte
    { value: 'Canadá', label: 'Canadá' },
    { value: 'Estados Unidos', label: 'Estados Unidos' },
    // Europa
    { value: 'Albania', label: 'Albania' },
    { value: 'Andorra', label: 'Andorra' },
    { value: 'Armenia', label: 'Armenia' },
    { value: 'Austria', label: 'Austria' },
    { value: 'Azerbaiyán', label: 'Azerbaiyán' },
    { value: 'Bielorrusia', label: 'Bielorrusia' },
    { value: 'Bélgica', label: 'Bélgica' },
    { value: 'Bosnia y Herzegovina', label: 'Bosnia y Herzegovina' },
    { value: 'Bulgaria', label: 'Bulgaria' },
    { value: 'Croacia', label: 'Croacia' },
    { value: 'Chipre', label: 'Chipre' },
    { value: 'República Checa', label: 'República Checa' },
    { value: 'Dinamarca', label: 'Dinamarca' },
    { value: 'Estonia', label: 'Estonia' },
    { value: 'Finlandia', label: 'Finlandia' },
    { value: 'Francia', label: 'Francia' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Alemania', label: 'Alemania' },
    { value: 'Grecia', label: 'Grecia' },
    { value: 'Hungría', label: 'Hungría' },
    { value: 'Islandia', label: 'Islandia' },
    { value: 'Irlanda', label: 'Irlanda' },
    { value: 'Italia', label: 'Italia' },
    { value: 'Kazajistán', label: 'Kazajistán' },
    { value: 'Kosovo', label: 'Kosovo' },
    { value: 'Letonia', label: 'Letonia' },
    { value: 'Liechtenstein', label: 'Liechtenstein' },
    { value: 'Lituania', label: 'Lituania' },
    { value: 'Luxemburgo', label: 'Luxemburgo' },
    { value: 'Malta', label: 'Malta' },
    { value: 'Moldavia', label: 'Moldavia' },
    { value: 'Mónaco', label: 'Mónaco' },
    { value: 'Montenegro', label: 'Montenegro' },
    { value: 'Países Bajos', label: 'Países Bajos' },
    { value: 'Macedonia del Norte', label: 'Macedonia del Norte' },
    { value: 'Noruega', label: 'Noruega' },
    { value: 'Polonia', label: 'Polonia' },
    { value: 'Portugal', label: 'Portugal' },
    { value: 'Rumania', label: 'Rumania' },
    { value: 'Rusia', label: 'Rusia' },
    { value: 'San Marino', label: 'San Marino' },
    { value: 'Serbia', label: 'Serbia' },
    { value: 'Eslovaquia', label: 'Eslovaquia' },
    { value: 'Eslovenia', label: 'Eslovenia' },
    { value: 'España', label: 'España' },
    { value: 'Suecia', label: 'Suecia' },
    { value: 'Suiza', label: 'Suiza' },
    { value: 'Turquía', label: 'Turquía' },
    { value: 'Ucrania', label: 'Ucrania' },
    { value: 'Reino Unido', label: 'Reino Unido' },
    { value: 'Ciudad del Vaticano', label: 'Ciudad del Vaticano' },
    // Asia
    { value: 'Afganistán', label: 'Afganistán' },
    { value: 'Arabia Saudita', label: 'Arabia Saudita' },
    { value: 'Armenia', label: 'Armenia' },
    { value: 'Azerbaiyán', label: 'Azerbaiyán' },
    { value: 'Bahrein', label: 'Bahrein' },
    { value: 'Bangladés', label: 'Bangladés' },
    { value: 'Birmania', label: 'Birmania (Myanmar)' },
    { value: 'Brunei', label: 'Brunei' },
    { value: 'Camboya', label: 'Camboya' },
    { value: 'China', label: 'China' },
    { value: 'Chipre', label: 'Chipre' },
    { value: 'Corea del Norte', label: 'Corea del Norte' },
    { value: 'Corea del Sur', label: 'Corea del Sur' },
    { value: 'Emiratos Árabes Unidos', label: 'Emiratos Árabes Unidos' },
    { value: 'Filipinas', label: 'Filipinas' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'India', label: 'India' },
    { value: 'Indonesia', label: 'Indonesia' },
    { value: 'Irán', label: 'Irán' },
    { value: 'Irak', label: 'Irak' },
    { value: 'Israel', label: 'Israel' },
    { value: 'Japón', label: 'Japón' },
    { value: 'Jordania', label: 'Jordania' },
    { value: 'Kazajistán', label: 'Kazajistán' },
    { value: 'Kirguistán', label: 'Kirguistán' },
    { value: 'Kuwait', label: 'Kuwait' },
    { value: 'Laos', label: 'Laos' },
    { value: 'Líbano', label: 'Líbano' },
    { value: 'Malasia', label: 'Malasia' },
    { value: 'Maldivas', label: 'Maldivas' },
    { value: 'Mongolia', label: 'Mongolia' },
    { value: 'Nepal', label: 'Nepal' },
    { value: 'Omán', label: 'Omán' },
    { value: 'Pakistán', label: 'Pakistán' },
    { value: 'Qatar', label: 'Qatar' },
    { value: 'Singapur', label: 'Singapur' },
    { value: 'Siria', label: 'Siria' },
    { value: 'Tailandia', label: 'Tailandia' },
    { value: 'Tayikistán', label: 'Tayikistán' },
    { value: 'Turkmenistán', label: 'Turkmenistán' },
    { value: 'Uzbekistán', label: 'Uzbekistán' },
    { value: 'Vietnam', label: 'Vietnam' },
    { value: 'Yemen', label: 'Yemen' },
    // Oceanía
    { value: 'Australia', label: 'Australia' },
    { value: 'Nueva Zelanda', label: 'Nueva Zelanda' },
    { value: 'Fiyi', label: 'Fiyi' },
    { value: 'Papúa Nueva Guinea', label: 'Papúa Nueva Guinea' },
    { value: 'Samoa', label: 'Samoa' },
    { value: 'Islas Salomón', label: 'Islas Salomón' },
    { value: 'Vanuatu', label: 'Vanuatu' },
    { value: 'Micronesia', label: 'Micronesia' },
    { value: 'Tonga', label: 'Tonga' },
    { value: 'Kiribati', label: 'Kiribati' },
    { value: 'Tuvalu', label: 'Tuvalu' },
    { value: 'Nauru', label: 'Nauru' },
    { value: 'Palau', label: 'Palau' },
    {
        value: 'Estados Federados de Micronesia',
        label: 'Estados Federados de Micronesia',
    },
    // África
    { value: 'Argelia', label: 'Argelia' },
    { value: 'Angola', label: 'Angola' },
    { value: 'Benín', label: 'Benín' },
    { value: 'Botsuana', label: 'Botsuana' },
    { value: 'Burkina Faso', label: 'Burkina Faso' },
    { value: 'Burundi', label: 'Burundi' },
    { value: 'Cabo Verde', label: 'Cabo Verde' },
    { value: 'Camerún', label: 'Camerún' },
    { value: 'República Centroafricana', label: 'República Centroafricana' },
    { value: 'Chad', label: 'Chad' },
    { value: 'Comoras', label: 'Comoras' },
    { value: 'República del Congo', label: 'República del Congo' },
    {
        value: 'República Democrática del Congo',
        label: 'República Democrática del Congo',
    },
    { value: 'Costa de Marfil', label: 'Costa de Marfil' },
    { value: 'Djibouti', label: 'Djibouti' },
    { value: 'Egipto', label: 'Egipto' },
    { value: 'Guinea Ecuatorial', label: 'Guinea Ecuatorial' },
    { value: 'Eritrea', label: 'Eritrea' },
    { value: 'Eswatini', label: 'Eswatini' },
    { value: 'Etiopía', label: 'Etiopía' },
    { value: 'Gabón', label: 'Gabón' },
    { value: 'Gambia', label: 'Gambia' },
    { value: 'Ghana', label: 'Ghana' },
    { value: 'Guinea', label: 'Guinea' },
    { value: 'Kenia', label: 'Kenia' },
    { value: 'Lesoto', label: 'Lesoto' },
    { value: 'Liberia', label: 'Liberia' },
    { value: 'Libia', label: 'Libia' },
    { value: 'Madagascar', label: 'Madagascar' },
    { value: 'Malawi', label: 'Malawi' },
    { value: 'Malí', label: 'Malí' },
    { value: 'Mauritania', label: 'Mauritania' },
    { value: 'Mauricio', label: 'Mauricio' },
    { value: 'Marruecos', label: 'Marruecos' },
    { value: 'Mozambique', label: 'Mozambique' },
    { value: 'Namibia', label: 'Namibia' },
    { value: 'Níger', label: 'Níger' },
    { value: 'Nigeria', label: 'Nigeria' },
    { value: 'Ruanda', label: 'Ruanda' },
    { value: 'Santo Tomé y Príncipe', label: 'Santo Tomé y Príncipe' },
    { value: 'Senegal', label: 'Senegal' },
    { value: 'Seychelles', label: 'Seychelles' },
    { value: 'Sierra Leona', label: 'Sierra Leona' },
    { value: 'Somalia', label: 'Somalia' },
    { value: 'Sudáfrica', label: 'Sudáfrica' },
    { value: 'Sudán', label: 'Sudán' },
    { value: 'Tanzania', label: 'Tanzania' },
    { value: 'Togo', label: 'Togo' },
    { value: 'Túnez', label: 'Túnez' },
    { value: 'Uganda', label: 'Uganda' },
    { value: 'Zambia', label: 'Zambia' },
    { value: 'Zimbabue', label: 'Zimbabue' },
].sort((a, b) => a.label.localeCompare(b.label, 'es', { sensitivity: 'base' }))

export const duracionUnidadOptions = [
    { value: 'años', label: 'Años' },
    { value: 'días', label: 'Días' },
    { value: 'meses', label: 'Meses' },
    { value: 'semanas', label: 'Semanas' },
].sort((a, b) => a.label.localeCompare(b.label))

export const idiomaOptions = [
    { value: 'Español', label: 'Español' },
    { value: 'Chino Mandarín', label: 'Chino Mandarín' },
    { value: 'Inglés', label: 'Inglés' },
    { value: 'Hindi', label: 'Hindi' },
    { value: 'Bengalí', label: 'Bengalí' },
    { value: 'Portugués', label: 'Portugués' },
    { value: 'Ruso', label: 'Ruso' },
    { value: 'Japonés', label: 'Japonés' },
    { value: 'Alemán', label: 'Alemán' },
    { value: 'Francés', label: 'Francés' },
    { value: 'Italiano', label: 'Italiano' },
    { value: 'Turco', label: 'Turco' },
    { value: 'Árabe', label: 'Árabe' },
    { value: 'Urdu', label: 'Urdu' },
    { value: 'Panyabí', label: 'Panyabí' },
    { value: 'Neerlandés', label: 'Neerlandés' },
    { value: 'Coreano', label: 'Coreano' },
    { value: 'Vietnamita', label: 'Vietnamita' },
    { value: 'Tamil', label: 'Tamil' },
    { value: 'Persa', label: 'Persa (Farsi)' },
].sort((a, b) => a.label.localeCompare(b.label, 'es'))

export const nivelIdiomaOptions = [
    { value: 'A1', label: 'A1 (Principiante)' },
    { value: 'A2', label: 'A2 (Elemental)' },
    { value: 'B1', label: 'B1 (Intermedio)' },
    { value: 'B2', label: 'B2 (Intermedio Alto)' },
    { value: 'C1', label: 'C1 (Avanzado)' },
    { value: 'C2', label: 'C2 (Casi Nativo)' },
]

export const areaEstudioOptions = [
    // Humanidades
    { value: 'Historia', label: 'Historia' },
    { value: 'Filosofía', label: 'Filosofía' },
    { value: 'Literatura', label: 'Literatura' },
    { value: 'Idiomas', label: 'Idiomas' },
    { value: 'Arte', label: 'Arte' },
    { value: 'Sociología', label: 'Sociología' },
    { value: 'Antropología', label: 'Antropología' },
    { value: 'Educación', label: 'Educación' },
    { value: 'Comunicación', label: 'Comunicación' },
    { value: 'Psicología', label: 'Psicología' },

    // Ciencia y Tecnología
    { value: 'Física', label: 'Física' },
    { value: 'Química', label: 'Química' },
    { value: 'Biología', label: 'Biología' },
    { value: 'Matemáticas', label: 'Matemáticas' },
    { value: 'Informática', label: 'Informática' },
    { value: 'Ingeniería', label: 'Ingeniería' },
    { value: 'Tecnología', label: 'Tecnología' },
    { value: 'Astronomía', label: 'Astronomía' },
    { value: 'Ciencias Ambientales', label: 'Ciencias Ambientales' },

    // Técnicas
    { value: 'Mecánica', label: 'Mecánica' },
    { value: 'Electrónica', label: 'Electrónica' },
    { value: 'Electricidad', label: 'Electricidad' },
    { value: 'Construcción', label: 'Construcción' },
    { value: 'Diseño industrial', label: 'Diseño industrial' },
    { value: 'Automatización', label: 'Automatización' },
    { value: 'Robótica', label: 'Robótica' },

    // Todas las areas
    {
        value: 'Programas abiertos a cualquier área de estudio',
        label: 'Programas abiertos a cualquier área de estudio',
    },
    {
        value: 'Proyectos multidisciplinarios',
        label: 'Proyectos multidisciplinarios',
    },
    {
        value: 'Intercambios o movilidad académica sin restricción disciplinaria',
        label: 'Intercambios o movilidad académica sin restricción disciplinaria',
    },
].sort((a, b) => a.label.localeCompare(b.label, 'es'))
