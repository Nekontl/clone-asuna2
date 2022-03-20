//DEVN PROJECT YEY

//Deklarasi let
let Baileys = require('@adiwajshing/baileys')
let { readFileSync: read, writeFileSync: write } = require('fs');
let fs = require('fs');
let { help } = require('./../lib/help')
let { color } = require('./../lib/color')
let fetcher = require('./../lib/fetcher')
let _scommand = JSON.parse(read("./database/scommand.json"))
let nsfw = JSON.parse(read('./database/nsfw.json'))

let {
  gempa,
  wikiID,
  wikiEN
} = require('./command/information')
let { ind, eng } = require('./language')

let {
  nekonime,
  nsfwanime,
  hentai,
  yuri
} = require('./command/anime')

let {
  artiMimpi,
  artiNama,
  hariBaik,
  hariLarangan,
  kecocokanNama,
  ramalJodoh,
  ramalanJodoh,
  rejekiWeton,
  tanggalJadian,
  watakArtis
} = require('./command/primbon')

let {
  ytmp3,
  tiktok
} = require('./command/downloader')

let { githubstalk } = require('./command/stalker')
let { photofunia } = require('./command/maker')

let {
  halah,
  hilih
} = require('./command/other')

require('./../config')

if (language == 'ind') {
  mess = ind
} else if (language == 'eng') {
  mess = eng
}

let Presence = Baileys.Presence
  global.online = Presence.available
    global.typing = Presence.composing
      global.recording = Presence.recording
        global.paused = Presence.paused

