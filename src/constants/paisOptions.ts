export const regionOptions = [
    { value: 'África', label: 'África' },
    { value: 'América del Norte', label: 'América del Norte' },
    { value: 'América Latina', label: 'América Latina' },
    { value: 'Asia', label: 'Asia' },
    { value: 'Caribe', label: 'Caribe' },
    { value: 'Centroamérica', label: 'Centroamérica' },
    { value: 'Europa', label: 'Europa' },
    { value: 'Oceanía', label: 'Oceanía' },
].sort((a, b) => a.label.localeCompare(b.label))

export const regionCountries = {
    'América Latina': [
        { value: 'Argentina', label: 'Argentina', capital: 'Buenos Aires' },
        { value: 'Bolivia', label: 'Bolivia', capital: 'Sucre' },
        { value: 'Brasil', label: 'Brasil', capital: 'Brasilia' },
        { value: 'Chile', label: 'Chile', capital: 'Santiago' },
        { value: 'Colombia', label: 'Colombia', capital: 'Bogotá' },
        { value: 'Cuba', label: 'Cuba', capital: 'La Habana' },
        {
            value: 'República Dominicana',
            label: 'República Dominicana',
            capital: 'Santo Domingo',
        },
        { value: 'Ecuador', label: 'Ecuador', capital: 'Quito' },
        { value: 'México', label: 'México', capital: 'Ciudad de México' },
        { value: 'Paraguay', label: 'Paraguay', capital: 'Asunción' },
        { value: 'Perú', label: 'Perú', capital: 'Lima' },
        { value: 'Uruguay', label: 'Uruguay', capital: 'Montevideo' },
        { value: 'Venezuela', label: 'Venezuela', capital: 'Caracas' },
    ],
    Centroamérica: [
        { value: 'Costa Rica', label: 'Costa Rica', capital: 'San José' },
        { value: 'El Salvador', label: 'El Salvador', capital: 'San Salvador' },
        {
            value: 'Guatemala',
            label: 'Guatemala',
            capital: 'Ciudad de Guatemala',
        },
        { value: 'Honduras', label: 'Honduras', capital: 'Tegucigalpa' },
        { value: 'Nicaragua', label: 'Nicaragua', capital: 'Managua' },
        { value: 'Panamá', label: 'Panamá', capital: 'Ciudad de Panamá' },
        { value: 'Belice', label: 'Belice', capital: 'Belmopán' },
    ],
    Caribe: [
        {
            value: 'Antigua y Barbuda',
            label: 'Antigua y Barbuda',
            capital: "Saint John's",
        },
        { value: 'Bahamas', label: 'Bahamas', capital: 'Nasáu' },
        { value: 'Barbados', label: 'Barbados', capital: 'Bridgetown' },
        { value: 'Dominica', label: 'Dominica', capital: 'Roseau' },
        { value: 'Granada', label: 'Granada', capital: "Saint George's" },
        { value: 'Haití', label: 'Haití', capital: 'Puerto Príncipe' },
        { value: 'Jamaica', label: 'Jamaica', capital: 'Kingston' },
        {
            value: 'San Cristóbal y Nieves',
            label: 'San Cristóbal y Nieves',
            capital: 'Basseterre',
        },
        { value: 'Santa Lucía', label: 'Santa Lucía', capital: 'Castries' },
        {
            value: 'San Vicente y las Granadinas',
            label: 'San Vicente y las Granadinas',
            capital: 'Kingstown',
        },
        {
            value: 'Trinidad y Tobago',
            label: 'Trinidad y Tobago',
            capital: 'Puerto España',
        },
    ],
    'América del Norte': [
        { value: 'Canadá', label: 'Canadá', capital: 'Ottawa' },
        {
            value: 'Estados Unidos',
            label: 'Estados Unidos',
            capital: 'Washington D.C.',
        },
    ],
    Europa: [
        { value: 'Albania', label: 'Albania', capital: 'Tirana' },
        { value: 'Andorra', label: 'Andorra', capital: 'Andorra la Vieja' },
        { value: 'Armenia', label: 'Armenia', capital: 'Ereván' },
        { value: 'Austria', label: 'Austria', capital: 'Viena' },
        { value: 'Azerbaiyán', label: 'Azerbaiyán', capital: 'Bakú' },
        { value: 'Bielorrusia', label: 'Bielorrusia', capital: 'Minsk' },
        { value: 'Bélgica', label: 'Bélgica', capital: 'Bruselas' },
        {
            value: 'Bosnia y Herzegovina',
            label: 'Bosnia y Herzegovina',
            capital: 'Sarajevo',
        },
        { value: 'Bulgaria', label: 'Bulgaria', capital: 'Sofía' },
        { value: 'Croacia', label: 'Croacia', capital: 'Zagreb' },
        { value: 'Chipre', label: 'Chipre', capital: 'Nicosia' },
        {
            value: 'República Checa',
            label: 'República Checa',
            capital: 'Praga',
        },
        { value: 'Dinamarca', label: 'Dinamarca', capital: 'Copenhague' },
        { value: 'Estonia', label: 'Estonia', capital: 'Tallin' },
        { value: 'Finlandia', label: 'Finlandia', capital: 'Helsinki' },
        { value: 'Francia', label: 'Francia', capital: 'París' },
        { value: 'Georgia', label: 'Georgia', capital: 'Tiflis' },
        { value: 'Alemania', label: 'Alemania', capital: 'Berlín' },
        { value: 'Grecia', label: 'Grecia', capital: 'Atenas' },
        { value: 'Hungría', label: 'Hungría', capital: 'Budapest' },
        { value: 'Islandia', label: 'Islandia', capital: 'Reikiavik' },
        { value: 'Irlanda', label: 'Irlanda', capital: 'Dublín' },
        { value: 'Italia', label: 'Italia', capital: 'Roma' },
        { value: 'Kazajistán', label: 'Kazajistán', capital: 'Nursultán' },
        { value: 'Kosovo', label: 'Kosovo', capital: 'Pristina' },
        { value: 'Letonia', label: 'Letonia', capital: 'Riga' },
        { value: 'Liechtenstein', label: 'Liechtenstein', capital: 'Vaduz' },
        { value: 'Lituania', label: 'Lituania', capital: 'Vilna' },
        { value: 'Luxemburgo', label: 'Luxemburgo', capital: 'Luxemburgo' },
        { value: 'Malta', label: 'Malta', capital: 'La Valeta' },
        { value: 'Moldavia', label: 'Moldavia', capital: 'Chisináu' },
        { value: 'Mónaco', label: 'Mónaco', capital: 'Mónaco' },
        { value: 'Montenegro', label: 'Montenegro', capital: 'Podgorica' },
        { value: 'Países Bajos', label: 'Países Bajos', capital: 'Ámsterdam' },
        {
            value: 'Macedonia del Norte',
            label: 'Macedonia del Norte',
            capital: 'Skopie',
        },
        { value: 'Noruega', label: 'Noruega', capital: 'Oslo' },
        { value: 'Polonia', label: 'Polonia', capital: 'Varsovia' },
        { value: 'Portugal', label: 'Portugal', capital: 'Lisboa' },
        { value: 'Rumania', label: 'Rumania', capital: 'Bucarest' },
        { value: 'Rusia', label: 'Rusia', capital: 'Moscú' },
        { value: 'San Marino', label: 'San Marino', capital: 'San Marino' },
        { value: 'Serbia', label: 'Serbia', capital: 'Belgrado' },
        { value: 'Eslovaquia', label: 'Eslovaquia', capital: 'Bratislava' },
        { value: 'Eslovenia', label: 'Eslovenia', capital: 'Liubliana' },
        { value: 'España', label: 'España', capital: 'Madrid' },
        { value: 'Suecia', label: 'Suecia', capital: 'Estocolmo' },
        { value: 'Suiza', label: 'Suiza', capital: 'Berna' },
        { value: 'Turquía', label: 'Turquía', capital: 'Ankara' },
        { value: 'Ucrania', label: 'Ucrania', capital: 'Kiev' },
        { value: 'Reino Unido', label: 'Reino Unido', capital: 'Londres' },
        {
            value: 'Ciudad del Vaticano',
            label: 'Ciudad del Vaticano',
            capital: 'Ciudad del Vaticano',
        },
    ],
    Asia: [
        { value: 'Afganistán', label: 'Afganistán', capital: 'Kabul' },
        { value: 'Arabia Saudita', label: 'Arabia Saudita', capital: 'Riad' },
        { value: 'Armenia', label: 'Armenia', capital: 'Ereván' },
        { value: 'Azerbaiyán', label: 'Azerbaiyán', capital: 'Bakú' },
        { value: 'Bahrein', label: 'Bahrein', capital: 'Manama' },
        { value: 'Bangladés', label: 'Bangladés', capital: 'Daca' },
        { value: 'Birmania', label: 'Birmania (Myanmar)', capital: 'Naipyidó' },
        { value: 'Brunei', label: 'Brunei', capital: 'Bandar Seri Begawan' },
        { value: 'Camboya', label: 'Camboya', capital: 'Nom Pen' },
        { value: 'China', label: 'China', capital: 'Pekín' },
        { value: 'Chipre', label: 'Chipre', capital: 'Nicosia' },
        {
            value: 'Corea del Norte',
            label: 'Corea del Norte',
            capital: 'Pionyang',
        },
        { value: 'Corea del Sur', label: 'Corea del Sur', capital: 'Seúl' },
        {
            value: 'Emiratos Árabes Unidos',
            label: 'Emiratos Árabes Unidos',
            capital: 'Abu Dabi',
        },
        { value: 'Filipinas', label: 'Filipinas', capital: 'Manila' },
        { value: 'Georgia', label: 'Georgia', capital: 'Tiflis' },
        { value: 'India', label: 'India', capital: 'Nueva Delhi' },
        { value: 'Indonesia', label: 'Indonesia', capital: 'Yakarta' },
        { value: 'Irán', label: 'Irán', capital: 'Teherán' },
        { value: 'Irak', label: 'Irak', capital: 'Bagdad' },
        { value: 'Israel', label: 'Israel', capital: 'Jerusalén' },
        { value: 'Japón', label: 'Japón', capital: 'Tokio' },
        { value: 'Jordania', label: 'Jordania', capital: 'Amán' },
        { value: 'Kazajistán', label: 'Kazajistán', capital: 'Nursultán' },
        { value: 'Kirguistán', label: 'Kirguistán', capital: 'Biskek' },
        { value: 'Kuwait', label: 'Kuwait', capital: 'Ciudad de Kuwait' },
        { value: 'Laos', label: 'Laos', capital: 'Vientián' },
        { value: 'Líbano', label: 'Líbano', capital: 'Beirut' },
        { value: 'Malasia', label: 'Malasia', capital: 'Kuala Lumpur' },
        { value: 'Maldivas', label: 'Maldivas', capital: 'Malé' },
        { value: 'Mongolia', label: 'Mongolia', capital: 'Ulán Bator' },
        { value: 'Nepal', label: 'Nepal', capital: 'Katmandú' },
        { value: 'Omán', label: 'Omán', capital: 'Mascate' },
        { value: 'Pakistán', label: 'Pakistán', capital: 'Islamabad' },
        { value: 'Qatar', label: 'Qatar', capital: 'Doha' },
        { value: 'Singapur', label: 'Singapur', capital: 'Singapur' },
        { value: 'Siria', label: 'Siria', capital: 'Damasco' },
        { value: 'Tailandia', label: 'Tailandia', capital: 'Bangkok' },
        { value: 'Tayikistán', label: 'Tayikistán', capital: 'Dusambé' },
        { value: 'Turkmenistán', label: 'Turkmenistán', capital: 'Asjabad' },
        { value: 'Uzbekistán', label: 'Uzbekistán', capital: 'Taskent' },
        { value: 'Vietnam', label: 'Vietnam', capital: 'Hanói' },
        { value: 'Yemen', label: 'Yemen', capital: 'Saná' },
    ],
    Oceanía: [
        { value: 'Australia', label: 'Australia', capital: 'Canberra' },
        {
            value: 'Nueva Zelanda',
            label: 'Nueva Zelanda',
            capital: 'Wellington',
        },
        { value: 'Fiyi', label: 'Fiyi', capital: 'Suva' },
        {
            value: 'Papúa Nueva Guinea',
            label: 'Papúa Nueva Guinea',
            capital: 'Puerto Moresby',
        },
        { value: 'Samoa', label: 'Samoa', capital: 'Apia' },
        { value: 'Islas Salomón', label: 'Islas Salomón', capital: 'Honiara' },
        { value: 'Vanuatu', label: 'Vanuatu', capital: 'Port Vila' },
        { value: 'Micronesia', label: 'Micronesia', capital: 'Palikir' },
        { value: 'Tonga', label: 'Tonga', capital: 'Nukualofa' },
        { value: 'Kiribati', label: 'Kiribati', capital: 'Tarawa Sur' },
        { value: 'Tuvalu', label: 'Tuvalu', capital: 'Funafuti' },
        { value: 'Nauru', label: 'Nauru', capital: 'Yaren' },
        { value: 'Palau', label: 'Palau', capital: 'Ngerulmud' },
        {
            value: 'Estados Federados de Micronesia',
            label: 'Estados Federados de Micronesia',
            capital: 'Palikir',
        },
    ],
    África: [
        { value: 'Argelia', label: 'Argelia', capital: 'Argel' },
        { value: 'Angola', label: 'Angola', capital: 'Luanda' },
        { value: 'Benín', label: 'Benín', capital: 'Porto Novo' },
        { value: 'Botsuana', label: 'Botsuana', capital: 'Gaborone' },
        { value: 'Burkina Faso', label: 'Burkina Faso', capital: 'Uagadugú' },
        { value: 'Burundi', label: 'Burundi', capital: 'Buyumbura' },
        { value: 'Cabo Verde', label: 'Cabo Verde', capital: 'Praia' },
        { value: 'Camerún', label: 'Camerún', capital: 'Yaundé' },
        {
            value: 'República Centroafricana',
            label: 'República Centroafricana',
            capital: 'Bangui',
        },
        { value: 'Chad', label: 'Chad', capital: 'Yamena' },
        { value: 'Comoras', label: 'Comoras', capital: 'Moroni' },
        {
            value: 'República del Congo',
            label: 'República del Congo',
            capital: 'Brazzaville',
        },
        {
            value: 'República Democrática del Congo',
            label: 'República Democrática del Congo',
            capital: 'Kinsasa',
        },
        {
            value: 'Costa de Marfil',
            label: 'Costa de Marfil',
            capital: 'Yamusukro',
        },
        { value: 'Djibouti', label: 'Djibouti', capital: 'Yibuti' },
        { value: 'Egipto', label: 'Egipto', capital: 'El Cairo' },
        {
            value: 'Guinea Ecuatorial',
            label: 'Guinea Ecuatorial',
            capital: 'Malabo',
        },
        { value: 'Eritrea', label: 'Eritrea', capital: 'Asmara' },
        { value: 'Eswatini', label: 'Eswatini', capital: 'Mbabane' },
        { value: 'Etiopía', label: 'Etiopía', capital: 'Adís Abeba' },
        { value: 'Gabón', label: 'Gabón', capital: 'Libreville' },
        { value: 'Gambia', label: 'Gambia', capital: 'Banjul' },
        { value: 'Ghana', label: 'Ghana', capital: 'Acra' },
        { value: 'Guinea', label: 'Guinea', capital: 'Conakri' },
        { value: 'Kenia', label: 'Kenia', capital: 'Nairobi' },
        { value: 'Lesoto', label: 'Lesoto', capital: 'Maseru' },
        { value: 'Liberia', label: 'Liberia', capital: 'Monrovia' },
        { value: 'Libia', label: 'Libia', capital: 'Trípoli' },
        { value: 'Madagascar', label: 'Madagascar', capital: 'Antananarivo' },
        { value: 'Malawi', label: 'Malawi', capital: 'Lilongüe' },
        { value: 'Malí', label: 'Malí', capital: 'Bamako' },
        { value: 'Mauritania', label: 'Mauritania', capital: 'Nuakchot' },
        { value: 'Mauricio', label: 'Mauricio', capital: 'Port Louis' },
        { value: 'Marruecos', label: 'Marruecos', capital: 'Rabat' },
        { value: 'Mozambique', label: 'Mozambique', capital: 'Maputo' },
        { value: 'Namibia', label: 'Namibia', capital: 'Windhoek' },
        { value: 'Níger', label: 'Níger', capital: 'Niamey' },
        { value: 'Nigeria', label: 'Nigeria', capital: 'Abuya' },
        { value: 'Ruanda', label: 'Ruanda', capital: 'Kigali' },
        {
            value: 'Santo Tomé y Príncipe',
            label: 'Santo Tomé y Príncipe',
            capital: 'Santo Tomé',
        },
        { value: 'Senegal', label: 'Senegal', capital: 'Dakar' },
        { value: 'Seychelles', label: 'Seychelles', capital: 'Victoria' },
        { value: 'Sierra Leona', label: 'Sierra Leona', capital: 'Freetown' },
        { value: 'Somalia', label: 'Somalia', capital: 'Mogadiscio' },
        { value: 'Sudáfrica', label: 'Sudáfrica', capital: 'Pretoria' },
        { value: 'Sudán', label: 'Sudán', capital: 'Jartum' },
        { value: 'Tanzania', label: 'Tanzania', capital: 'Dodoma' },
        { value: 'Togo', label: 'Togo', capital: 'Lomé' },
        { value: 'Túnez', label: 'Túnez', capital: 'Túnez' },
        { value: 'Uganda', label: 'Uganda', capital: 'Kampala' },
        { value: 'Zambia', label: 'Zambia', capital: 'Lusaka' },
        { value: 'Zimbabue', label: 'Zimbabue', capital: 'Harare' },
    ],
}

export const countryOptions = Object.values(regionCountries)
    .flat()
    .sort((a, b) =>
        a.label.localeCompare(b.label, 'es', { sensitivity: 'base' }),
    )

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

export const rankingOptions = [
    {
        value: 'QS World University Rankings',
        label: 'QS World University Rankings',
    },
    {
        value: 'Times Higher Education World University Rankings',
        label: 'Times Higher Education World University Rankings',
    },
]
