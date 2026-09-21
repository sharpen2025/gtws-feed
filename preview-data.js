// 미리보기 전용 샘플 데이터 (2026-09-18 기준 실제 수집값)
// 실제 사이트에서는 data/gtws.json 을 fetch 하므로 이 파일은 쓰이지 않습니다.
(function () {
  var U = 'https://goldentrailseries.com/wp-content/uploads/';
  function r(date, country, series, name, tagline, distance, elevation, capacity, slug, img) {
    return {
      date: date,
      dateISO: date.slice(6) + '-' + date.slice(3, 5) + '-' + date.slice(0, 2),
      country: country,
      series: series,
      name: name,
      tagline: tagline,
      distance: distance,
      elevation: elevation,
      capacity: capacity,
      url: 'https://goldentrailseries.com/race/' + slug + '/',
      image: U + img
    };
  }
  var races = [
    r('08/03/2026','au','National Series','WARBURTON TRAIL FESTIVAL','Donna Double','22 km','1,333 m','','warburton-trail-festival','2026/05/NEW-SAVE-Salomon-Warburton-Trail-Fest-2546-1.jpg'),
    r('15/03/2026','cn','National Series','TRAIL DONGHAI','The Coastal Course','30 km','1,412 m','2,000','trail-donghai','2026/05/WEB-1.jpg'),
    r('22/03/2026','fr','National Series','SALOMON ECOTRAIL PARIS','The Urban Wild','35 km','830 m','2,000','salomon-ecotrail-paris','2026/05/Salomon-Ecotrail-Paris-6.jpg'),
    r('19/04/2026','cn','National Series','NINE PEAKS GRANDMASTER CHALLENGE BY TSAIGU','China’s Sierre-Zinal','2,079 km','30 m','1,800','nine-peaks-grandmaster-challenge-by-tsaigu','2026/05/NINE-PEAKS-GRANDMASTER-CHALLENGE-BY-TSAIGU-2.jpg'),
    r('26/04/2026','cn','National Series','YANG JIANG YANGCHUN JILONGDING AZALEA TRAIL RUNNING RACE','Blooming mountain adventure','30 km','1,529 m','1,500','yang-jiang-yangchun-jilongding-azalea-trail-running-race','2026/05/YANG-JIANG-YANGCHUN-JILONGDING-AZALEA-TRAIL-RUNNING-RACE-2.jpg'),
    r('17/05/2026','es','World Series','ZEGAMA – AIZKORRI','The Basque Fever','42 km','2,745 m','500','zegama-aizkorri','2026/05/@Rising.Story-@JustinGalant_Zegama_25-05-25-169.jpg'),
    r('17/05/2026','cn','National Series','CFTT SHENNONGJIA ULTRA RACE (S-ULTRA)','The four seasons race','28 km','2,186 m','1,300','cftt-shennongjia-ultra-race','2026/05/CFTT-SHENNONGJIA-ULTRA-RACE-S-ULTRA-1.jpg'),
    r('24/05/2026','it','World Series','LEDRO SKY TRENTINO','Wild peaks, trenchline trails','28,8 km','1,775 m','500','ledro-sky-trentino','2026/05/@rising.story_@antho.dx_Ledro_Sky_12-10-2025-09371-2.jpg'),
    r('30/05/2026','cn','National Series','FOUR SISTERS MOUNTAIN MECONOPSIS TRAIL','GTNS China Grand Finale','22 km','1,407 m','500','four-sisters-mountain-meconopsis-trail','2026/05/four-sisters-mountain-race-1.jpg'),
    r('05/07/2026','ca','World Series','QUÉBEC MEGA TRAIL','The Beast of the East','28,6 km','1.397 m','500','quebec-mega-trail','2026/05/QMT-2023-Credit-QMT-scaled.jpg'),
    r('12/07/2026','it','National Series','DOLOMYTHS RUN','From the heart of Canazei to the sky of Piz Boè','21,7 km','1,764 m','800','dolomyths-run','2026/05/WEB-DJI_20250421083600_0070_D.jpg'),
    r('17/07/2026','pl','National Series','GOLDEN MOUNTAINS TRAIL','The trail festival','33 km','1,500 m','750','golden-mountains-trail','2026/05/WEB-NA-TRASIE-1.jpg'),
    r('01/08/2026','at','World Series','SALOMON PITZ ALPINE GLACIER TRAIL','Where glaciers meet the sky','24,5 km','1,618 m','','salomon-pitz-alpine-glacier-trail','2026/05/@rising.story_@justingalant_PitzAlpineGlacier_02-08-25-196.jpg'),
    r('08/08/2026','ch','World Series','SIERRE-ZINAL','Fast and furious','31 km','2,133 m','6,300','sierre-zinal','2026/05/@rising.story_@justingalant_SierreZinal_09-08-25-62.jpg'),
    r('08/08/2026','mx','National Series','TEPEC TRAIL ZAPOTITLAN SALINAS','Magic Mountains','36 km','1,800 m','450','tepec-trail-zapotitlan-salinas','2026/05/MF_012826_Zapotitlan_0196.jpg'),
    r('22/08/2026','cz','National Series','SALOMON JESENICKY MARATON','A dreamy landscape','21 km','730 m','','salomon-jesenicky-maraton','2026/05/WEB-JM_3.jpg'),
    r('20/09/2026','jp','World Series','MYOKO TRAIL','Double up, double down','24,7 km','2,020 m','400','myoko-trail','2026/05/2022_myoko_072.jpg'),
    r('27/09/2026','cn','World Series','JINSHANLING GREAT WALL TRAIL RACE','The Wonderwall','23,1 km','1,667 m','3,000','jinshanling-great-wall-trail-race','2026/05/web-@rising.story-@mathisdecroux_GreatWallChina_04-26-00172.jpg'),
    r('04/10/2026','es','National Series','SALOMON MITJA PIRINEU','The best views of Pedraforca','21 km','1,400 m','1,000','salomon-mitja-pirineu','2026/05/WEB-MITJA_PIRINEU_Gerard_Campderros-94.jpg'),
    r('24/10/2026','kr','World Series','MUJU TRAIL GRAND FINALE','Stitched by strides','25,6 km','2,294 m','5,000','muju-trail','2026/05/WEB-Deogyusan-Landscape-1.jpg')
  ];

  function p(rank, name, club, country, points, raceCount) {
    return { rank: rank, name: name, club: club, country: country, points: points, raceCount: raceCount };
  }
  var men = [
    p(1,'ELHOUSINE ELAZZAOUI','Nnormal','ma',824,4), p(2,'PHILEMON OMBOGO KIRIAGO','Run2gether On Trail','ke',648,3),
    p(3,'MICHAEL SELELO SAOLI','Run2gether On Trail','ke',568,3), p(4,'PATRICK KIPNGENO','Run2gether On Trail','ke',556,3),
    p(5,'ALAIN SANTAMARÍA','X-Bionic Integrity','es',515,4), p(6,'BOGDAN DAMIAN','Kailas Fuga','ro',509,4),
    p(7,'NASHON KIPLIMO','Salomon','ke',481,3), p(8,'EZEKIEL RUTTO','Salomon','ke',454,3),
    p(9,'TAYLOR STACK','Brooks','us',452,4), p(10,'SAMWEL KIPROTICH','Salomon','ke',372,3),
    p(11,'ISACCO COSTA','La Sportiva','it',327,3), p(12,'DANIEL PATTIS','Brooks','it',324,2),
    p(13,'TIMOTHY KIBETT','Salomon','ke',322,2), p(14,'PAUL MACHOKA','Atletica Saluzzo','ke',296,2),
    p(15,'ADAM SJOLUND','Ponderosa Pirates','us',295,3), p(16,'CHRISTIAN ALLEN','Nike ACG','us',294,2),
    p(17,'JAN TORRELLA OLLER','Salomon','es',275,2), p(18,'BRAYAN RODRÍGUEZ FLORES','','mx',266,2),
    p(19,'REMI LEROUX','Brooks','ca',246,3), p(20,'JONAS SOLDINI','Salomon','ch',242,2),
    p(21,'MATTIA TANARA','Scott','it',241,3), p(22,'ANDERS KJÆREVIK','','no',210,3),
    p(23,'MAEL HENRIC','Salomon','fr',206,2), p(24,'RYUNOSUKE OMI','Salomon','jp',206,2),
    p(25,'NICOLAS MOLINA','Scott','es',203,2), p(26,'DAVID NORRIS','On Trail','us',173,2),
    p(27,'NOAM FRANCHI','Norda','fr',173,2), p(28,'JACOB ADKIN','New Balance','gb',172,1),
    p(28,'MANUEL MERILLAS','New Balance','es',172,1), p(29,'EPHANTUS NJERI','Run2gether On Trail','ke',170,2),
    p(30,'ROSS GOLLAN','Nike ACG','gb',167,3), p(31,'REMI BONNET','Salomon','ch',164,1),
    p(32,'MASSIMILIANO BERTI','ASD Sicilia Running Team','it',157,2), p(33,'ROBERT PKEMOI MATAYANGO','Otso','ke',156,1),
    p(34,'ROBERTO DELORENZI','Brooks','ch',152,2)
  ];
  var women = [
    p(1,'MADALINA FLOREA','Scott','ro',872,4), p(2,'CAROLINE KIMUTAI','Salomon','ke',614,3),
    p(3,'RUTH MWIHAKI GITONGA','Run2gether On Trail','ke',522,3), p(4,'BARBORA BUKOVJAN','Salomon','cz',502,3),
    p(5,'CATERINA STENTA','Joma','it',463,4), p(6,'MARIE NIVET','Nike ACG','fr',453,3),
    p(7,'ELISA PRESA','Salomon','it',442,4), p(8,'MADALINA AMARIEI','Kailas Fuga','ro',386,3),
    p(9,'THERES LEBOEUF','Compressport / Lowa','ch',363,3), p(10,'RENÉE CARDINAALS','Esprit Montagne','nl',342,3),
    p(11,'SARA ALONSO','Asics','es',320,2), p(12,'SYDNEY PETERSEN','Brooks','us',318,4),
    p(13,'MARIA FUENTES OLCINA','Kailas Fuga','es',306,2), p(14,'MIRIAM CHEPKIRUI','Run2gether On Trail','ke',300,2),
    p(15,'HANNA GRÖBER','IRCZRH','de',278,2), p(16,'NAIARA IRIGOYEN','X-Bionic Integrity','es',267,3),
    p(17,'SILVIA SCHWAIGER','Salomon','sk',260,2), p(18,'ESTEL ROIG FORTIN','Scott','es',260,2),
    p(19,'GABRIELA LASALLE','Nike ACG','es',232,2), p(20,'TOVE ALEXANDERSSON','Salomon','se',230,1),
    p(21,'VALENTINE RUTTO','Atletica Saluzzo','ke',220,2), p(22,'MALEN OSA ANSA','Salomon','es',206,1),
    p(23,'PEMA FRANCHI','Norda','ec',206,2), p(24,'SARAH CARTER','Topo Athletic','us',200,2),
    p(25,'JOYCE MUTHONI NJERU','Nnormal','ke',194,1), p(26,'NAOMI LANG','Salomon','gb',192,1),
    p(27,'MORVEN GOODRUM','Windsor Slough Eton & Hounslow','gb',186,1), p(28,'SELINA BURCH','Lowa Trail Racers','ch',185,2),
    p(29,'IDA AMELIE ROBSAHM','Asics','no',172,1), p(29,'NINA ENGELHARD','PSV Grün Weiß Kassel','de',172,1),
    p(29,'ORIA LIACI','Brooks','ch',172,1), p(30,'ANDREA KOLBEINSDÓTTIR','Salomon','is',168,1),
    p(31,'ALEXA ARAGON','Mammut / La Sportiva','us',168,2), p(32,'NIENKE BRINKMAN','Nike ACG','nl',166,1),
    p(33,'LINDSAY WEBSTER','','ca',160,1)
  ];

  window.GTWS_PREVIEW_DATA = {
    updatedAt: '2026-09-18T08:00:00+09:00',
    updatedDate: '2026-09-18',
    edition: 2026,
    counts: { nextUp: 3, races: races.length, men: men.length, women: women.length },
    nextUp: races.filter(function (x) { return ['myoko-trail', 'jinshanling-great-wall-trail-race', 'salomon-mitja-pirineu'].some(function (s) { return x.url.indexOf(s) > -1; }); }),
    races: races,
    ranking: { men: men, women: women }
  };
})();
