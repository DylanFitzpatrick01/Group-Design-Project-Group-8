import React, { useEffect, useState } from 'react';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../firebase.js';


function AddSociety() {
    const addSociety = async () => {
        try {
            const docRef1 = await setDoc(doc(db, "societiesProfile", "Afro-Caribbean Society"), {
                email: 'afrocarib@csc.tcd.ie',
                name: 'Afro-Caribbean Society                ',
                avatar: 'https://assets-global.website-files.com/648358d59b35527efcb2e249/6519369209b135a52c96422a_Afro-2018_effbf543-167c-4a2b-b37f-c8e7d7bfc0c1.png',
                intro: 'The Trinity Afro-Caribbean Society is a cultural society that is dedicated to encouraging and embracing the celebration of the rich and diverse Afro-Caribbean culture within Trinity, Dublin and Ireland. Our aim is to promote the Afro-Caribbean culture not only to African and Caribbean students of the college but to all those who are interested in our heritage. We also promise to entertain and engage you with fun events that explore the depth of the culture through various art forms such as dance, music and film. Our society is open to everyone so don’t be shy to join                ',
                instagram: 'tcdacs',
                facebook: '',
                twitter: '',
                website: ''
            });
            const docRef2 = await setDoc(doc(db, "societiesProfile", "Alternative Music Society"), {
                email: 'duams@csc.tcd.ie',
                name: 'Alternative Music Society (DUAMS)                ',
                avatar: 'https://assets-global.website-files.com/648358d59b35527efcb2e249/6519369800590dd78d30360c_DUAMS-2018_d62cab98-6a8b-4e0e-b582-ed10b06444a2.jpeg',
                intro: 'Alternative Music Soc (DUAMS) is Trinity’s society for modern and alternative music, including indie, electronic and hip-hop. The society organises open mics, jam sessions, specialist music nights, listening parties and of course living that rock n’ roll lifestyle. We’ll be bringing you a whole host of socially distanced events this year, and we’ve a huge collection of vinyl for you to go through and borrow. DUAMS aims to promote new music, especially Irish acts, as well as helping new bands form between members. DUAMS aims to bring you the best tunes to get you through the college week.                ',
                instagram: 'du.ams',
                facebook: '',
                twitter: '',
                website: ''
            });
            const docRef3 = await setDoc(doc(db, "societiesProfile", "An Cumann Gaelach"), {
                email: 'cumann@csc.tcd.ie',
                name: 'An Cumann Gaelach',
                avatar: 'https://assets-global.website-files.com/648358d59b35527efcb2e249/651936954f90a63cf7f685ad_CUMANN-2018_4368fab2-a6c4-41dd-bc37-6a732384c544.png',
                intro: 'An Cumann GaelachIs é an Cumann Gaelach ceann de na cumainn is mó ar champas. An aidhm atá ag an gCumann Gaelach ná an Ghaeilge a spreagadh agus a scaipeadh ar champas agus níos faide. Cuireann an Cumann réimse leathan imeachtaí ar siúl idir céilithe, díospóireachtaí, ceolchoirmeacha, aoichainteoirí, cheardlainn, agus i bhfad níos mó, go léir trí mheán na Gaeilge. Tá fáilte roimh chách, is cuma cén leibhéil Gaeilge atá agat! Bígí linn! // The Cumann Gaelach is the Irish Language society, and aims to promote the language on and off campus. With weekly events that range from debates to recitals, to guest speakers and workshops, we have something for everyone -regardless of your level of Irish!',
                instagram: 'cumanngaelachtcd',
                facebook: '',
                twitter: '',
                website: ''
            });
            const docRef4 = await setDoc(doc(db, "societiesProfile", "Archaeological Society"), {
                email: 'archsoc@csc.tcd.ie',
                name: 'Archaeological Society',
                avatar: 'https://assets-global.website-files.com/648358d59b35527efcb2e249/65193692e68ae7a65cca42fd_Arch-Soc-2017_df399d1b-3164-4780-a8c0-999409e7f040-p-500.jpeg',
                intro: 'The Archaeological Society\'s goal is to provide our members with up to date information on archaeology, both in Ireland and further afield.Each year we welcome guest lecturers from diverse fields of archaeology and go on trips to places of great archaeological interest.We also hold many fun social events including a toga party, pub quizzes and the formal imperial ball.This year we will have plenty of online events and outdoor excursions to enjoy safely.Anyway, if you dig archaeology, this is the society for you!',
                instagram: 'duarchsoc',
                facebook: '',
                twitter: '',
                website: ''
            });
            const docRef5 = await setDoc(doc(db, "societiesProfile", "Association of Medical Students of Ireland"), {
                email: 'amsitcd@csc.tcd.ie',
                name: 'Association of Medical Students of Ireland (AMSI)',
                avatar: 'https://assets-global.website-files.com/648358d59b35527efcb2e249/65366dc4f8c56c7418a74f81_lavender.png',
                intro: 'Association of Medical Students of Ireland (AMSI) AMSI TCD is a local committee of AMSI Ireland, which is a student-led organisation based in Ireland and formed in 2013.  The Aims of the Society are to increase collaboration between students of 3rd level institutions regarding medical and healthcare issues.                ',
                instagram: 'amsi_ireland',
                facebook: 'AMSIreland',
                twitter: 'AMSI_Ireland',
                website: ''
            });
            const docRef6 = await setDoc(doc(db, "societiesProfile", "Biochemical Society"), {
                email: 'biochem@csc.tcd.ie',
                name: 'Biochemical Society',
                avatar: 'https://assets-global.website-files.com/648358d59b35527efcb2e249/651936924f90a63cf7f68351_SocietyLogo-BiochemicalSociety.png',
                intro: 'Biochemical Society. Are you interested in biochemistry and its related disciplines? Would you like the opportunity to meet and network with nationally and internationally-recognized leaders in the field of biochemistry? Throughout the academic year, speakers from all over the world are invited to present their cutting-edge research to the society, covering a wide range of subject matter and disciplines. It presents a great opportunity for students to network, and to hear exciting, often unpublished research from leading experts.We organize “Meet the Speaker Masterclass” sessions in which speakers hold informal talks on their career and their research to students. The society also provides a valuable foundation from which to meet fellow students, exchange ideas, and build new friendships! We look forward to meeting you and welcoming you to the Biochemical Society!',
                instagram: '',
                facebook: '',
                twitter: 'BiochemSocTCD',
                website: ''
            });
            const docRef7 = await setDoc(doc(db, "societiesProfile", "Biological Association"), {
                email: 'biosoc@csc.tcd.ie',
                name: 'Biological Association',
                avatar: 'https://assets-global.website-files.com/648358d59b35527efcb2e1e9/6515d65e402f735ceaefe8e3_lavender.png',
                intro: 'Biological AssociationEstablished in 1874, Biosoc is one of TCD’s oldest societies. We cater for everybody who has an interest in biological sciences, medicine and healthcare. Annual events usually include MedBall, trips, book sales and seminars. This year we aim to host a series of seminars/talks/events with leading figures in the medical sphere and to highlight the theme of diversity and inclusion in medicine in Ireland. We also organise MedDay, a huge fundraiser for local hospitals. So whether you’re after Grey’s Anatomy drama, House M.D.’s brains or just some Scrubs-style laughs, Biosoc has the prescription for you!',
                instagram: '',
                facebook: '',
                twitter: '',
                website: 'https://tcdbiosoc.com/'
            });
            const docRef8 = await setDoc(doc(db, "societiesProfile", "Botanical Society"), {
                email: 'botany@csc.tcd.ie',
                name: 'Botanical Society',
                avatar: 'https://assets-global.website-files.com/648358d59b35527efcb2e249/65193693f71e28075bc49239_BotanicalSoclogo-BotanySociety.jpeg',
                intro: 'The Botanical society is the place to be for all things plants! The aim of the Botanical society is to promote awareness of the role of plants in the natural world, in society, and in helping to secure a sustainable future. Weekly events include foraging tours, mushroom hunts with mycologists, plant swaps, plant crafts and workshops, and guided trips to botanical gardens and irish landscapes! Are you a plant enthusiast? A tree hugger? Or do you just want to learn how to keep your potted plant alive? Then join BotSoc!',
                instagram: 'tcdbotsoc',
                facebook: 'TCDBotSoc',
                twitter: 'tcdbotsoc',
                website: ''
            });
            const docRef9 = await setDoc(doc(db, "societiesProfile", "Business and Economics Society"), {
                email: 'dubes@csc.tcd.ie',
                name: 'Business and Economics Society (DUBES)',
                avatar: 'https://assets-global.website-files.com/648358d59b35527efcb2e249/6519369784af08535f3f52ec_DUBESLOGOMainBLUEANDWHITE-DUBES.png',
                intro: 'Founded in 1929, Dublin University Business and Economics Society, or DUBES, was created with a clear goal in mind: To provide our members with access to academic, social, and professional opportunities to help them prepare for the professional world and advance the scope of their knowledge beyond what they learn in class. DUBES unites the students of Trinity together in a social capacity through our annual events that have acted as a rite of passage for BESS students as well as students from other disciplines over the last 90 years. These include the unique DUBES mystery tour and, of course, the institution that is BESS Ball – one of the most renowned highpoints of the academic year for students across a variety of courses. For those interested in learning more about our society, please check out our website at: https://dubes-trinity.com/. ',
                instagram: 'dubestcd',
                facebook: '',
                twitter: '',
                website: ''
            });
            const docRef10 = await setDoc(doc(db, "societiesProfile", "Caledonian Society"), {
                email: 'calsoc@csc.tcd.ie',
                name: 'Caledonian Society',
                avatar: 'https://assets-global.website-files.com/648358d59b35527efcb2e249/651936934f8ccc0d238a896c_CalSocLogo-SophieMacHenry.png',
                intro: 'The DU Caledonian Society is the Scottish hub of Trinity. In the past we have showcased live traditional Scottish music and poetry performances as well as incorporating reeling into our balls and suppers. Through a variety of events taking place around the likes of St Andrew\'s Day and Burns Night, we hope to provide comfort to incoming Scottish students and share with students of all backgrounds the joys of Caledonian culture.Our infamous Raveheart is not something you want to miss! caledonian@csc.tcd.ie',
                instagram: '',
                facebook: 'DUCalSoc',
                twitter: '',
                website: ''
            });
            const docRef11 = await setDoc(doc(db, "societiesProfile", "Cancer Society"), {
                email: 'cancer@csc.tcd.ie',
                name: 'Cancer Society',
                avatar: 'https://assets-global.website-files.com/648358d59b35527efcb2e249/65193694763c14eba4e4f08e_CancerSocietyNewLogoFACEBOOK-CancerSociety.png',
                intro: '',
                instagram: 'tcdcancersoc',
                facebook: '',
                twitter: '',
                website: ''
            });
            const docRef12 = await setDoc(doc(db, "societiesProfile", "Card & Bridge Society"), {
                email: 'bridge@csc.tcd.ie',
                name: 'Card & Bridge Society',
                avatar: 'https://assets-global.website-files.com/648358d59b35527efcb2e249/651936934e1cbb1f611ef49a_Screenshot2020-09-18at16.26.48-BridgeCards.png',
                intro: 'Card Soc gives students the opportunity to play poker and other card games in a fun, relaxed environment. We welcome players with all levels of experience, offering lessons to complete beginners and those wishing to improve their skills. Much of our poker action will take place online this year, with a weekly tournament league and other regular games. During the year, we intend on retaining our society\'s vibrant social aspect.This will involve innovative live events in compliance with regulations, along with creating an engaging online poker community.',
                instagram: 'tcdcards',
                facebook: '',
                twitter: '',
                website: ''
            });
            const docRef13 = await setDoc(doc(db, "societiesProfile", "Chapel Choir"), {
                email: '@csc.tcd.ie',
                name: 'Chapel Choir',
                avatar: 'https://assets-global.website-files.com/648358d59b35527efcb2e249/65366ca531378ef64da6f14a_TCD%20Chapel%20Choir%20-%20Chapel%20Choir-p-500.png',
                intro: 'Founded in 1762, TCD Chapel Choir performs a broad range of sacred music - from the medieval to the contemporary - at two sung liturgies each week in the beautiful College Chapel: Thursday Evensong and Sunday Eucharist. The choir also performs at high profile college events including the Carol and Trinity Monday services, and goes on two trips each year: one national, and one international. Membership is open to all members of the college community, of all faiths and none. Choral scholarships are available. Follow our socials @tcdchapelchoir to keep up with our busy schedule, and don\'t hesitate to get in touch!',
                instagram: 'tcdchapelchoir',
                facebook: '',
                twitter: '',
                website: ''
            });
            const docRef14 = await setDoc(doc(db, "societiesProfile", "Chess Society"), {
                email: 'chess@csc.tcd.ie',
                name: 'Chess Society',
                avatar: 'https://assets-global.website-files.com/648358d59b35527efcb2e249/65367badaf04fe3bd166276f_society%20logo%20-%20Chess%20Society-p-500.jpg',
                intro: 'Trinity\'s Chess Society.We organise weekly events, frequent tournaments, and a yearly Grand Prix.',
                instagram: 'tcdchesssoc',
                facebook: '',
                twitter: '',
                website: ''
            });
            const docRef15 = await setDoc(doc(db, "societiesProfile", "Chinese Society"), {
                email: 'chinese@csc.tcd.ie',
                name: 'Chinese Society',
                avatar: 'https://assets-global.website-files.com/648358d59b35527efcb2e249/65366d322845a4410aedabe9_Chinese%20Society%20%20-%20Chinese%20Students%20Association-p-500.jpg',
                intro: 'New to Dublin and want to make some friends? Miss home or want to experience some Chinese culture? Want to know what modern China is like or simply just want to learn and practice the language? Look no further, and join us on a journey of exciting in person as well as virtual events while experiencing what it\'s like to be in a cultural society. Enjoy our exclusive cultural events and the benefits of being in a society! Experience Chinese food and culture in Dublin with our exclusive discounts from our partnered authentic local Asian businesses (including free samples, discounts and more ).',
                instagram: 'tcd_chinesesoc',
                facebook: '',
                twitter: '',
                website: ''
            });
            const docRef16 = await setDoc(doc(db, "societiesProfile", "Choral Society"), {
                email: 'choral@csc.tcd.ie',
                name: 'Choral Society',
                avatar: 'https://assets-global.website-files.com/648358d59b35527efcb2e249/651936944f8ccc0d238a8a2e_udcscrest-ChoralSociety.jpeg',
                intro: "Founded in 1837, the University of Dublin Choral Society (UDCS) is the oldest and largest choir in Trinity College. Conducted by David Leigh, we are a four part mixed voice choir, consisting of both students and staff. Choral usually performs large-scale choral works with full orchestral accompaniment. Examples of works include Handel's Messiah, Mozart's Requiem, St. John's Passion, and more!",
                instagram: 'trinitychoralsociety',
                facebook: 'Trinitychoral',
                twitter: '',
                website: ''
            });
            const docRef17 = await setDoc(doc(db, "societiesProfile", "Christian Union"), {
                email: 'cunion@csc.tcd.ie',
                name: 'Christian Union',
                avatar: 'https://assets-global.website-files.com/648358d59b35527efcb2e249/6519369600590dd78d3034cc_CUlogo-full_1_-ChristianUnion.png',
                intro: "The Christian Union are a diverse group of students who are united and motivated by the message of the gospel. CU is a loving community where you can come and question and explore faith in a safe space. We aim to be welcoming to anyone and everyone, regardless of what you think about God, Church or the Bible. CU exists to equip students to share the good news of Jesus with others. CU is also a place where students grow in their knowledge and love for God as they disciple, encourage and build one another up. We aim to rely on the Bible, commit to prayer and partner with local churches as we engage with objections to Christianity, give reason for our hope and express that nothing is better than knowing Jesus!",
                instagram: 'tcdcu',
                facebook: 'tcdcu',
                twitter: '',
                website: ''
            });
            const docRef18 = await setDoc(doc(db, "societiesProfile", "Classical Society"), {
                email: 'classical@csc.tcd.ie',
                name: 'Classical Society',
                avatar: 'https://scontent-lhr6-1.xx.fbcdn.net/v/t39.30808-1/308594628_455865849901129_6733212799595959917_n.jpg?stp=c26.0.320.320a_dst-jpg_p320x320&_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=U0TSId_bsm8AX8tnoXO&_nc_ht=scontent-lhr6-1.xx&oh=00_AfAiXra4Hd9keZmu0caz7GKMHcuFTWgG-cUm_P-ehtNYrw&oe=65F25727',
                intro: "We here at DU Classical Society love all things classics. We aim to promote interest and involvement in classics and ancient history for all Trinity students. We work closely with the Classics department in order to advocate for the study of classics in a fun and modern way. This is achieved through the promotion of guest lectures, courses, and field trips. We even have our own hidden library! As well as this, we pride ourselves on being a social society that hosts an array of events throughout the year. This includes our annual nights of drinking and dancing at our Toga Party, Symposium Ball and Classical Play; as well as pub quizzes, myth discussions and coffee mornings. At the end of each year we publish our IRIS magazine, which all students are welcome to contribute to. Ultimately, as a society we aim to balance work and play. So come and join us for some classical craic, we’d love to have you! ",
                instagram: 'duclassical',
                facebook: '',
                twitter: '',
                website: ''
            });
            const docRef19 = await setDoc(doc(db, "societiesProfile", "Clinical Therapies"), {
                email: 'clinicaltherapies@csc.tcd.ie',
                name: 'Clinical Therapies',
                avatar: 'https://assets-global.website-files.com/648358d59b35527efcb2e249/6519369584af08535f3f51d9_file55e469d2f0e4c.jpeg',
                intro: "Founded in 2015, DU Clinical Therapies goal is to create a community among health science students. We aim to promote the fields of Physiotherapy, Occupational Therapy, Speech & Language Therapy, Radiation Therapy, Nutrition & Dietetics and Social Work within the college. Our events promote the academic and social aspects of college, as well as providing learning resources to help students thrive. DUCTS strive to create a campus identity and build a beneficial community for health science students.",
                instagram: '',
                facebook: '',
                twitter: 'duclintherapies',
                website: ''
            });
            const docRef20 = await setDoc(doc(db, "societiesProfile", "College Historical Society"), {
                email: 'hist@csc.tcd.ie',
                name: 'College Historical Society (the Hist)',
                avatar: 'https://assets-global.website-files.com/648358d59b35527efcb2e249/65193696088bfea201a534b8_HistLogo_Blue-CollegeHistoricalSociety.png',
                intro: "The Hist is the world’s oldest student society and has been both a forum for discourse and a cornerstone of college life since 1770. Continuing the legacy of past members such as Wolfe Tone, Bram Stoker and Oscar Wilde, the Hist attracts a variety of prominent guest speakers including, in recent years, Noam Chomsky, Desmond Tutu, Margrethe Vestager and Margaret Atwood. Hist members and public figures alike come together at our Wednesday night chamber debates, where students can make their voice heard on current issues from climate justice to the future of feminism, and each week we hold a variety of events from panel discussions to debating workshops to coffee mornings. Join the conversation by signing up to the Hist today! Membership is €6 for 4 years.www.thehist.com;",
                instagram: '',
                facebook: '',
                twitter: '',
                website: 'https://www.tcdhist.com/'
            });
            console.log("Document written");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };


    return (
        <div className="AddSociety">
            <div>
                <button onClick={addSociety}>Add Demo Societies</button>
            </div>
        </div >
    );
}

export default AddSociety;