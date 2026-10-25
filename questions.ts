export interface QuestionOption {
  key: 'A' | 'B' | 'C' | 'D';
  arm: string;
  es: string;
}

export interface QuestionItem {
  id: number;
  titleArm: string;
  titleEs: string;
  questionArm: string;
  questionEs: string;
  options: QuestionOption[];
  correctKey: 'A' | 'B' | 'C' | 'D';
  explanationArm: string;
  explanationEs: string;
  grammarFocus: string;
}

export const MONEY_LADDER = [
  { level: 1, prize: '100', isSafe: false },
  { level: 2, prize: '200', isSafe: false },
  { level: 3, prize: '300', isSafe: false },
  { level: 4, prize: '500', isSafe: false },
  { level: 5, prize: '1.000', isSafe: true },
  { level: 6, prize: '2.000', isSafe: false },
  { level: 7, prize: '4.000', isSafe: false },
  { level: 8, prize: '8.000', isSafe: false },
  { level: 9, prize: '16.000', isSafe: false },
  { level: 10, prize: '32.000', isSafe: true },
  { level: 11, prize: '64.000', isSafe: false },
  { level: 12, prize: '125.000', isSafe: false },
  { level: 13, prize: '250.000', isSafe: false },
  { level: 14, prize: '500.000', isSafe: false },
  { level: 15, prize: '1.000.000', isSafe: true },
];

