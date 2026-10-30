// New release: add an entry, change featuredRelease, then run `npm run build`.
export const site = {
  artist: 'Sena Şener', url: 'https://www.senasener.com/', era: 'Aşkından Ölmemeli',
  featuredRelease: 'sev-diyeydi', email: 'management@senasener.com',
  links: {
    spotify: 'https://open.spotify.com/artist/7CW2eGwAuElNq09rVtZYsM',
    apple: 'https://music.apple.com/tr/artist/sena-%C5%9Fener/992280338',
    youtube: 'https://www.youtube.com/channel/UCfrpd0imEITLaj1LEnEL1gQ',
    instagram: 'https://www.instagram.com/sena.sener/',
    concerts: 'https://www.bubilet.com.tr/sanatci/sena-sener',
    press: 'https://presskit.senasener.com/', media: 'https://mediakit.senasener.com/',
    pressPdf: 'https://mediakit.senasener.com/SenaSener_PressKit_2026.pdf',
  },
  // Keep the campaign portrait as the first impression. The retained film is one click away.
  film: { src: 'assets/teaser.mp4', poster: 'assets/poster.jpg', title: 'Aşkından Ölmemeli', autoplay: false },
};
export const releases = [
  {
    id: 'askindan-olmemeli', title: 'Aşkından Ölmemeli', lines: ['Aşkından', 'Ölmemeli'],
    date: '2026-08-07', cover: 'assets/releases/askindan-olmemeli.jpg',
    note: { tr: 'Hikâyenin başladığı yer.', en: 'Where the story begins.' },
    spotify: 'https://open.spotify.com/album/1jWoqxbnvWtu1qEocnE3yM',
    apple: 'https://music.apple.com/tr/album/a%C5%9Fk%C4%B1ndan-%C3%B6lmemeli-single/1832119467',
    youtube: 'https://www.youtube.com/watch?v=Ftbx90wLdq0',
    videoType: { tr: 'Klibi izle', en: 'Watch the film' },
  },
  {
    id: 'alisilir-mi-aska', title: 'Alışılır mı Aşka', lines: ['Alışılır mı', 'Aşka'],
    date: '2026-09-11', cover: 'assets/releases/alisilir-mi-aska.jpg',
    note: { tr: 'Bir duygu, bir soru, bir şarkı daha.', en: 'A feeling. A question. Another song.' },
    spotify: 'https://open.spotify.com/track/7fjvSBdeQlJW3eN0wc1IeQ',
    apple: 'https://music.apple.com/tr/album/al%C4%B1%C5%9F%C4%B1l%C4%B1r-m%C4%B1-a%C5%9Fka-single/6802358846',
    youtube: 'https://www.youtube.com/watch?v=nlsqm1eP7KA',
    videoType: { tr: 'Visualizer’ı izle', en: 'Watch the visualizer' },
  },
  {
    id: 'sev-diyeydi', title: 'Sev Diyeydi', lines: ['Sev', 'Diyeydi'],
    date: '2026-10-23', cover: 'assets/releases/sev-diyeydi.jpg',
    note: { tr: 'Yeni albümden bir hikâye daha.', en: 'Another story from the new album.' },
    spotify: 'https://open.spotify.com/track/2Zsr7YRskWBBX7ndWpxflo',
    apple: 'https://music.apple.com/tr/album/sev-diyeydi-single/6816207370',
    youtube: 'https://www.youtube.com/watch?v=g3uNy61RNt0',
    videoType: { tr: 'YouTube’da dinle', en: 'Listen on YouTube' },
  },
];
export const copy = {
  tr: {
    skip:'İçeriğe geç', home:'Ana sayfa', nav:'Ana menü', music:'Müzik', live:'Live', press:'Basın', booking:'Booking',
    eraLabel:'Yeni bir dönem', artistLabel:'Sena Şener · Yeni albümden', latest:'Yeni tekli', out:'Şimdi yayında',
    listen:'Şimdi dinle', releases:'Albümden şarkılar', allMusic:'Tüm müzikler', chooseRelease:'Şarkıyı keşfet', previous:'Önceki şarkı', next:'Sonraki şarkı',
    filmLabel:'Albüm dünyasından', pause:'Filmi duraklat', play:'Filmi oynat', soundOn:'Film sesini aç', soundOff:'Film sesini kapat', soundCredit:'Film: Aşkından Ölmemeli', close:'Kapat',
    musicEyebrow:'Aşkından Ölmemeli · Albümden', musicTitle:'Şarkı şarkı, bir dünya.', musicIntro:'Her şarkıda biraz daha açılan bir hikâye. İstediğin yerden başla.',
    catalogue:'Bütün şarkılar', catalogueNote:'Sena Şener’in müzik dünyası',
    liveEyebrow:'Sena Şener · Sahnede', liveTitle:'Aynı şarkıda.\nAynı yerde.', liveIntro:'Birlikte söylemek için. Güncel konser tarihleri ve biletler burada.', tickets:'Konserler & biletler', ticketsNote:'Güncel program · Bubilet', liveFollow:'Sahneden, stüdyodan, hayattan.', follow:'Instagram’da takip et',
    pressEyebrow:'Basın & medya', pressTitle:'Sesin\narkasındaki dünya.', pressIntro:'Şarkıcı, söz yazarı ve prodüktör. Sena Şener’in yeni döneminde retro pop ve soul, Anadolu melodileriyle buluşuyor.',
    pressKit:'Basın kiti', pressKitNote:'Biyografi & sanatçı hikâyesi', mediaKit:'Medya kiti', mediaKitNote:'Basın fotoğrafları & görsel kimlik', download:'Basın kitini indir', photoCredit:'Fotoğraf: Sena Şener arşivi',
    bookingEyebrow:'Booking & iletişim', bookingTitle:'Birlikte\nbir şeyler.', bookingIntro:'Konserler, festivaller, iş birlikleri ve yeni hikâyeler için.', management:'Menajerlik · Basın · Booking', contactNote:'Konser ve etkinlik taleplerinde tarih, şehir ve mekân bilgilerini paylaşabilirsin.',
    newTab:'yeni sekmede açılır', mediaError:'Film şu an oynatılamıyor. Müziğe dinleme bağlantılarından ulaşabilirsin.',
  },
  en: {
    skip:'Skip to content', home:'Home', nav:'Main navigation', music:'Music', live:'Live', press:'Press', booking:'Booking',
    eraLabel:'A new chapter', artistLabel:'Sena Şener · From the new album', latest:'Latest single', out:'Out now',
    listen:'Listen now', releases:'From the new album', allMusic:'All music', chooseRelease:'Explore this release', previous:'Previous release', next:'Next release',
    filmLabel:'Inside the album', pause:'Pause the film', play:'Play the film', soundOn:'Unmute the film', soundOff:'Mute the film', soundCredit:'Film: Aşkından Ölmemeli', close:'Close',
    musicEyebrow:'Aşkından Ölmemeli · The new chapter', musicTitle:'Song by song, a world.', musicIntro:'A story unfolding with every song. Start wherever you feel.', catalogue:'The full catalogue', catalogueNote:'The world of Sena Şener',
    liveEyebrow:'Sena Şener · On stage', liveTitle:'The same song.\nThe same room.', liveIntro:'Made to be sung together. Find upcoming shows and tickets here.', tickets:'Shows & tickets', ticketsNote:'Current listings · Bubilet', liveFollow:'On stage. In the studio. In between.', follow:'Follow on Instagram',
    pressEyebrow:'Press & media', pressTitle:'The world\nbehind the voice.', pressIntro:'Singer, songwriter and producer. Sena Şener’s new chapter brings the warmth of retro pop and soul together with Anatolian melodies.',
    pressKit:'Press kit', pressKitNote:'Biography & artist story', mediaKit:'Media kit', mediaKitNote:'Press photography & visual identity', download:'Download the press kit', photoCredit:'Photography: Courtesy of Sena Şener',
    bookingEyebrow:'Booking & contact', bookingTitle:'Let’s make\nsomething happen.', bookingIntro:'For concerts, festivals, collaborations and new stories.', management:'Management · Press · Booking', contactNote:'For live enquiries, please include the proposed date, city and venue.',
    newTab:'opens in a new tab', mediaError:'The film is currently unavailable. You can still listen through the music links.',
  },
};
