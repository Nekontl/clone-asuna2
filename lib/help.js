const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')
const formater1 = (seconds) => {
                    const pad1 = (s) => {
                        return (s < 10 ? '0' : '') + s
                    }
                    const hrs = Math.floor(seconds / (60 * 60))
                    const mins = Math.floor(seconds % (60 * 60) / 60)
                    const secs = Math.floor(seconds % 60)
                    return ' ' + pad1(hrs) + ':' + pad1(mins) + ':' + pad1(secs)
                }
            const uptime1 = process.uptime()
	    
	    const speed = require('performance-now')
	    const timestamp = speed();
            const latensi = speed() - timestamp
let help = (v) => {
	return `
	*Hi! Ini adalah fitur pada AsunaBot✨*
	- Nama : *${pushname}* -
	- Website : *http://asuna-login.herokuapp.com* -
	- Uptime Server : ${formater1(uptime1)} -
	- Waktu Server : *${moment(moment()).format('HH:mm:ss')}* -
	- Tanggal Server : *${moment(moment()).format('DD/MM/YYYY')}* -
	- Latensi Server : *${latensi.toFixed(4)}* Detik -
	

- - - *General:* - - -
-⌛ menu
-⌛ help
-⌛ mtk
-⌛ tot
-⌛ lapor [text]
-⌛ gift  @user 

- - - *Sticker:* - - -
-❐ sticker
-❐ stiker
-❐ s

- - - *Games:* - - -
-❐ saldo
-❐ gift

- - - *Informasi:* - - -
-✙ infogempa
-✙ wiki (query)
-✙ wikien (query)

- - - *Anime:* - - -
-☀ nekonime
-☀ nsfwanime
-☀ hentai
-☀ yuri

- - - *Downloader:* - - -
-☂ ytmp3 (url)
-☂ tiktok (url)
-☂ ytmp4 (url)

- - - *Fun Menu (Group):* - - -
-⌛ enable nsfw
-⌛ disable nsfw

- - - *Bucin:* - - -
-✎ artimimpi (query)
-✎ artinama (name)
-✎ haribaik (date)
-✎ harilarangan (date)
-✎ kecocokannama (name)|(date)
-✎ ramaljodoh (name1)|(name2)
-✎ ramalanjodoh (name1)|(date1)|(name2)|(date2)
-✎ rejekiweton (date)
-✎ tanggaljadian (date)
-✎ watakartis (name)|(date)

- - - *Maker:* - - -
-✔️ photofunia light (text)
-✔️ photofunia snow (text)
-✔️ halah (text)
-✔️ hilih (text)

- - - *Developer only!:* - - -
-✔️ eval (code)

`
}

module.exports = { help }
