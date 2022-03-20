let Baileys = require('@adiwajshing/baileys')
let fetcher = require('./../lib/fetcher')
let { color } = require('./color')
let { readFileSync: read, unlinkSync: remove } = require('fs')
let ffmpeg = require('fluent-ffmpeg')
let { getRandom } = require('./function')

module.exports = attr = async (data) => {
  let msg = data.msg
  let devn = data.devn
  let from = data.from
  let type = data.type
  let content = data.content
  let args = data.args
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
  global.buffer = fetcher.getBuffer

  let isMedia = type === "imageMessage" || type === "videoMessage"
  let isQuotedImage = type === "extendedTextMessage" && content.includes("imageMessage")
  let isQuotedVideo = type === "extendedTextMessage" && content.includes("videoMessage")
  let isQuotedAudio = type === "extendedTextMessage" && content.includes("audioMessage")

  devn.reply = (txt) => {
    devn.sendMessage(from, txt, text, { quoted: msg })
  }
  devn.sendText = (from, txt) => {
    devn.sendMessage(from, txt, text)
  }
  devn.sendImage = async (from, img, captions, replying) => {
    if (img.includes("https://")) {
      try {
        var fetch = await global.buffer(img)
        if (replying = true) {
          devn.sendMessage(from, fetch, image, { caption: captions, quoted: msg })
        } else {
          devn.sendMessage(from, fetch, image, { caption: captions })
        }
      } catch(e) {
        console.log(color("[ERROR]", "red"), e)
        devn.reply(from, "Error!")
      }
    } else {
      try {
        var fetch = await global.buffer(img)
        if (replying = true) {
          devn.sendMessage(from, fetch, image, { caption: captions, quoted: msg })
        } else {
          devn.sendMessage(from, fetch, image, { caption: captions })
        }
      } catch(e) {
        console.log(color("[ERROR", "red"), e)
        devn.reply(from, "Error!")
      }
    }
  }
  devn.sendFile = (from, file, type, captions, replying) => {
    if (type == 'document') {
      if (replying == true) {
        devn.sendMessage(from, file, type, { quoted: msg })
      } else {
        devn.sendMessage(from, file, type)
      }
    } else if (type == 'image') {
      if (replying == true) {
        devn.sendMessage(from, file, type, { caption: captions, quoted: msg })
      } else {
        devn.sendMessage(from, file, type, { caption: captions })
      }
    } else if (type === 'video') {
      if (replying == true) {
        devn.sendMessage(from, file, type, { caption: captions, quoted: msg })
      } else {
        devn.sendMessage(from, file, type, { caption: captions })
      }
    } else if (type == 'audio') {
      if (replying == true) {
        devn.sendMessage(from, file, type, { mimetype: Baileys.Mimetype.mp4Audio, quoted: msg })
      } else {
        devn.sendMessage(from, file, type, { mimetype: Baileys.Mimetype.mp4Audio, })
      }
    } else if (type == 'gif') {
      if (replying == true) {
        devn.sendMessage(from, file, video, { mimetype: Baileys.Mimetype.gif, quoted: msg, caption: captions })
      } else {
        devn.sendMessage(from, file, video, { mimetype: Baileys.Mimetype.gif, caption: captions })
      }
    } else {
      console.log(color("[ERROR] ", "red") + 'File Type ' + type + ' not found.')
    }
  }
  devn.sendFileFromUrl = async (from, url, type, captions, replying) => {
    if (type == 'document') {
      var fetch = await global.buffer(url)
      if (replying == true) {
        devn.sendMessage(from, fetch, document, { quoted: msg })
      } else {
        devn.sendMessage(from, fetch, document)
      }
    } else if (type == 'image') {
      var fetch = await global.buffer(url)
      if (replying == true) {
        devn.sendMessage(from, fetch, image, { quoted: msg })
      } else {
        devn.sendMessage(from, fetch, image)
      }
    } else if (type == 'video') {
      var fetch = await global.buffer(url)
      if (replying == true) {
        devn.sendMessage(from, fetch, video, { quoted: msg })
      } else {
        devn.sendMessage(from, fetch, video)
      }
    } else if (type == 'audio') {
      var fetch = await global.buffer(url)
      if (replying == true) {
        devn.sendMessage(from, fetch, audio, { mimetype: Baileys.Mimetype.mp4Audio, quoted: msg })
      } else {
        devn.sendMessage(from, fetch, audio, { mimetype: Baileys.Mimetype.mp4Audio })
      }
    } else if (type == 'gif') {
      var fetch = await global.buffer(url)
      if (replying == true) {
        devn.sendMessage(from, fetch, video, { mimetype: Baileys.Mimetype.gif, quoted: msg, caption: captions })
      } else {
        devn.sendMessage(from, fetch, video, { mimetype: Baileys.Mimetype.gif })
      }
    } else {
      console.log(color("[ERROR] ", "red") + 'File Type ' + type + ' not found.')
    }
  }
  devn.sendButton = (from, text1, desc1, but = [], options = {}) => {
    const buttonMessage = {
      contentText: text1,
      footerText: desc1,
      buttons: but,
      headerType: 1,
    }
    devn.sendMessage(from, buttonMessage, Baileys.MessageType.buttonsMessage, options)
  }
  devn.sendButtonLoc = async(jid, buffer, content, footer, but = [], options = {}) => {
    let button = {
      locationMessage: { jpegThumbnail: buffer },                                             contentText: content,
      footerText: footer,
      buttons: but,
      headerType: 6
    }
    devn.sendMessage(from, button, Baileys.MessageType.buttonsMessage, options)
  }
  devn.sendButtonImg = async(jid, buffer, content, footer, but = [], options = {}) => {
    let buttonimg = {
      contentText: content,
      footerText: footer,
      buttons: but,
      headerType: 4,
      imageMessage: (await devn.prepareMessageMedia(buffer, Baileys.MessageType.image, {})).imageMessage
    }
    devn.sendMessage(from, buttonimg, Baileys.MessageType.buttonsMessage, options)
  }
  devn.SendTextWithMentions = (teks, memberr, id) => {
    if (id == null || id == undefined) {
      id = true
    }
    (id == null || id == undefined || id == false) ? devn.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : devn.sendMessage(from, teks.trim(), extendedText, {quoted: msg, contextInfo: {"mentionedJid": memberr}})
  }
  devn.setPresence = async(prs) => {
    await devn.updatePresence(from, prs)
  }
  devn.sendImageAsSticker = async(id, replying) => {
    if ((isMedia && !msg.message.videoMessage || isQuotedImage) && args.length == 0) {
      const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo : msg
      const media = await devn.downloadAndSaveMediaMessage(encmedia)
      ran = getRandom('.webp')
      await ffmpeg(`./${media}`)
	.input(media)
	.on('start', function (cmd) {
	  console.log(color('[STICKER]', 'cyan'), color('Starting Command : ', 'green'), color(cmd, 'yellow'))
	})
	.on('error', function (err) {
	  console.log(color('[ERROR]', 'red'), err)
	  devn.reply('Error')
	  remove(media)
	})
	.on('end', function () {
	  console.log(color('[STICKER]', 'cyan'), color('Finish', 'yellow'))
	  if (replying == true) {
	    devn.sendMessage(id, read(ran), sticker, { quoted: msg })
	    remove(media)
	    remove(ran)
	  } else {
	    devn.sendMessage(id, read(ran), sticker)
	  }
	})
	.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
	.toFormat('webp')
	.save(ran)
    } else if ((isMedia && msg.message.videoMessage.seconds < 11 || isQuotedVideo && msg.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
      const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo : msg
      const media = await devn.downloadAndSaveMediaMessage(encmedia)
      ran = getRandom('.webp')
      await ffmpeg(`./${media}`)
        .inputFormat(media.split('.')[1])
	.on('start', function (cmd) {
	  console.log(color('[STICKER]', 'cyan'), color('Starting Command : ', 'green'), color(cmd, 'yellow'))
	})
	.on('error', function (err) {
	  console.log(color('[ERROR]', 'red'), err)
          devn.reply('Error')
          remove(media)
	})
	.on('end', function () {
	  console.log(color('[STICKER]', 'cyan'), color('Finish', 'yellow'))
	  if (replying == true) {
	    devn.sendMessage(id, read(ran), sticker, {quoted: msg})
	    remove(media)
	    remove(ran)
	  } else {
	    devn.sendMessage(id, read(ran), sticker)
	    remove(media)
	    remove(ran)
	  }
	})
	.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
	.toFormat('webp')
	.save(ran)
    } else {
      console.log(color("[STICKER]", "cyan"), `Users don't post pictures/videos/with captions!`)
    }
  }
}