module.exports = msgMain = async(devn = new conn, msg) => {
  try {
    if (!msg.hasNewMessage) return
    msg = msg.messages.all()[0]
    if (!msg.message) return
    if (msg.key && msg.key.remoteJid == 'status@broadcast') return
    msg.message = (Object.keys(msg.message)[0] === 'ephemeralMessage') ? msg.message.ephemeralMessage.message: msg.message
    let content = JSON.stringify(msg.message)
    let from = msg.key.remoteJid
    let {
      text,
      extendedText,
      contact,
      location,
      liveLocation,
      image,
      video,
      sticker,
      document,
      audio,
      product,
      buttonsMessage
    } = Baileys.MessageType
    type = Object.keys(msg.message)[0]
    cmd = type === "conversation" && msg.message.conversation ? msg.message.conversation: type == "imageMessage" && msg.message.imageMessage.caption ? msg.message.imageMessage.caption: type == "videoMessage" && msg.message.videoMessage.caption ? msg.message.videoMessage.caption: type == "extendedTextMessage" && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text: type == "buttonsResponseMessage" && msg.message[type].selectedButtonId ? msg.message[type].selectedButtonId: ""
    let getCmd = (id) => { let position = null
      Object.keys(_scommand).forEach((i) => {
        if (_scommand[i].id === id) {
          position = i
        }
      })
      if (position !== null) {
        return _scommand[position].chats
      }
    }

    if (multiPrefix == false) {
      var prefix = global.messConf.prefix[0]
    } else if (multiPrefix == true) {
      var prefix = /^[°•π÷×¶∆£¢€¥®™✓=|~zZ+×_*!#%^&./\\©^]/.test(cmd) ? cmd.match(/^[°•π÷×¶∆£¢€¥®™✓=|~xzZ+×_*!#,|÷?;:%^&./\\©^]/gi) : '-'
    } else {
      console.log('[Multi Err] ' + multi + ' is a wrong boolean.')
    }
    body = type === 'listResponseMessage' && msg.message.listResponseMessage.title ? msg.message.listResponseMessage.title: type == 'buttonsResponseMessage' && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId: type == "conversation" && msg.message.conversation.startsWith(prefix) ? msg.message.conversation: type == "imageMessage" && msg.message.imageMessage.caption.startsWith(prefix) ? msg.message.imageMessage.caption: type == "videoMessage" && msg.message.videoMessage.caption.startsWith(prefix) ? msg.message.videoMessage.caption: type == "extendedTextMessage" && msg.message.extendedTextMessage.text.startsWith(prefix) ? msg.message.extendedTextMessage.text: ""
    let chats = (type === 'conversation') ? msg.message.conversation: (type === 'extendedTextMessage') ? msg.message.extendedTextMessage.text: ''
    let command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
    listbut = (type == 'listResponseMessage') ? msg.message.listResponseMessage.title: ''
    let args = body.trim().split(/ +/).slice(1)
    let isCmd = body.startsWith(prefix)
    let q = args.join(' ')
    let botNumber = devn.user.jid
    let isGroupMsg = from.endsWith("@g.us")
    let sender = isGroupMsg ? msg.participant : msg.key.remoteJid
    let groupMetadata = isGroupMsg ? await devn.groupMetadata(from) : ''
    let groupName = isGroupMsg ? groupMetadata.subject : ''
    let groupId = isGroupMsg ? groupMetadata.id : ''
    let groupMembers = isGroupMsg ? groupMetadata.participants : ''
    let getGroupAdmins = (participants) => {
      admins = []
      for (let i of participants) {
        i.isAdmin ? admins.push(i.jid) : ''
      }
      return admins
    }
    let groupAdmins = isGroupMsg ? getGroupAdmins(groupMembers) : ''
    let isBotGroupAdmins = groupAdmins.includes(botNumber) || false
    let isGroupAdmins = groupAdmins.includes(sender) || false
    let isNsfw = isGroupMsg ? nsfw.includes(groupId) : false

    global.buffer = fetcher.getBuffer
    data = {
      msg: msg,
      type: type,
      from,
      devn: devn,
      content,
      args,
      text
    }

    require('./../lib/attr')(data)

    let isUrl = (url) => {
      return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
    }

    global.pushname = devn.contacts[sender] != undefined ? devn.contacts[sender].vname || devn.contacts[sender].notify : undefined
                // Serial Number Generator
            function GenerateRandomNumber(min,max){
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            // Generates a random alphanumberic character
            function GenerateRandomChar() {
                var chars = "1234567890ABCDEFGIJKLMNOPQRSTUVWXYZ";
                var randomNumber = GenerateRandomNumber(0,chars.length - 1);
                return chars[randomNumber];
            }
            function GenerateSerialNumber(mask){
            var serialNumber = "";
            if(mask != null){
                for(var i=0; i < mask.length; i++){
                    var maskChar = mask[i];
                    serialNumber += maskChar == "0" ? GenerateRandomChar() : maskChar;
                }
            }
            return serialNumber;
             }
            function convertToRupiah(angka)
             {
            var rupiah = '';        
            var angkarev = angka.toString().split('').reverse().join('');
            for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
            return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
             }
    
            //Deklarasi const
              const kutuk = [
            'Sapi',
            'Batu',
            'Babi',
            'Anak soleh dan soleha',
            'pohon pisang',
            'janda',
            'bangsat',
            'buaya',
            'Jangkrik',
            'Kambbiingg',
            'Bajing',
            'kang seblak',
            'kang gorengan',
            'kang siomay',
            'badut ancol',
            'Tai',
            'Kebo',
            'Badak biar Asli',
            'tai kotok',
            'Bwebwek',
            'Orang Suksesss...... tapi boong',
            'Beban Keluarga' //tambahin  aja
            ]

            const seorang = [
            'Polisi',
            'tentara',
            'malink',
            'pegawai',
            'Pendiri indomie',
            'programmer',
            'Chef',
            'Pelaut',
            'Pembajak sawah',
            'Arsitek',
            'Wirausaha',
            'Perakit pc',
            'Kang ngaji',
            'Kang sodakoh'
            ]

            const statuss = [
            'Jomblo',
            'Pacaran',
            'Single',
            'Janda',
            'Duda'
            ]

            const makanan = [
            'Ayam',
            'Sate',
            'Soto',
            'Indomie',
            'Supermie',
            'Popmie',
            'Samyang',
            'Rendang',
            'Telor',
            ]
            const ownerNumber = '6282126688740@s.whatsapp.net'
            const isOwner = ownerNumber.includes(sender)
            const SN = GenerateSerialNumber("000000000000000000000000")
            const moment = require('moment-timezone')
            const Math_js = require('mathjs')
            const ms = require('parse-ms')
            const toMs = require('ms')
            const addReminder = (userId, message, time) => {
            const obj = { id: userId, msg: message, time: Date.now() + toMs(time) }
            db.push('REMINDER', obj)
        }
            const sleep = async (ms) => {
             return new Promise(resolve => setTimeout(resolve, ms));
            }
            //moment.tz.setDefault('Asia/Jakarta').locale('id')
            //const time = moment(t * 1000).format('DD/MM HH:mm:ss')
            
            //SALDO
            //const userr = args[1] + (`Saldo_${userr.replace('@s.whatsapp.net', '')}.saldo`)
            const addSaldo = (user, amount) => {
                db.add(`Saldo_${user.replace('@s.whatsapp.net', '')}.saldo`, amount)
            }
            const minSaldo = (user, amount) => {
                db.subtract(`Saldo_${user.replace('@s.whatsapp.net', '')}.saldo`, amount)
            }
            //const userr = msg.message.extendedTextMessage.contextInfo.mentionedJid || args[0] + '@s.whatsapp.net'
            const tabungSaldo = (user, amount) => {
                db.add(`Saldo_1${user.replace('@s.whatsapp.net', '')}.saldo`, amount)
            }
            const ambilSaldo = (user, amount) => {
                db.subtract(`Saldo_1${user.replace('@s.whatsapp.net', '')}.saldo`, amount)
            }
            const getSaldo = (user) => {
                db.get(`Saldo_${sender.replace('@s.whatsapp.net', '')}.saldo`)
                .then(async(uh) => {
                    const saldonya = uh.saldo
                })
            }
            const afkJs = (user, string) => {
                db.push(`afk_${user.replace('@s.whatsapp.net', '')}.saldo`, string)
            }
// //End of const
        db.get('AUTORES').then(async(ak) => {
            for (let i = 0; i < ak.length; i++){
                const mes = ak[i].message
                const ress = ak[i].response
                const kntk = ak[i].semder
                if(chats === mes && msg.participant === kntk){
                    devn.reply(ress)
                }
            }
        })
      db.get('afk').then(async(as) => {
            for (let i = 0; i < as.length; i++){
                const afk = as[i].ygafk
                const resp = as[i].alasan
                const cht = as[i].gc
                const waktos = as[i].waktu
                if(chats === `@${afk}`){
                    //devn.sendMessage(from, `SSSTT, @${afk.split('@')[0]} sedang AFK dengan alasan ${resp}`, text, {quoted: msg, contextInfo: {mentionedJid:[afk.replace("c.us", "s.whatsapp.net")]}})
                    devn.reply(`SSSTT, @${afk} sedang AFK dengan alasan ${resp} sejak : ${waktos}`)
                }
            }
        })
        const guild = groupId.replace('@g.us', '')

tgam.get(`gambar_${guild}`).then(async(res) => {
  if(res.jawaban !== null){ 
    if(chats.toLowerCase() === res.jawaban.toLowerCase()){
      gam.set(`gambar_${guild}.sesi`, false)
      devn.reply(`*「 Tebak Gambar 」*\n\nSelamat kamu benar kak\n\nJawaban : *${res.jawaban}*\n\nReward Rp. 10.000 otomatis ditambahkan ke saldo kamu :v`)
      tgam.set(`gambar_${guild}.jawaban`, null)
      addSaldo(sender, 10000)
      //tambahkan add saldo kalo mau
    }
  }
}).catch(async() => {
tgam.set(`gambar_${guild}.sesi`, false)
await sleep(250)
tgam.set(`gambar_${guild}.jawaban`, null)
})
    let isMedia = type === "imageMessage" || type === "videoMessage"
    let isQuotedImage = type === "extendedTextMessage" && content.includes("imageMessage")
    let isQuotedVideo = type === "extendedTextMessage" && content.includes("videoMessage")
    let isQuotedAudio = type === "extendedTextMessage" && content.includes("audioMessage")
    let isQuotedSticker = type === "extendedTextMessage" && content.includes("stickerMessage")
    if (isCmd && isGroupMsg) console.log('[devn]', body, 'from', sender.split('@')[0], 'args :', args.length)
    if (!isGroupMsg && isCmd) console.log('[devn]', body, 'from', sender.split('@')[0], 'args :', args.length)
    if (!isCmd) addSaldo(sender, Number(10))
    switch(command) {
      case 'menu':
      case 'help':
      case '?':
        User.findOne({nowa: sender.replace('@s.whatsapp.net', '')}).then(async(ak) => {
        if(ak === undefined || ak === null) return devn.reply(`Sepertinya nomor kakak belum terdaftar di database...\n\nSilahkan daftar di https://asuna-login.herokuapp.com/ \n\n*Catatan : untuk pengisian Nomor Whatsapp menggunakan awalan 62,bukan 08,seperti 62821xxx*\n_Dan untuk password bebas,yang penting ingat!_`)
        else {
      devn.reply(help(prefix))
        }
        })
      break
      case 'tebakgambar':{
  //pengecualian login
  User.findOne({nowa: sender.replace('@s.whatsapp.net', '')}).then(async(ak) => {
        if(ak === undefined || ak === null) return devn.reply(`Sepertinya nomor kakak belum terdaftar di database...\n\nSilahkan daftar di https://asuna-login.herokuapp.com/ \n\n*Catatan : untuk pengisian Nomor Whatsapp menggunakan awalan 62,bukan 08,seperti 62821xxx*\n_Dan untuk password bebas,yang penting ingat!_`)
  })
  if (!isGroupMsg) return devn.reply(mess.onlyGroup())
  const gambar = fs.readFileSync('./lib/tgambar.json')
  const json = JSON.parse(gambar)
  const index = Math.floor(Math.random() * json.length)
  const tebakan = json[index]
  const jawaban = tebakan.teks
  const gmbr = tebakan.image
  tgam.get(`gambar_${guild}`).then(async(t) => {
    if(t.sesi === true) return devn.reply('Soal belum terjawab')
    tgam.set(`gambar_${guild}.sesi`, true)
    await sleep(500)
    tgam.set(`gambar_${guild}.jawaban`, jawaban)
    devn.sendMessage(from, read(tebakan.image), image, {caption: `*_Silahkan Jawab Maksud dari Gambar ini kak :)_*\n\n// _Reward 10k saldo setiap jawaban benar_\nTimeout 40 detik`})
    sleep(500)
    setTimeout(function() {
      try{
      tgam.get(`gambar_${guild}`).then(async(res) => {
        const tek = `Waktu habis..\nJawabannya adalah..\n\n- *${res.jawaban}*\n\nKetik !tebakgambar untuk melihat soal selanjutnya :)`
        if(res.jawaban === null) return
        devn.reply(tek)
        tgam.set(`gambar_${guild}.jawaban`, null)
        await sleep(500)
        tgam.set(`gambar_${guild}.sesi`, false)
      })
      }catch(E){
        console.log(E)
      }
    }, 40000);
  }).catch(async() => {
    tgam.set(`gambar_${guild}.sesi`, true)
    await sleep(500)
    tgam.set(`gambar_${guild}.jawaban`, jawaban)
    devn.sendMessage(from, read(tebakan.image), image, {caption: `*_Silahkan Jawab Maksud dari Gambar ini kak :)_*\n\n// _Reward 10k saldo setiap jawaban benar_\nTimeout 40 detik`})
  })
}
break

      case 'afk':
        if(!isGroupMsg) return devn.reply('group only!')
      User.findOne({nowa: sender.replace('@s.whatsapp.net', '')}).then(async(ak) => {
        if(ak === undefined || ak === null) return devn.reply(`Sepertinya nomor kakak belum terdaftar di database...\n\nSilahkan daftar di https://asuna-login.herokuapp.com/ \n\n*Catatan : untuk pengisian Nomor Whatsapp menggunakan awalan 62,bukan 08,seperti 62821xxx*\n_Dan untuk password bebas,yang penting ingat!_`)
        else {
            const timenow = moment(moment()).format('HH:mm:ss')
            moment.tz.setDefault('Asia/Jakarta').locale('id')
            const ygafk = ({
            ygafk: sender,
            alasan: body,
            gc: from,
            waktu : timenow
        })
            db.push('afk', ygafk)
            devn.reply("```" + `${pushname} [@${sender.split('@')[0]}] sedang AFK\n\nAlasan: ${body}\nTime: ${timenow}` + "```")
                  }})  
        break
        
        case  `reminder`:
            if (args.length === 0) return devn.reply(`Untuk Membuat pengingat pada bot. Penggunaan: !reminder 10s | pesan_pengingat\n*Note*\ns untuk detik\nm untuk menit\nh untuk jam`)
            const q = args.join(' ')
            if (!q.includes('|')) return devn.reply(`Wrong Format!` )
            //const timeRemind = args[0]
            const timeRemind = q.substring(0, q.indexOf('|') - 1)
            const messRemind = q.substring(q.lastIndexOf('|') + 2)
            db.get('REMINDER').then(async(cc) => {
              const getReminderTime = cc.time
              const getReminderMsg = cc.msg
            // const remind = body.trim().split('|')
            // const timeRemind = remind[1]
            // const messRemind = remind[2]
            const parsedTime = ms(toMs(timeRemind))
            addReminder(sender, messRemind, timeRemind)
                sleep(300)
            await devn.reply(`*「 REMINDER 」*\n\nReminder diaktifkan!\n\n➸ *Pesan*: ${messRemind}\n➸ *Durasi*: ${parsedTime.hours} jam ${parsedTime.minutes} menit ${parsedTime.seconds} detik\n➸ *Untuk*: @${sender}`)
            const intervRemind = setInterval(async () => {
                 if (Date.now() > getReminderTime) {
                     await devn.reply(`⏰ *「 REMINDER 」* ⏰\n\nAkhirnya tepat waktu~ @${sender}\n\n➸ *Pesan*: ${getReminderMsg}`)
                     db.delete('REMINDER', obj)
                     clearInterval(intervRemind)
                    }
                }, 1000)
            })
            break
        
         case 'lapor':
        User.findOne({nowa: sender.replace('@s.whatsapp.net', '')}).then(async(ak) => {
        if(ak === undefined || ak === null) return devn.reply(`Sepertinya nomor kakak belum terdaftar di database...\n\nSilahkan daftar di https://asuna-login.herokuapp.com/ \n\n*Catatan : untuk pengisian Nomor Whatsapp menggunakan awalan 62,bukan 08,seperti 62821xxx*\n_Dan untuk password bebas,yang penting ingat!_`)
        else {
         if(args.length == 0)return devn.reply('Lapor sesuatu pada Developer! Usage : *!lapor [text]*\n\n Contoh : !lapor Bot ada bug pada fitur Hentai')
         const lpr = body.slice(6)
         devn.sendMessage(ownerNumber, `Lapor : ${lpr}\n\n From : ${sender}`, text)
         devn.reply(`*Baik, laporan anda telah diterima dengan laporan ${lpr} pada jam ${moment(moment()).format('HH:mm:ss')}\n\nLaporan sudah tersampaikan ke Developer,mohon menunggu tindak lanjutnya!*`)
         }
})
         break
 case 'mtk':
         User.findOne({nowa: sender.replace('@s.whatsapp.net', '')}).then(async(ak) => {
         if(ak === undefined || ak === null) { return devn.reply(`Sepertinya nomor kakak belum terdaftar di database...\n\nSilahkan daftar di https://asuna-login.herokuapp.com/ \n\n*Catatan : untuk pengisian Nomor Whatsapp menggunakan awalan 62,bukan 08,seperti 62821xxx*\n_Dan untuk password bebas,yang penting ingat!_`)
                                             }else {
                                               try{
         if (args.length == 0) return devn.reply('[❗] Kirim perintah *!mtk [ Angka ]*\nContoh : !mtk 12*12\n*NOTE* :\n- Untuk Perkalian Menggunakan *\n- Untuk Pertambahan Menggunakan +\n- Untuk Pengurangan Mennggunakan -\n- Untuk Pembagian Menggunakan /')
                     const mtk = body.slice(5)
                     if (typeof Math_js.evaluate(mtk) !== "number") {
                         devn.reply(`"${mtk}", bukan angka!\n[❗] Kirim perintah *!mtk [ Angka ]*\nContoh : !mtk 12*12\n*NOTE* :\n- Untuk Perkalian Menggunakan *\n- Untuk Pertambahan Menggunakan +\n- Untuk Pengurangan Mennggunakan -\n- Untuk Pembagian Menggunakan /`)
                     } else {
                         devn.reply(`*「 MATH 」*\n\n*Hasil :*\n${mtk} = ${Math_js.evaluate(mtk)}`)
                     }
                                             } catch(kn) {
                          devn.reply(kn)
                          }                   }
         })
                     break
        
      //SALDO SECTION
        case `saldo`:
            moment.tz.setDefault('Asia/Jakarta').locale('id')
             db.get(`Saldo_${sender.replace('@s.whatsapp.net', '')}`)
            .then(async(agh) => {
            const saldony3 = agh.saldo
                if(agh.saldo == undefined || agh.saldo == null){
                    devn.reply(`Kamu belum memiliki saldo`)
                   addSaldo(sender, Number(0))
                } 
            devn.reply(`*Halo kak:) Nih kak saldo kakak*\n\n=========================\nRekening bank : ${convertToRupiah(saldony3)}\n\nUang didompet : ${convertToRupiah(saldony3)}\n\n=========================\n\n*Melakukan pengecekan pada : ${moment(moment()).format('HH:mm:ss')}* \n\n=========================\n*Nota* : ${SN}`)
        })
                break
          
        case `gift`:
                if(args.length === 0) return devn.reply(`Memberi! Usage: ${prefix}gift @user [Amount]`)
            db.get(`Saldo_${sender.replace('@s.whatsapp.net', '')}`)
            .then(async(mehh) => {
            const saldonya3 = mehh.saldo
                if(args[1] >  saldonya3) return devn.reply(`Uang didompetmu kurang dari ${convertToRupiah(args[1])}, Silahkan ambil di rekening kalo ada LOL:V`)
                    if(isNaN(args[1])) return devn.reply(`Harus angka sayang`)
                    addSaldo(args[0], Number(args[1]))
                    devn.reply(`*Nih kak struk dari transfer duit!*\n\n=========================\n*Saldo ditransfer :* ${convertToRupiah(args[1])}\n\n*Sisa saldo Didompet :* ${convertToRupiah(saldonya3)}\n\n=========================\n\n*Melakukan pengecekan pada : ${moment(moment()).format('HH:mm:ss')}* \n\n nota : ${SN}`)
                    minSaldo(sender, Number(args[1]))
                })
                break
          
      //OWNER SECTION
      case `dompet`:
        User.findOne({nowa: sender.replace('@s.whatsapp.net', '')}).then(async(ak) => {
        if(ak === undefined || ak === null) { return devn.reply(`Sepertinya nomor kakak belum terdaftar di database...\n\nSilahkan daftar di https://asuna-login.herokuapp.com/ \n\n*Catatan : untuk pengisian Nomor Whatsapp menggunakan awalan 62,bukan 08,seperti 62821xxx*\n_Dan untuk password bebas,yang penting ingat!_`)
                                            }else {
        if(!isOwner) return devn.reply(`Khusus Owner!`)
                try{
                    if(args[0] === 'add'){
                    if(isNaN(args[1])) return devn.reply(`Harus angka sayang`)
                    addSaldo(sender, Number(args[1]))
                    devn.reply(`Berhasil menambahkan Rp. ${args[1]} ke saldo`)
                }else if(args[0] === 'min'){
                    if(isNaN(args[1])) return devn.reply(`Harus angka sayang`)
                    minSaldo(sender, Number(args[1]))
                    devn.reply(`Saldo dikurangi sebesar Rp. ${args[1]}`)
                }
                }catch(mmek){
                    console.log(mmek)
                }
                                            }
          })
                break
          
      case 'eval':
      if(!isOwner) return devn.reply('Developer Only!')
      const evz = body.slice(6)
                if(!evz) return await devn.reply('Format Salah!')
                    try{
                        let evaled = await eval(evz)
                        if (typeof evaled !== 'string')
                            evaled = require('util').inspect(evaled)
                            await devn.reply(evaled)
                    } catch (err) {
                    devn.reply(`Error! ${err}`)
                }
                    break
      //END OF OWNER SECTION
      
      case 'tot' :
        User.findOne({nowa: sender.replace('@s.whatsapp.net', '')}).then(async(ak) => {
        if(ak === undefined || ak === null) {return devn.reply(`Sepertinya nomor kakak belum terdaftar di database...\n\nSilahkan daftar di https://asuna-login.herokuapp.com/ \n\n*Catatan : untuk pengisian Nomor Whatsapp menggunakan awalan 62,bukan 08,seperti 62821xxx*\n_Dan untuk password bebas,yang penting ingat!_`)
                                            }else {
        if (args.length == 0) return devn.reply(`This or That! Penggunaan : ${prefix}tot This | That\n\nContoh: ${prefix}tot Baju | celana`)
            const q2 = args.join(' ')
            const thiss = q2.substring(0, q2.indexOf('|') - 1)
            const thatt = q2.substring(q2.lastIndexOf('|') + 2)
            if (!q2.includes('|')) return devn.reply(`Wrong Format!`)
            const makanan1 = makanan[Math.floor(Math.random() * makanan.length)];
            const num11 = Math.floor(Math.random() * 10)
            const num22 = Math.floor(Math.random() * 10)
            const jwb = kutuk[Math.floor(Math.random() * kutuk.length)]
            const jwb1 = seorang[Math.floor(Math.random() * seorang.length)]
            const jwb2 = statuss[Math.floor(Math.random() * statuss.length)]
            if(num11 > num22) {
            var tek1 = `Saya memilih ${thiss} karena dia ${jwb}\ndan juga dia adalah seorang ${jwb1}\nNah dia juga berstatus ${jwb2}\nDia suka makanan ${makanan1}`
        }else if(num11 < num22) {
            var tek1 = `Saya memilih ${thatt} karena dia ${jwb}\ndan juga dia adalah seorang ${jwb1}\nNah dia juga berstatus ${jwb2}\nDia suka makanan ${makanan1}`
        }else if(num11 === num22){
            var tek1 = `Saya tidak bisa memilih ><`
        }
        devn.reply(tek1)
        }
        })
        break
        
      case `autores`:
        User.findOne({nowa: sender.replace('@s.whatsapp.net', '')}).then(async(ak) => {
        if(ak === undefined || ak === null) {return devn.reply(`Sepertinya nomor kakak belum terdaftar di database...\n\nSilahkan daftar di https://asuna-login.herokuapp.com/ \n\n*Catatan : untuk pengisian Nomor Whatsapp menggunakan awalan 62,bukan 08,seperti 62821xxx*\n_Dan untuk password bebas,yang penting ingat!_`)
                                            }else {
        if(args.length === 0) return devn.reply(from, `Membuat autores! Biaya: 100.000\n\n *${prefix}autores message | respon*`)
        db.get(`Saldo_${sender.replace('@s.whatsapp.net', '')}`)
            .then(async(cc) => {
            const saldonya34 = cc.saldo
                if(100000 > saldonya34) return devn.reply(`Uang didompetmu kurang dari ${convertToRupiah(100000)}, Silahkan ambil di rekening kalo ada LOL:V`)
        const qi = args.join(' ')
        const mezz = qi.substring(0, qi.indexOf('|') - 1)
        const respp = qi.substring(qi.lastIndexOf('|') + 2)
        const mes = ({
            message: mezz,
            response: respp,
            semder: sender
        })
        db.push('AUTORES', mes)
        devn.reply(`Auto respon berhasil dimasukkan ke database!\n\nMessage : *${mezz}*\nRespon : *${respp}*\n`)
          })
                                              minSaldo(sender,100000)
                                            }
          })
        break
          
      case 'infogempa':
          User.findOne({nowa: sender.replace('@s.whatsapp.net', '')}).then(async(ak) => {
        if(ak === undefined || ak === null) {return devn.reply(`Sepertinya nomor kakak belum terdaftar di database...\n\nSilahkan daftar di https://asuna-login.herokuapp.com/ \n\n*Catatan : untuk pengisian Nomor Whatsapp menggunakan awalan 62,bukan 08,seperti 62821xxx*\n_Dan untuk password bebas,yang penting ingat!_`)
                                            }else {
        devn.reply(mess.wait())
        gempa.result()
          .then(async (res) => {
            buf = await buffer(res.thumbnail)
            devn.sendButtonImg(from, buf,`╭﹝🄸🄽🄵🄾🄶🄴🄼🄿🄰﹞\n├ Waktu : ${res.waktu}\n├ Magnitude : ${res.magnitude}\n├ Koordinat : ${res.koordinat}\n├ Lokasi : ${res.lokasi}\n├ Dirasakan : ${res.dirasakan}\n╰────────`, "© Bot", [
              {
                buttonId: `${prefix}menu`,
                buttonText: {
                  displayText: '🔙 Back to menu',
                },
                type: 1,
              },
            ], { quoted: msg })
          })
                                            }
          })
      break
            
      case 'wiki':
            User.findOne({nowa: sender.replace('@s.whatsapp.net', '')}).then(async(ak) => {
        if(ak === undefined || ak === null) {return devn.reply(`Sepertinya nomor kakak belum terdaftar di database...\n\nSilahkan daftar di https://asuna-login.herokuapp.com/ \n\n*Catatan : untuk pengisian Nomor Whatsapp menggunakan awalan 62,bukan 08,seperti 62821xxx*\n_Dan untuk password bebas,yang penting ingat!_`)
                                            }else {
        if (args.length < 1) return await devn.reply(mess.needQuery())
        devn.reply(mess.wait())
        wikiID.result(q)
          .then(async (res) => {
            devn.sendButton(from, `╭﹝🅆🄸🄺🄸🄿🄴🄳🄸🄰﹞\n├ Judul : ${res.title}\n├ URL : ${res.url}\n├ Penerbit : ${res.publisher}\n├ Tanggal Diterbitkan : ${res.datePublished}\n├ Konteks : ${res.context}\n╰────────`, "© Bot", [
              {
                buttonId: `${prefix}menu`,
                buttonText: {
                  displayText: '🔙 Back to menu',
                },
                type: 1,
              },
            ], { quoted: msg })
          })
                                            }
            })
      break
          
      case 'wikien':
              User.findOne({nowa: sender.replace('@s.whatsapp.net', '')}).then(async(ak) => {
        if(ak === undefined || ak === null) {return devn.reply(`Sepertinya nomor kakak belum terdaftar di database...\n\nSilahkan daftar di https://asuna-login.herokuapp.com/ \n\n*Catatan : untuk pengisian Nomor Whatsapp menggunakan awalan 62,bukan 08,seperti 62821xxx*\n_Dan untuk password bebas,yang penting ingat!_`)
                                            }else {
        if (args.length < 1) return await devn.reply(mess.needQuery())
        devn.reply(mess.wait())
        wikiEN.result(q)
          .then(async (res) => {
            devn.sendButton(from, `╭﹝🅆🄸🄺🄸🄿🄴🄳🄸🄰﹞\n├ Title : ${res.title}\n├ URL : ${res.url}\n├ Publisher : ${res.publisher}\n├ Date Published : ${res.datePublished}\n├ Context : ${res.context}\n╰────────`, "© Bot", [
              {
                buttonId: `${prefix}menu`,
                buttonText: {
                  displayText: '🔙 Back to menu',
                },
                type: 1,
              },
            ], { quoted: msg })
          })
                                            }
          })
      break
          
      case 'nekonime':
                User.findOne({nowa: sender.replace('@s.whatsapp.net', '')}).then(async(ak) => {
        if(ak === undefined || ak === null) {return devn.reply(`Sepertinya nomor kakak belum terdaftar di database...\n\nSilahkan daftar di https://asuna-login.herokuapp.com/ \n\n*Catatan : untuk pengisian Nomor Whatsapp menggunakan awalan 62,bukan 08,seperti 62821xxx*\n_Dan untuk password bebas,yang penting ingat!_`)
                                            }else {
        devn.reply(mess.wait())
        nekonime.result()
          .then(async (res) => {
            buf = await buffer(res.image)
            devn.sendButtonImg(from, buf, mess.done(), "© Bot", [
              {
                buttonId: `${prefix}nekonime`,
                buttonText: {
                  displayText: '➡️ Next',
                },
                type: 1,
              },
              {
                buttonId: `${prefix}menu`,
                buttonText: {
                  displayText: '🔙 Back to menu',
                },
                type: 1,
              },
            ], { quoted: msg })
          })
                                            }
          })
      break

        case 'nsfwanime':
                  User.findOne({nowa: sender.replace('@s.whatsapp.net', '')}).then(async(ak) => {
        if(ak === undefined || ak === null) {return devn.reply(`Sepertinya nomor kakak belum terdaftar di database...\n\nSilahkan daftar di https://asuna-login.herokuapp.com/ \n\n*Catatan : untuk pengisian Nomor Whatsapp menggunakan awalan 62,bukan 08,seperti 62821xxx*\n_Dan untuk password bebas,yang penting ingat!_`)
                                            }else {
        if (isGroupMsg) {
          if (!allow.nsfw) return devn.sendButtonLoc(from, read('./lib/fbi.jpg'), mess.notAllowed(), "© Bot", [
            {
              buttonId: `${prefix}menu`,
              buttonText: {
                displayText: '🔙 Back to menu',
              },
              type: 1,
            },
          ], { quoted: msg })
          if (!isNsfw) return devn.sendButton(from, mess.nsfwOff(), "© Bot", [
            {
              buttonId: `${prefix}enable nsfw`,
              buttonText: {
                displayText: '🔛 Enable nsfw',
              },
              type: 1,
            },
            {
              buttonId: `${prefix}menu`,
              buttonText: {
                displayText: '🔙 Back to menu',
              },
              type: 1,
            },
          ], { quoted: msg })
          devn.reply(mess.wait())
          nsfwanime.result()
            .then(async (res) => {
              buf = await buffer(res.image)
              devn.sendButtonImg(from, buf, mess.done(), "© Bot", [
                {
                  buttonId: `${prefix}nsfwanime`,
                  buttonText: {
                    displayText: '➡️ Next',
                  },
                  type: 1,
                },
                {
                  buttonId: `${prefix}menu`,
                  buttonText: {
                    displayText: '🔙 Back to menu',
                  },
                  type: 1,
                },
              ], { quoted: msg })
            })
        } else {
          if (!allow.nsfw) return devn.sendButtonLoc(from, read('./lib/fbi.jpg'), mess.notAllowed(), "© Bot", [
            {
              buttonId: `${prefix}enable nsfw`,
              buttonText: {
                displayText: '🔛 Enable nsfw',
              },
              type: 1,
            },
            {
              buttonId: `${prefix}menu`,
              buttonText: {
                displayText: '🔙 Back to menu',
              },
              type: 1,
            },
          ], { quoted: msg })
          devn.reply(mess.wait())
          nsfwanime.result()
            .then(async (res) => {
              buf = await buffer(res.image)
              devn.sendButtonImg(from, buf, mess.done(), "© Bot", [
                {
                  buttonId: `${prefix}nsfwanime`,
                  buttonText: {
                    displayText: '➡️ Next',
                  },
                  type: 1,
                },
                {
                  buttonId: `${prefix}menu`,
                  buttonText: {
                    displayText: '🔙 Back to menu',
                  },
                  type: 1,
                },
              ], { quoted: msg })
            })
        }
                                            }
          })
      break
      case 'play' :
                            User.findOne({nowa: sender.replace('@s.whatsapp.net', '')}).then(async(ak) => {
        if(ak === undefined || ak === null) {return devn.reply(`Sepertinya nomor kakak belum terdaftar di database...\n\nSilahkan daftar di https://asuna-login.herokuapp.com/ \n\n*Catatan : untuk pengisian Nomor Whatsapp menggunakan awalan 62,bukan 08,seperti 62821xxx*\n_Dan untuk password bebas,yang penting ingat!_`)
                                            }else {
                                              try{
        if(args.length == 0) return devn.reply(`Kirim perintah *.play [ link ]*\nContoh : .play Asuna`)
                devn.reply(mess.wait())
                const res = await axios.get(`https://splapi.herokuapp.com/api/yt/playmp3?query=${body.slice(5)}&apikey=kris`)
                if(res.status == false) devn.reply(res.data.message)
                //const ytm = res.data.result
                const teks = `*Data berhasil didapatkan!*\n\n*Judul* : ${res.data.title}\n*Source* : ${res.data.channel}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                //if(Number(ytm.size.split(' MB')[0]) >= 50.00) return Client.sendFileFromUrl(data.from, `${res.data.thumb}`, 'thumb.jpg', `*Data Berhasil Didapatkan!*\n\n*Title* : ${res.data.title}\n*Ext* : mp3\n*Source* : ${res.data.channel}\n*Link* : ${res.data.url}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_`, data.message)
                //devn.sendImage(from, ytm.thumb, teks, true)
                //devn.sendFileFromUrl(from, ytm.thumb, 'thumb.jpg', teks, data.message)
                devn.sendFileFromUrl(from, res.data.link, 'audio', null, true)
            } catch {
                devn.reply('Ups! Terjadi kesalahan yang tidak terduga')
            }
                            }
                            })
      case 'ytmp3':
                    User.findOne({nowa: sender.replace('@s.whatsapp.net', '')}).then(async(ak) => {
        if(ak === undefined || ak === null) {return devn.reply(`Sepertinya nomor kakak belum terdaftar di database...\n\nSilahkan daftar di https://asuna-login.herokuapp.com/ \n\n*Catatan : untuk pengisian Nomor Whatsapp menggunakan awalan 62,bukan 08,seperti 62821xxx*\n_Dan untuk password bebas,yang penting ingat!_`)
                                            }else {
        if (args.length < 1) return devn.reply(mess.needLink())
        if (!isUrl(args[0]) && !args[0].includes('youtu')) return devn.reply(mess.invalidLink())
        devn.reply(mess.wait())
        ytmp3.result(q).then(async (res) => {
          var title = res[0].judul
          var quality = res[0].quality
          var type = res[0].tipe
          var size = res[0].size
          //if (size < global.messConf.maxFileSize) {
            devn.sendImage(from, res[0].thumb, mess.yt3res(title, quality, type, size), true)
            devn.sendFileFromUrl(from, res[0].link, 'audio', null, true)
          /*} else {
            var link = res[0].link
            devn.reply(mess.sizeMax(link))
          }*/
        })
                                            }
        })
      break
    
      case 'enable':
        if (!isGroupMsg) return devn.reply(mess.onlyGroup())
        if (args.length < 1) return devn.reply(mess.needQuery())
        switch(args[0]) {
          case 'nsfw':
            if (isNsfw) return devn.reply(mess.nsfwHasOn())
            nsfw.push(groupId, 1)
            write('./database/nsfw.json', JSON.stringify(nsfw))
            devn.reply(mess.done())
          break
        }
      break
      case 'disable':
        if (!isGroupMsg) return devn.reply(mess.onlyGroup())
        if (args.length < 1) return devn.reply(mess.needQuery())
        switch(args[0]) {
          case 'nsfw':
            nsfw.splice(groupId, 1)
            write('./database/nsfw.json', JSON.stringify(nsfw))
            devn.reply(mess.done())
          break
        }
      break
    
      case 'artinama':
                      User.findOne({nowa: sender.replace('@s.whatsapp.net', '')}).then(async(ak) => {
        if(ak === undefined || ak === null) {return devn.reply(`Sepertinya nomor kakak belum terdaftar di database...\n\nSilahkan daftar di https://asuna-login.herokuapp.com/ \n\n*Catatan : untuk pengisian Nomor Whatsapp menggunakan awalan 62,bukan 08,seperti 62821xxx*\n_Dan untuk password bebas,yang penting ingat!_`)
                                            }else {
        if (args.length < 1) return devn.reply(mess.needQuery() + `\nExample: ${prefix}${command} Nazwa`)
        artiNama.result(q)
          .then(async (res) => {
            devn.reply(res.result)
          })
                                            }
    })
      break
                        
      case 'artimimpi':
                        User.findOne({nowa: sender.replace('@s.whatsapp.net', '')}).then(async(ak) => {
        if(ak === undefined || ak === null) {return devn.reply(`Sepertinya nomor kakak belum terdaftar di database...\n\nSilahkan daftar di https://asuna-login.herokuapp.com/ \n\n*Catatan : untuk pengisian Nomor Whatsapp menggunakan awalan 62,bukan 08,seperti 62821xxx*\n_Dan untuk password bebas,yang penting ingat!_`)
                                            }else {
        if (args.length < 1) return devn.reply(mess.needQuery() + `\nExample: ${prefix}${command} jatuh`)
        artiMimpi.result(q)
          .then(async (res) => {
            devn.reply(res.result)
          })
        }
  })
      break
                          
      case 'haribaik':
                       User.findOne({nowa: sender.replace('@s.whatsapp.net', '')}).then(async(ak) => {
        if(ak === undefined || ak === null) {return devn.reply(`Sepertinya nomor kakak belum terdaftar di database...\n\nSilahkan daftar di https://asuna-login.herokuapp.com/ \n\n*Catatan : untuk pengisian Nomor Whatsapp menggunakan awalan 62,bukan 08,seperti 62821xxx*\n_Dan untuk password bebas,yang penting ingat!_`)
                                            }else {
        if (args.length < 1) return devn.reply(mess.needQuery() + `\nExample: ${prefix}${command} 14-4-2004`)
        hariBaik.result(q)
          .then(async (res) => {
            devn.reply(res.result)
          })
                                            }
          })
      break
                         
      case 'harilarangan':
          User.findOne({nowa: sender.replace('@s.whatsapp.net', '')}).then(async(ak) => {
        if(ak === undefined || ak === null) {return devn.reply(`Sepertinya nomor kakak belum terdaftar di database...\n\nSilahkan daftar di https://asuna-login.herokuapp.com/ \n\n*Catatan : untuk pengisian Nomor Whatsapp menggunakan awalan 62,bukan 08,seperti 62821xxx*\n_Dan untuk password bebas,yang penting ingat!_`)
                                            }else {
        if (args.length < 1) return devn.reply(mess.needQuery() + `\nExample: ${prefix}${command} 14-4-2004`)
        hariLarangan.result(q)
          .then(async (res) => {
            devn.reply(res.result)
          })
                                            }
          })
      break
            
      case 'kecocokannama':
          User.findOne({nowa: sender.replace('@s.whatsapp.net', '')}).then(async(ak) => {
        if(ak === undefined || ak === null) {return devn.reply(`Sepertinya nomor kakak belum terdaftar di database...\n\nSilahkan daftar di https://asuna-login.herokuapp.com/ \n\n*Catatan : untuk pengisian Nomor Whatsapp menggunakan awalan 62,bukan 08,seperti 62821xxx*\n_Dan untuk password bebas,yang penting ingat!_`)
                                            }else {
        if (args.length < 1) return devn.reply(mess.needQuery() + `\nExample: ${prefix}${command} Nazwa|14-4-2004`)
        var kn = body.slice(15)
        var nama = kn.split('|')[0]
        var tgl = kn.split('|')[1]
        kecocokanNama.result(nama, tgl)
          .then(async (res) => {
            devn.reply(res.result)
          })
                                            }
          })
      break
            
      case 'ramaljodoh':
          User.findOne({nowa: sender.replace('@s.whatsapp.net', '')}).then(async(ak) => {
        if(ak === undefined || ak === null) {return devn.reply(`Sepertinya nomor kakak belum terdaftar di database...\n\nSilahkan daftar di https://asuna-login.herokuapp.com/ \n\n*Catatan : untuk pengisian Nomor Whatsapp menggunakan awalan 62,bukan 08,seperti 62821xxx*\n_Dan untuk password bebas,yang penting ingat!_`)
                                            }else {
        if (args.length < 1) return devn.reply(mess.needQuery() + `\nExample: ${prefix}${command} Nazwa|Aksa`)
        var rj = body.slice(12)
        var nama1 = rj.split('|')[0]
        var nama2 = rj.split('|')[1]
        ramalJodoh.result(nama1, nama2)
          .then(async (res) => {
            devn.sendImage(from, res.thumbnail, `*Nama anda* : ${res.namaAnda}\n*Nama Pasangan* : ${res.namaPasangan}\n\n*Positif* : ${res.positif}\n\n*Negatif* : ${res.negatif}`, true)
          })
                                            }
          })
      break
            
      case 'ramalanjodoh':
          //User.findOne({nowa: sender.replace('@s.whatsapp.net', '')}).then(async(ak) => {
        //if(ak === undefined || ak === null) {return devn.reply(`Sepertinya nomor kakak belum terdaftar di database...\n\nSilahkan daftar di https://asuna-login.herokuapp.com/ \n\n*Catatan : untuk pengisian Nomor Whatsapp menggunakan awalan 62,bukan 08,seperti 62821xxx*\n_Dan untuk password bebas,yang penting ingat!_`)
                                            //}else {
        //if (args.length < 1) return devn.reply(mess.needQuery() + `\nExample: ${prefix}${command} Nazwa|14-4-2004|Aksa|14-4-2008`)
        //var rj = body.slice(14)
        //var nama1 = rj.split('|')[0]
        //var tgl1 = rj.split('|')[1]
       //var nama2 = rj.split('|')[2]
        //var tgl2 = rj.split('|')[3]
      //ramalanJodoh.result(nama1, tgl1, nama2, tgl2)
          //.then(async (res) => {
            //devn.reply(res.result)
        //})
                                            //}
          //})
devn.reply('503 : SERVICE THERE IS NOT ANY')
      break
            
      case 'rejekiweton':
          User.findOne({nowa: sender.replace('@s.whatsapp.net', '')}).then(async(ak) => {
        if(ak === undefined || ak === null) {return devn.reply(`Sepertinya nomor kakak belum terdaftar di database...\n\nSilahkan daftar di https://asuna-login.herokuapp.com/ \n\n*Catatan : untuk pengisian Nomor Whatsapp menggunakan awalan 62,bukan 08,seperti 62821xxx*\n_Dan untuk password bebas,yang penting ingat!_`)
                                            }else {
        if (args.length < 1) return devn.reply(mess.needQuery() + `\nExample: ${prefix}${command} Nazwa|14-4-2004`)
        rejekiWeton.result(q)
          .then(async (res) => {
            devn.sendImage(from, res.statistik, `Penjelasan: ${res.penjelasan}`, true)
          })
                                            }
          })
      break
            
      case 'tanggaljadian':
          User.findOne({nowa: sender.replace('@s.whatsapp.net', '')}).then(async(ak) => {
        if(ak === undefined || ak === null) {return devn.reply(`Sepertinya nomor kakak belum terdaftar di database...\n\nSilahkan daftar di https://asuna-login.herokuapp.com/ \n\n*Catatan : untuk pengisian Nomor Whatsapp menggunakan awalan 62,bukan 08,seperti 62821xxx*\n_Dan untuk password bebas,yang penting ingat!_`)
                                             }else {
        if (args.length < 1) return devn.reply(mess.needQuery() + `\nExample: ${prefix}${command} 14-4-2004`)
        tanggalJadian.result(q)
          .then(async (res) => {
            devn.reply(res.result)
          })
                                               }
          })
      break
            
      case 'watakartis':
          User.findOne({nowa: sender.replace('@s.whatsapp.net', '')}).then(async(ak) => {
        if(ak === undefined || ak === null) {return devn.reply(`Sepertinya nomor kakak belum terdaftar di database...\n\nSilahkan daftar di https://asuna-login.herokuapp.com/ \n\n*Catatan : untuk pengisian Nomor Whatsapp menggunakan awalan 62,bukan 08,seperti 62821xxx*\n_Dan untuk password bebas,yang penting ingat!_`)
                                            }else {
        if (args.length < 1) return devn.reply(mess.needQuery() + `\nExample: ${prefix}${command} Nazwa|14-4-2004`)
        var wa = body.slice(12)
        var nama = wa.split('|')[0]
        var tgl = wa.split('|')[1]
        watakArtis.result(nama, tgl)
          .then(async (res) => {
            devn.reply(res.result)
          })
                                            }
          })
      break
            
      case 'tiktok':
          User.findOne({nowa: sender.replace('@s.whatsapp.net', '')}).then(async(ak) => {
        if(ak === undefined || ak === null) {return devn.reply(`Sepertinya nomor kakak belum terdaftar di database...\n\nSilahkan daftar di https://asuna-login.herokuapp.com/ \n\n*Catatan : untuk pengisian Nomor Whatsapp menggunakan awalan 62,bukan 08,seperti 62821xxx*\n_Dan untuk password bebas,yang penting ingat!_`)
                                            }else {
        if (args.length < 1) return devn.reply(mess.needLink())
        devn.reply(mess.wait())
        tiktok.musically(q)
          .then(async (res) => {
            devn.sendFileFromUrl(from, res.url_wm, 'video', mess.done(), true)
          })
                                            }
          })
      break
            
      case 'hentai':
        if (isGroupMsg) {
          if (!allow.nsfw) return devn.sendButtonLoc(from, read('./lib/fbi.jpg'), mess.notAllowed(), "© Bot", [
            {
              buttonId: `${prefix}hentai`,
              buttonText: {
                displayText: '➡️ Next',
              },
              type: 1,
            },
            {
              buttonId: `${prefix}menu`,
              buttonText: {
                displayText: '🔙 Back to menu',
              },
              type: 1,
            },
          ], { quoted: msg })
          if (!isNsfw) return devn.sendButton(from, mess.nsfwOff(), "© Bot", [
            {
              buttonId: `${prefix}enable nsfw`,
              buttonText: {
                displayText: '🔛 Enable nsfw',
              },
              type: 1,
            },
            {
              buttonId: `${prefix}menu`,
              buttonText: {
                displayText: '🔙 Back to menu',
              },
              type: 1,
            },
          ], { quoted: msg })
          devn.reply(mess.wait())
          hentai.result()
            .then(async (res) => {
              buf = await buffer(res.image)
              devn.sendButtonImg(from, buf, mess.done(), "© Bot", [
                {
                  buttonId: `${prefix}hentai`,
                  buttonText: {
                    displayText: '➡️ Next',
                  },
                  type: 1,
                },
                {
                  buttonId: `${prefix}menu`,
                  buttonText: {
                    displayText: '🔙 Back to menu',
                  },
                  type: 1,
                },
              ], { quoted: msg })
            })
        } else {
          if (!allow.nsfw) return devn.sendButtonLoc(from, read('./../lib/fbi.jpg'), mess.notAllowed(), "© Bot", [
            {
              buttonId: `${prefix}menu`,
              buttonText: {
                displayText: '🔙 Back to menu',
              },
              type: 1,
            },
          ], { quoted: msg })
          devn.reply(mess.wait())
          hentai.result()
            .then(async (res) => {
              buf = await buffer(res.image)
              devn.sendButtonImg(from, buf, mess.done(), "© Bot", [
                {
                  buttonId: `${prefix}hentai`,
                  buttonText: {
                    displayText: '➡️ Next',
                  },
                  type: 1,
                },
                {
                  buttonId: `${prefix}menu`,
                  buttonText: {
                    displayText: '🔙 Back to menu',
                  },
                  type: 1,
                },
              ], { quoted: msg })
            })
        }
      break
          
      case 'yuri':
        if (isGroupMsg) {
          if (!allow.nsfw) return devn.sendButtonLoc(from, read('./lib/fbi.jpg'), mess.notAllowed(), "© Bot", [
            {
              buttonId: `${prefix}hentai`,
              buttonText: {
                displayText: '➡️ Next',
              },
              type: 1,
            },
            {
              buttonId: `${prefix}menu`,
              buttonText: {
                displayText: '🔙 Back to menu',
              },
              type: 1,
            },
          ], { quoted: msg })
          if (!isNsfw) return devn.sendButton(from, mess.nsfwOff(), "© Bot", [
            {
              buttonId: `${prefix}enable nsfw`,
              buttonText: {
                displayText: '🔛 Enable nsfw',
              },
              type: 1,
            },
            {
              buttonId: `${prefix}menu`,
              buttonText: {
                displayText: '🔙 Back to menu',
              },
              type: 1,
            },
          ], { quoted: msg })
          devn.reply(mess.wait())
          yuri.result()
            .then(async (res) => {
              buf = await buffer(res.image)
              devn.sendButtonImg(from, buf, mess.done(), "© Bot", [
                {
                  buttonId: `${prefix}yuri`,
                  buttonText: {
                    displayText: '➡️ Next',
                  },
                  type: 1,
                },
                {
                  buttonId: `${prefix}menu`,
                  buttonText: {
                    displayText: '🔙 Back to menu',
                  },
                  type: 1,
                },
              ], { quoted: msg })
            })
        } else {
          if (!allow.nsfw) return devn.sendButtonLoc(from, read('./../lib/fbi.jpg'), mess.notAllowed(), "© Bot", [
            {
              buttonId: `${prefix}menu`,
              buttonText: {
                displayText: '🔙 Back to menu',
              },
              type: 1,
            },
          ], { quoted: msg })
          devn.reply(mess.wait())
          yuri.result()
            .then(async (res) => {
              buf = await buffer(res.image)
              devn.sendButtonImg(from, buf, mess.done(), "© Bot", [
                {
                  buttonId: `${prefix}yuri`,
                  buttonText: {
                    displayText: '➡️ Next',
                  },
                  type: 1,
                },
                {
                  buttonId: `${prefix}menu`,
                  buttonText: {
                    displayText: '🔙 Back to menu',
                  },
                  type: 1,
                },
              ], { quoted: msg })
            })
        }
      break
            
      case 'promote':
        if (!isGroupMsg) return devn.reply(mess.onlyGroup())
        if (!isGroupAdmins) return devn.reply(mess.onlyAdmin())
        if (!isBotGroupAdmins) return devn.reply(mess.onlyBotAdmin())
        if (msg.message.extendedTextMessage === undefined || msg.message.extendedTextMessage === null) return devn.reply(mess.needTag())
        mentioned = msg.message.extendedTextMessage.contextInfo.mentionedJid
        if (mentioned.length > 1) {
          txtacc = mess.promoting() + `\n`
          for (let _ of mentioned) {
            teks += `@${_.split('@')[0]}\n`
          }
          devn.SendTextWithMentions(teks, mentioned)
          devn.groupMakeAdmin(from, mentioned)
        } else {
          devn.SendTextWithMentions(`${mess.promoting()} @${mentioned[0].split('@')[0]}`, mentioned)
          devn.groupMakeAdmin(from, mentioned)
        }
      break
      case 'demote':
        if (!isGroupMsg) return devn.reply(mess.onlyGroup())
        if (!isGroupAdmins) return devn.reply(mess.onlyAdmin())
        if (!isBotGroupAdmins) return devn.reply(mess.onlyBotAdmin())
        if (msg.message.extendedTextMessage === undefined || msg.message.extendedTextMessage === null) return devn.reply(mess.needTag())
        mentioned = msg.message.extendedTextMessage.contextInfo.mentionedJid
        if (mentioned.length > 1) {
          teks = ''
          for (let _ of mentioned) {
            teks += mess.demoting()
            teks += `@_.split('@')[0]`
          }
          devn.SendTextWithMentions(teks, mentioned)
          devn.groupDemoteAdmin(from, mentioned)
        } else {
          devn.SendTextWithMentions(`${mess.demoting()} @${mentioned[0].split('@')[0]}`, mentioned)
          devn.groupDemoteAdmin(from, mentioned)
        }
      break
      case 'githubstalk':
        if (args.length < 1) return devn.reply(mess.needQuery())
        githubstalk.result(q)
          .then((res) => {
            nones = '_none_'
            if (res.bio == null || res.bio == undefined) {
              var bio = nones
            } else {
              bio = res.bio
            }
            if (res.company == null) {
              var company = nones
            } else {
              company = res.company
            }
            if (res.email == null) {
              var email = nones
            } else {
              email = res.email
            }
            if (res.twitter_username == null) {
              var twitter = nones
            } else {
              twitter = res.twitter_username
            }
            if (res.location == null || res.bio == undefined) {
              var locs = nones
            } else {
              locs = res.location
            }
            var fls = res.follower
            var flg = res.following
            devn.sendImage(from, res.avatar, mess.ghstalk(q, bio, company, email, twitter, fls, flg, locs), true)
          })
      break
            
      case 'photofunia':
        if (args.length < 1) return devn.reply(mess.needQuery())
        switch(args[0]) {
          case 'light':
            photofunia.result("https://m.photofunia.com/categories/all_effects/light-writing?server=1", args[1])
              .then(async (res) => {
                devn.sendImage(from, res.result, mess.done(), true)
              })
          break
          case 'snow':
            photofunia.result("https://m.photofunia.com/categories/all_effects/snow-sign?server=1", args[1])
              .then(async (res) => {
                devn.sendImage(from, res.result, mess.done(), true)
              })
          break
        }
      break
      case 'sticker':
      case 'stiker':
      case 's':
          User.findOne({nowa: sender.replace('@s.whatsapp.net', '')}).then(async(ak) => {
        if(ak === undefined || ak === null) {return devn.reply(`Sepertinya nomor kakak belum terdaftar di database...\n\nSilahkan daftar di https://asuna-login.herokuapp.com/ \n\n*Catatan : untuk pengisian Nomor Whatsapp menggunakan awalan 62,bukan 08,seperti 62821xxx*\n_Dan untuk password bebas,yang penting ingat!_`)
                                            }else {
        await devn.sendImageAsSticker(from)
                                            }
          })
      break
            
      case 'ytmp4':
          User.findOne({nowa: sender.replace('@s.whatsapp.net', '')}).then(async(ak) => {
        if(ak === undefined || ak === null) {return devn.reply(`Sepertinya nomor kakak belum terdaftar di database...\n\nSilahkan daftar di https://asuna-login.herokuapp.com/ \n\n*Catatan : untuk pengisian Nomor Whatsapp menggunakan awalan 62,bukan 08,seperti 62821xxx*\n_Dan untuk password bebas,yang penting ingat!_`)
                                            }else {
        if (args.length < 1) return devn.reply(mess.needLink())
        if (!isUrl(args[0]) && !args[0].includes('youtu')) return devn.reply(mess.invalidLink())
        devn.reply(mess.wait())
        ytmp4.result(args[0])
          .then(async (res) => {
            devn.sendImage(from, res[0].thumb, mess.yt4res(res), true)
            devn.sendFileFromUrl(from, res[0].link, 'video', mess.done(), true)
          })
                                            }
          })
      break
          
      case 'halah':
          User.findOne({nowa: sender.replace('@s.whatsapp.net', '')}).then(async(ak) => {
        if(ak === undefined || ak === null) {return devn.reply(`Sepertinya nomor kakak belum terdaftar di database...\n\nSilahkan daftar di https://asuna-login.herokuapp.com/ \n\n*Catatan : untuk pengisian Nomor Whatsapp menggunakan awalan 62,bukan 08,seperti 62821xxx*\n_Dan untuk password bebas,yang penting ingat!_`)
                                            }else {
        if (args.length < 1) return devn.reply(mess.needQuery())
        halah.result(q)
          .then(async (res) => {
            devn.reply(res.result)
          })
                                            }
          })
      break
            
      case 'hilih':
          User.findOne({nowa: sender.replace('@s.whatsapp.net', '')}).then(async(ak) => {
        if(ak === undefined || ak === null) {return devn.reply(`Sepertinya nomor kakak belum terdaftar di database...\n\nSilahkan daftar di https://asuna-login.herokuapp.com/ \n\n*Catatan : untuk pengisian Nomor Whatsapp menggunakan awalan 62,bukan 08,seperti 62821xxx*\n_Dan untuk password bebas,yang penting ingat!_`)
                                            }else {
        if (args.length < 1) return devn.reply(mess.needQuery())
        hilih.result(q)
          .then(async (res) => {
            devn.reply(res.result)
          })
                                            }
          })
      break
            
      default:
        devn.updatePresence(from, online)
        if (autoRead == true) {
          devn.chatRead(from)
        }
    }
  } catch(err) {
    console.log(color("Error:", "red"), err)
  }
}