export const QUESTIONS: QuestionItem[] = [
  {
    id: 1,
    titleEs: 'Una presentación importante',
    titleArm: 'Կարևոր ներկայացում',
    questionEs: 'Tienes que hacer una presentación importante en clase, pero justo cuando vas a empezar, el proyector deja de funcionar. ¿Qué harías?',
    questionArm: 'Դու պետք է կարևոր ներկայացում անես դասարանում, բայց հենց սկսելու պահին պրոյեկտորը չի աշխատում։ Ի՞նչ կանեիր։',
    grammarFocus: 'Intentaría / Continuaría (Condicional Simple)',
    explanationEs: 'La opción más sensata y madura es intentar resolver el fallo o seguir sin tecnología.',
    explanationArm: 'Ամենախելամիտ քայլն է փորձել լուծել խնդիրը կամ շարունակել առանց պրոյեկտորի:',
    correctKey: 'B',
    options: [
      {
        key: 'A',
        arm: 'Ես կհայտարարեի, որ այսօր ներկայացումն անտեսանելի է։',
        es: 'Anunciaría que hoy la presentación es invisible.',
      },
      {
        key: 'B',
        arm: 'Ես կփորձեի լուծել տեխնիկական խնդիրը կամ ներկայացումը կշարունակեի առանց պրոյեկտորի։',
        es: 'Intentaría solucionar el problema técnico o continuaría la presentación sin el proyector.',
      },
      {
        key: 'C',
        arm: 'Ես կասեի, որ պրոյեկտորը չի ցանկանում սովորել։',
        es: 'Diría que el proyector no quiere estudiar.',
      },
      {
        key: 'D',
        arm: 'Ես կխնդրեի բոլորին փակել աչքերը և պատկերացնել իմ սլայդները։',
        es: 'Pediría a todos que cerraran los ojos e imaginaran mis diapositivas.',
      },
    ],
  },
  {
    id: 2,
    titleEs: 'Una excursión inesperada',
    titleArm: 'Անսպասելի էքսկուրսիա',
    questionEs: 'Estás haciendo una excursión por la montaña con tus amigos, pero a mitad del camino descubrís que habéis elegido el sendero equivocado. ¿Qué harías?',
    questionArm: 'Դու ընկերներիդ հետ լեռներում զբոսնում ես, բայց ճանապարհի կեսին հասկանում եք, որ ընտրել եք սխալ արահետը։ Ի՞նչ կանեիր։',
    grammarFocus: 'Consultaría / Evaluaría / Pediría (Condicional Simple)',
    explanationEs: 'La seguridad es lo primero: consultar el mapa y pedir ayuda si es necesario.',
    explanationArm: 'Լեռներում անվտանգությունն առաջնային է՝ ստուգել քարտեզը և անհրաժեշտության դեպքում օգնություն կանչել:',
    correctKey: 'D',
    options: [
      {
        key: 'A',
        arm: 'Ես կառաջարկեի ավելի արագ քայլել, մինչև պատահաբար հասնենք ինչ-որ տեղ։',
        es: 'Propondría caminar más rápido hasta llegar a algún sitio por casualidad.',
      },
      {
        key: 'B',
        arm: 'Ես կասեի, որ լեռն է փոխել իր տեղը։',
        es: 'Diría que la montaña ha cambiado de sitio.',
      },
      {
        key: 'C',
        arm: 'Ես կառաջարկեի կառուցել մեր սեփական ճանապարհը։',
        es: 'Propondría construir nuestro propio camino.',
      },
      {
        key: 'D',
        arm: 'Ես կստուգեի քարտեզը, կգնահատեի իրավիճակը և անհրաժեշտության դեպքում օգնություն կխնդրեի։',
        es: 'Consultaría el mapa, evaluaría la situación y pediría ayuda si fuera necesario.',
      },
    ],
  },
  {
    id: 3,
    titleEs: 'Un turista confundido',
    titleArm: 'Շփոթված զբոսաշրջիկ',
    questionEs: 'Un turista te pregunta en la calle cómo llegar a un museo, pero tú tampoco conoces el camino. ¿Qué harías?',
    questionArm: 'Փողոցում մի զբոսաշրջիկ քեզ հարցնում է, թե ինչպես հասնել թանգարան, բայց դու նույնպես չգիտես ճանապարհը։ Ի՞նչ կանեիր։',
    grammarFocus: 'Explicaría / Ayudaría (Condicional Simple)',
    explanationEs: 'Ser sincero y ayudarlo a buscar la ruta en un mapa es lo más educado.',
    explanationArm: 'Քաղաքավարի է ազնիվ ասել, որ չգիտես, բայց օգնել գտնել քարտեզով:',
    correctKey: 'D',
    options: [
      {
        key: 'A',
        arm: 'Ցույց կտայի պատահական ուղղություն՝ շատ վստահ տեսքով։',
        es: 'Señalaría una dirección al azar con mucha seguridad.',
      },
      {
        key: 'B',
        arm: 'Կասեի, որ թանգարանն ամեն օր փոխում է իր տեղը։',
        es: 'Diría que el museo cambia de sitio todos los días.',
      },
      {
        key: 'C',
        arm: 'Կառաջարկեի հետևել առաջին մարդուն, որը լուսանկարչական ապարատ ունի։',
        es: 'Le propondría seguir a la primera persona que llevara una cámara.',
      },
      {
        key: 'D',
        arm: 'Կբացատրեի, որ չգիտեմ ճանապարհը, բայց կօգնեի գտնել այն քարտեզով։',
        es: 'Le explicaría que no conozco el camino, pero lo ayudaría a buscarlo en un mapa.',
      },
    ],
  },
  {
    id: 4,
    titleEs: 'Un partido bajo la lluvia',
    titleArm: 'Ֆուտբոլային խաղ անձրևի տակ',
    questionEs: 'Estás jugando al fútbol con tus amigos, pero de repente empieza a llover muy fuerte y hay una tormenta eléctrica. ¿Qué harías?',
    questionArm: 'Դու ֆուտբոլ ես խաղում ընկերներիդ հետ, բայց հանկարծ ուժեղ անձրև և ամպրոպ է սկսվում։ Ի՞նչ կանեիր։',
    grammarFocus: 'Interrumpiría / Buscaría (Condicional Simple)',
    explanationEs: 'Las tormentas eléctricas son peligrosas en campo abierto; refugiarse es vital.',
    explanationArm: 'Ամպրոպի ժամանակ բաց դաշտում մնալը վտանգավոր է. անհրաժեշտ է պատսպարվել:',
    correctKey: 'C',
    options: [
      {
        key: 'A',
        arm: 'Ես կասեի, որ անձրևը նույնպես ցանկանում է ֆուտբոլ խաղալ։',
        es: 'Diría que la lluvia también quiere jugar al fútbol.',
      },
      {
        key: 'B',
        arm: 'Ես կառաջարկեի գնդակը փոխարինել անձրևանոցով։',
        es: 'Propondría sustituir el balón por un paraguas.',
      },
      {
        key: 'C',
        arm: 'Ես կդադարեցնեի խաղը և ընկերներիս հետ անվտանգ փակ տարածքում կպատսպարվեի։',
        es: 'Interrumpiría el partido y buscaría refugio con mis amigos en un lugar cerrado y seguro.',
      },
      {
        key: 'D',
        arm: 'Ես կառաջարկեի մրցել, թե ով ամենաշատը կթրջվի։',
        es: 'Propondría competir para ver quién se moja más.',
      },
    ],
  },
  {
    id: 5,
    titleEs: 'Un idioma desconocido',
    titleArm: 'Անծանոթ լեզու',
    questionEs: 'Participas en un evento internacional y una persona te habla en un idioma que no entiendes. ¿Cómo actuarías?',
    questionArm: 'Դու մասնակցում ես միջազգային միջոցառման, և մեկը քեզ հետ խոսում է մի լեզվով, որը չես հասկանում։ Ինչպե՞ս կվարվեիր։',
    grammarFocus: 'Explicaría / Propondría (Condicional Simple)',
    explanationEs: 'Explicar amablemente y buscar un idioma común o un traductor facilita la comunicación.',
    explanationArm: 'Քաղաքավարի բացատրելն ու ընդհանուր լեզու կամ թարգմանիչ գտնելը լավագույն լուծումն է:',
    correctKey: 'B',
    options: [
      {
        key: 'A',
        arm: 'Ես կձևացնեի, թե ամեն ինչ հասկանում եմ, և անընդհատ գլխով կանեի։',
        es: 'Fingiría entenderlo todo y asentiría constantemente.',
      },
      {
        key: 'B',
        arm: 'Ես քաղաքավարի կբացատրեի, որ չեմ հասկանում լեզուն, և կառաջարկեի խոսել ընդհանուր լեզվով կամ օգտվել թարգմանչից։',
        es: 'Explicaría educadamente que no entiendo el idioma y propondría hablar en una lengua común o utilizar un traductor.',
      },
      {
        key: 'C',
        arm: 'Ես ավելի բարձր կսկսեի խոսել հայերեն։',
        es: 'Empezaría a hablar en armenio cada vez más alto.',
      },
      {
        key: 'D',
        arm: 'Ես կպատասխանեի պատահական իսպաներեն բառերով։',
        es: 'Respondería con palabras españolas elegidas al azar.',
      },
    ],
  },
  {
    id: 6,
    titleEs: 'Un asiento ocupado',
    titleArm: 'Զբաղեցված նստատեղ',
    questionEs: 'Vas al cine y descubres que el asiento indicado en tu entrada ya está ocupado. ¿Qué harías?',
    questionArm: 'Դու կինոթատրոն ես գնում և տեսնում ես, որ քո տոմսում նշված նստատեղն արդեն զբաղված է։ Ի՞նչ կանեիր։',
    grammarFocus: 'Mostraría / Pediría (Condicional Simple)',
    explanationEs: 'Mostrar la entrada educadamente aclara la confusión sin generar conflicto.',
    explanationArm: 'Տոմսը քաղաքավարի ցույց տալը լուծում է թյուրիմացությունը:',
    correctKey: 'D',
    options: [
      {
        key: 'A',
        arm: 'Ես կնստեի հատակին և կասեի, որ սա նոր VIP գոտի է։',
        es: 'Me sentaría en el suelo y diría que es una nueva zona VIP.',
      },
      {
        key: 'B',
        arm: 'Ես կսկսեի կանգնած դիտել ֆիլմը՝ առանց որևէ բան ասելու։',
        es: 'Empezaría a ver la película de pie sin decir nada.',
      },
      {
        key: 'C',
        arm: 'Ես կխնդրեի բոլոր հանդիսատեսներին փոխել տեղերը։',
        es: 'Pediría a todos los espectadores que cambiaran de asiento.',
      },
      {
        key: 'D',
        arm: 'Ես քաղաքավարի ցույց կտայի իմ տոմսը և անհրաժեշտության դեպքում կդիմեի աշխատակցին։',
        es: 'Mostraría educadamente mi entrada y, si fuera necesario, pediría ayuda a un empleado.',
      },
    ],
  },
  {
    id: 7,
    titleEs: 'Un invitado vegetariano',
    titleArm: 'Բուսակեր հյուր',
    questionEs: 'Has invitado a tus amigos a cenar, pero a última hora descubres que uno de ellos no come carne. ¿Qué harías?',
    questionArm: 'Դու ընկերներիդ հրավիրել ես ընթրիքի, բայց վերջին պահին պարզվում է, որ նրանցից մեկը միս չի ուտում։ Ի՞նչ կանեիր։',
    grammarFocus: 'Prepararía / Pediría (Condicional Simple)',
    explanationEs: 'Un buen anfitrión siempre procura que todos sus invitados coman a gusto.',
    explanationArm: 'Լավ հյուրընկալը հոգ է տանում, որ յուրաքանչյուր հյուր ունենա հարմար ուտեստ:',
    correctKey: 'B',
    options: [
      {
        key: 'A',
        arm: 'Կասեի, որ կարող է պարզապես միսը չնկատել։',
        es: 'Le diría que simplemente puede hacer como si no viera la carne.',
      },
      {
        key: 'B',
        arm: 'Կպատրաստեի կամ կպատվիրեի նրա սննդակարգին համապատասխան ուտեստ։',
        es: 'Prepararía o pediría un plato adecuado para su alimentación.',
      },
      {
        key: 'C',
        arm: 'Կառաջարկեի ուտել միայն հաց ամբողջ երեկոյի ընթացքում։',
        es: 'Le propondría comer solamente pan durante toda la noche.',
      },
      {
        key: 'D',
        arm: 'Կասեի, որ այսօր բանջարեղենն արձակուրդում է։',
        es: 'Diría que hoy las verduras están de vacaciones.',
      },
    ],
  },
  {
    id: 8,
    titleEs: 'Un objeto prestado',
    titleArm: 'Փոխառված իր',
    questionEs: 'Tu amigo te ha prestado su bicicleta, pero la has dañado accidentalmente mientras la utilizabas. ¿Cómo actuarías?',
    questionArm: 'Ընկերդ քեզ իր հեծանիվն է տվել, բայց այն օգտագործելիս պատահաբար վնասել ես։ Ինչպե՞ս կվարվեիր։',
    grammarFocus: 'Explicaría / Ofrecería (Condicional Simple)',
    explanationEs: 'La honestidad y la responsabilidad fortalecen la amistad.',
    explanationArm: 'Անկեղծությունն ու վնասը վերականգնելու պատրաստակամությունը պահպանում են ընկերությունը:',
    correctKey: 'A',
    options: [
      {
        key: 'A',
        arm: 'Ես անկեղծ կբացատրեի կատարվածը և կառաջարկեի վերանորոգել կամ փոխհատուցել վնասը։',
        es: 'Le explicaría sinceramente lo ocurrido y ofrecería reparar la bicicleta o pagar los daños.',
      },
      {
        key: 'B',
        arm: 'Ես կասեի, որ հեծանիվն ինքն է որոշել փոխել իր տեսքը։',
        es: 'Diría que la bicicleta ha decidido cambiar de aspecto por sí sola.',
      },
      {
        key: 'C',
        arm: 'Ես այն կվերադարձնեի գիշերը, որպեսզի վնասը չնկատի։',
        es: 'La devolvería por la noche para que no notara los daños.',
      },
      {
        key: 'D',
        arm: 'Ես կառաջարկեի այսուհետև միայն քայլել։',
        es: 'Le propondría ir solamente a pie a partir de ahora.',
      },
    ],
  },
  {
    id: 9,
    titleEs: 'Un restaurante lleno',
    titleArm: 'Լեփ-լեցուն ռեստորան',
    questionEs: 'Llegas con tus amigos a un restaurante famoso, pero todas las mesas están ocupadas y hay que esperar una hora. ¿Qué harías?',
    questionArm: 'Դու ընկերներիդ հետ գալիս ես հայտնի ռեստորան, բայց բոլոր սեղանները զբաղված են, իսկ սպասելու ժամանակը մեկ ժամ է։ Ի՞նչ կանեիր։',
    grammarFocus: 'Decidiría (Condicional Simple)',
    explanationEs: 'Hablar con el grupo y consensuar si esperar o buscar alternativa es lo más práctico.',
    explanationArm: 'Ընկերների հետ համատեղ որոշում կայացնելը լավագույն լուծումն է:',
    correctKey: 'B',
    options: [
      {
        key: 'A',
        arm: 'Ես կխնդրեի ռեստորանին նոր սեղան կառուցել հինգ րոպեում։',
        es: 'Le pediría al restaurante que construyera una mesa nueva en cinco minutos.',
      },
      {
        key: 'B',
        arm: 'Ես ընկերներիս հետ կորոշեի՝ սպասե՞լ, թե՞ գնալ մոտակա այլ ռեստորան։',
        es: 'Decidiría con mis amigos si esperar o buscar otro restaurante cercano.',
      },
      {
        key: 'C',
        arm: 'Ես կասեի, որ կարող ենք ուտել խոհանոցում՝ խոհարարների հետ։',
        es: 'Diría que podemos comer en la cocina con los cocineros.',
      },
      {
        key: 'D',
        arm: 'Ես ռեստորանի դիմաց կսկսեի հաշվել բոլոր անցորդներին։',
        es: 'Empezaría a contar a todos los peatones delante del restaurante.',
      },
    ],
  },
  {
    id: 10,
    titleEs: 'Una oportunidad de trabajo',
    titleArm: 'Աշխատանքի հնարավորություն',
    questionEs: 'Te ofrecen un trabajo interesante, pero para aceptarlo necesitas aprender a utilizar un programa informático nuevo. ¿Qué harías?',
    questionArm: 'Քեզ հետաքրքիր աշխատանք են առաջարկում, բայց դրա համար պետք է սովորես նոր համակարգչային ծրագիր։ Ի՞նչ կանեիր։',
    grammarFocus: 'Valoraría / Intentaría (Condicional Simple)',
    explanationEs: 'Aceptar el reto y formarse abre grandes puertas de crecimiento profesional.',
    explanationArm: 'Նոր հմտություն սովորելու պատրաստակամությունը մասնագիտական աճի գրավականն է:',
    correctKey: 'D',
    options: [
      {
        key: 'A',
        arm: 'Ես կհրաժարվեի՝ նույնիսկ չփորձելով հասկանալ ծրագիրը։',
        es: 'Rechazaría la oferta sin siquiera intentar entender el programa.',
      },
      {
        key: 'B',
        arm: 'Ես կասեի, որ համակարգիչները պետք է իրենք սովորեն մարդկանց լեզուն։',
        es: 'Diría que los ordenadores deberían aprender a hablar el idioma de las personas.',
      },
      {
        key: 'C',
        arm: 'Ես կխնդրեի, որ ծրագիրը իմ փոխարեն աշխատի։',
        es: 'Le pediría al programa que trabajara por mí.',
      },
      {
        key: 'D',
        arm: 'Ես կգնահատեի հնարավորությունը և կփորձեի սովորել անհրաժեշտ հմտությունները։',
        es: 'Valoraría la oportunidad e intentaría aprender las habilidades necesarias.',
      },
    ],
  },
  {
    id: 11,
    titleEs: 'Una competición injusta',
    titleArm: 'Անարդար մրցույթ',
    questionEs: 'Participas en una competición y observas que uno de los participantes está incumpliendo las reglas para conseguir ventaja. ¿Cómo actuarías?',
    questionArm: 'Դու մասնակցում ես մրցույթի և նկատում ես, որ մասնակիցներից մեկը խախտում է կանոնները՝ առավելություն ստանալու համար։ Ինչպե՞ս կվարվեիր։',
    grammarFocus: 'Informaría / Pediría (Condicional Simple)',
    explanationEs: 'Informar con calma a la organización mantiene el juego limpio.',
    explanationArm: 'Կազմակերպիչներին հանգիստ տեղեկացնելը պահպանում է արդար խաղը:',
    correctKey: 'C',
    options: [
      {
        key: 'A',
        arm: 'Ես էլ կսկսեի խախտել կանոնները։',
        es: 'Yo también empezaría a incumplir las reglas.',
      },
      {
        key: 'B',
        arm: 'Ես կհայտարարեի, որ այսուհետև մրցույթներում կանոններ չեն լինելու։',
        es: 'Anunciaría que a partir de ahora las competiciones no tendrán reglas.',
      },
      {
        key: 'C',
        arm: 'Ես հանգիստ կտեղեկացնեի կազմակերպիչներին և կխնդրեի ստուգել իրավիճակը։',
        es: 'Informaría tranquilamente a los organizadores y pediría que comprobaran la situación.',
      },
      {
        key: 'D',
        arm: 'Ես կառաջարկեի հաղթողին ընտրել պատահական թվով։',
        es: 'Propondría elegir al ganador mediante un número al azar.',
      },
    ],
  },
  {
    id: 12,
    titleEs: 'Un cambio de planes',
    titleArm: 'Ծրագրերի փոփոխություն',
    questionEs: 'Llevas mucho tiempo planeando pasar el fin de semana en la naturaleza, pero a última hora tus amigos proponen un plan completamente diferente. ¿Qué harías?',
    questionArm: 'Դու վաղուց պլանավորել ես հանգստյան օրերն անցկացնել բնության գրկում, բայց վերջին պահին ընկերներդ առաջարկում են լրիվ ուրիշ ծրագիր։ Ի՞նչ կանեիր։',
    grammarFocus: 'Hablaría / Intentaría (Condicional Simple)',
    explanationEs: 'El diálogo constructivo ayuda a encontrar un plan donde todos disfruten.',
    explanationArm: 'Քննարկումը թույլ է տալիս գտնել բոլորին հարմար փոխզիջումային տարբերակ:',
    correctKey: 'A',
    options: [
      {
        key: 'A',
        arm: 'Ես նրանց հետ կքննարկեի առաջարկը և կփորձեի գտնել բոլորին հարմար լուծում։',
        es: 'Hablaría con ellos sobre la propuesta e intentaría encontrar una solución que nos conviniera a todos.',
      },
      {
        key: 'B',
        arm: 'Ես կհայտարարեի, որ այսուհետև ծրագրերը փոխելն արգելված է։',
        es: 'Anunciaría que a partir de ahora está prohibido cambiar de planes.',
      },
      {
        key: 'C',
        arm: 'Ես կգնայի անտառ՝ առանց որևէ մեկին ասելու։',
        es: 'Me iría al bosque sin decírselo a nadie.',
      },
      {
        key: 'D',
        arm: 'Ես կասեի, որ հանգստյան օրերը պետք է յոթ օր տևեն։',
        es: 'Diría que los fines de semana deberían durar siete días.',
      },
    ],
  },
  {
    id: 13,
    titleEs: 'Una reserva para el día equivocado',
    titleArm: 'Սխալ օրվա ամրագրում',
    questionEs: 'Has reservado una mesa en un restaurante para el sábado, pero al llegar descubres que por error elegiste el domingo. ¿Qué harías?',
    questionArm: 'Դու ռեստորանում սեղան ես ամրագրել շաբաթ օրվա համար, բայց այնտեղ հասնելիս հասկանում ես, որ պատահաբար ընտրել ես կիրակին։ Ի՞նչ կանեիր։',
    grammarFocus: 'Explicaría / Preguntaría (Condicional Simple)',
    explanationEs: 'Admitir el descuido con amabilidad suele resolver el problema con el personal.',
    explanationArm: 'Սխալը բացատրելն ու ազատ սեղանի մասին հարցնելն ամենաբնական քայլն է:',
    correctKey: 'A',
    options: [
      {
        key: 'A',
        arm: 'Կբացատրեի սխալը և կհարցնեի՝ արդյոք այսօր ազատ սեղան կա։',
        es: 'Explicaría el error y preguntaría si hay alguna mesa disponible para hoy.',
      },
      {
        key: 'B',
        arm: 'Կասեի, որ իմ օրացույցում այսօր կիրակի է։',
        es: 'Diría que en mi calendario hoy es domingo.',
      },
      {
        key: 'C',
        arm: 'Կառաջարկեի ռեստորանին մեկ օր առաջ տեղափոխվել ժամանակի մեջ։',
        es: 'Propondría al restaurante viajar un día atrás en el tiempo.',
      },
      {
        key: 'D',
        arm: 'Կասեի, որ կարելի է կիրակնօրյա ընթրիքն ուտել շաբաթ օրը։',
        es: 'Diría que podemos cenar el domingo el sábado.',
      },
    ],
  },
  {
    id: 14,
    titleEs: 'Una decisión difícil',
    titleArm: 'Դժվար որոշում',
    questionEs: 'Te ofrecen participar en un curso interesante, pero coincide con el horario de tu actividad favorita. ¿Cómo tomarías la decisión?',
    questionArm: 'Քեզ առաջարկում են մասնակցել հետաքրքիր դասընթացի, բայց այն համընկնում է քո սիրելի զբաղմունքի ժամերի հետ։ Ինչպե՞ս կորոշեիր։',
    grammarFocus: 'Compararía / Elegiría (Condicional Simple)',
    explanationEs: 'Sopesar pros y contras según tus objetivos a largo plazo es la mejor estrategia.',
    explanationArm: 'Առավելությունները համեմատելն ու նպատակներին համապատասխան ընտրություն կատարելն ամենախելամիտն է:',
    correctKey: 'D',
    options: [
      {
        key: 'A',
        arm: 'Ես անմիջապես կհրաժարվեի երկու զբաղմունքներից։',
        es: 'Renunciaría inmediatamente a las dos actividades.',
      },
      {
        key: 'B',
        arm: 'Ես կփորձեի միաժամանակ երկու վայրում լինել։',
        es: 'Intentaría estar en dos lugares al mismo tiempo.',
      },
      {
        key: 'C',
        arm: 'Ես կորոշեի՝ նետելով մետաղադրամը հարյուր անգամ։',
        es: 'Tomaría la decisión lanzando una moneda cien veces.',
      },
      {
        key: 'D',
        arm: 'Ես կհամեմատեի երկու տարբերակների առավելությունները և կընտրեի իմ նպատակներին ավելի համապատասխան տարբերակը։',
        es: 'Compararía las ventajas de ambas opciones y elegiría la que mejor se adaptara a mis objetivos.',
      },
    ],
  },
  {
    id: 15,
    titleEs: 'Una oportunidad para ayudar',
    titleArm: 'Օգնելու հնարավորություն',
    questionEs: 'Te das cuenta de que una persona de tu entorno quiere aprender español, pero le da vergüenza hablar y tiene miedo de cometer errores. ¿Cómo le aconsejarías?',
    questionArm: 'Դու նկատում ես, որ քո շրջապատում մի մարդ ցանկանում է սովորել իսպաներեն, բայց ամաչում է խոսել և վախենում է սխալվելուց։ Ի՞նչ խորհուրդ կտայիր նրան։',
    grammarFocus: 'Animaría (Condicional Simple)',
    explanationEs: 'Cometer errores es parte natural del aprendizaje; la práctica diaria vence el miedo.',
    explanationArm: 'Սխալները լեզու սովորելու բնական մասն են. ամենօրյա փոքր պրակտիկան օգնում է հաղթահարել վախը:',
    correctKey: 'C',
    options: [
      {
        key: 'A',
        arm: 'Ես կասեի, որ պետք է խոսի միայն այն ժամանակ, երբ կատարյալ տիրապետի լեզվին։',
        es: 'Le diría que debería hablar solamente cuando dominara perfectamente el idioma.',
      },
      {
        key: 'B',
        arm: 'Ես կառաջարկեի անգիր սովորել ամբողջ բառարանը՝ մինչև առաջին խոսակցությունը։',
        es: 'Le propondría memorizar todo el diccionario antes de su primera conversación.',
      },
      {
        key: 'C',
        arm: 'Ես կխրախուսեի նրան ամեն օր մի փոքր խոսել և սխալները համարել սովորելու բնական մաս։',
        es: 'Lo animaría a hablar un poco cada día y a considerar los errores una parte natural del aprendizaje.',
      },
      {
        key: 'D',
        arm: 'Ես խորհուրդ կտայի միայն իսպաներեն ֆիլմեր դիտել՝ առանց երբևէ խոսելու։',
        es: 'Le aconsejaría ver solamente películas en español sin hablar nunca.',
      },
    ],
  },
];
