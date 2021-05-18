const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')

const fs = require("fs")
const { color, bgcolor } = require('./lib/color')
const { help } = require('./src/help')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const antifake = JSON.parse(fs.readFileSync('./database/json/antifake.json'))
const { fetchJson, fetchText } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const Far = args.join(' ')
const google = require('google-it')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const fetch = require('node-fetch')
const ffmpeg = require('fluent-ffmpeg')
const { removeBackgroundFromImageFile } = require('remove.bg')
const lolis = require('lolis.life')
const loli = new lolis()
const welkom = JSON.parse(fs.readFileSync('./src/welkom.json'))
const nsfw = JSON.parse(fs.readFileSync('./src/nsfw.json'))
const samih = JSON.parse(fs.readFileSync('./src/simi.json'))
const isBanned = ban.includes(sender)
prefix = '/'
blocked = []

function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}

async function starts() {
	const client = new WAConnection()
	client.logger.level = 'warn'
	console.log(banner.string)
	client.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan the qr code above'))
	})

	fs.existsSync('./BarBar.json') && client.loadAuthInfo('./BarBar.json')
	client.on('connecting', () => {
		start('2', 'Connecting...')
	})
	client.on('open', () => {
		success('2', 'Connected')
	})
	await client.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./BarBar.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))

	client.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await client.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `ola @${num.split('@')[0]}\n bem vindo ao grupo, comando e /menu peca a tag para algum adm`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `ja vai tarde filho da puta @${num.split('@')[0]}👋`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})

	client.on('CB:Blocklist', json => {
            if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	client.on('chat-update', async (mek) => {
		try {
                        if (!mek.hasNewMessage) return
                        mek = JSON.parse(JSON.stringify(mek)).messages[0]
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const apiKey = 'Your Api Key' // contact me on whatsapp wa.me/6285892766102
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			var pes = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''
			const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)

			mess = {
				wait: 'esta fazendo aguarde um pouco e n flode',
				success: 'sucesso',
				error: {
					stick: 'n consegui fazer essa porra desculpa 😔',
					Iv: ' Link inválido '
				},
				only: {
					group: 'o garai isso aí só funfa em grupo',
					ownerG: 'so o dono do grupo faz isso ai',
					ownerB: 'isso ai aquele gostoso do kito faz kakakakakak',
					admin: 'o membro comum desgraçado, só adm faz esse carai lkkkkk',
					Badmin: 'só quando eu me torna adm faço saporra kkkkkkkk'
                    benned: 'vc foi proibido de usar o bot entre em contato com o dono',
				}
			}

			const botNumber = client.user.jid
			const ownerNumber = ["552187635924@s.whatsapp.net"] // replace this with your number
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
            const isAntiFake = isGroup ? antifake.includes(from) : false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : false
			const isSimi = isGroup ? samih.includes(from) : false
            const q = args.join(' ')
			const isOwner = ownerNumber.includes(sender)
			
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}
			
			if (messagesC.includes("fdp")){
			client.updatePresence(from, Presence.composing)
			reply("teu pai")
	}
	
		if (messagesC.includes("blackpreto")){
			client.updatePresence(from, Presence.composing)
			reply("ele  limdo igual um carvao")
	}
	
			if (messagesC.includes("lixo")){
			client.updatePresence(from, Presence.composing)
			reply("por acaso eu sou vc agr?")
	}
	
	         if (messagesC.includes("preto")){
			client.updatePresence(from, Presence.composing)
			reply("seu pai aquele arrombado kkkkkkkk")
	}
	
			if (messagesC.includes("but")){
			client.updatePresence(from, Presence.composing)
			reply("e bot seu analfabeto")
	}
	
			if (messagesC.includes("cerolcorno")){
			client.updatePresence(from, Presence.composing)
			reply("corno dms kakakakakaka vai jogar fri frai pra q")
	}
	
	        if (messagesC.includes("kitogostoso")){
			client.updatePresence(from, Presence.composing)
			reply("aiinnnn ele e mtooo bato uma pra ele todo dia")
	}
	
		if (messagesC.includes("botlixo")){
			client.updatePresence(from, Presence.composing)
			reply("lisho e seu pai q te fez")
	}
	
			if (messagesC.includes("vtnc")){
			client.updatePresence(from, Presence.composing)
			reply("ovo comer seu cu em")
	}
	
			if (messagesC.includes("vsf")){
			client.updatePresence(from, Presence.composing)
			reply("so se for com vc bb")
	}
	
			if (messagesC.includes("kito")){
			client.updatePresence(from, Presence.composing)
			reply("só de falar o nome gozei")
	}
	
	        if (messagesC.includes("sam")){
			client.updatePresence(from, Presence.composing)
			reply("so de falar o nome gozei")
	}
	if (messagesC.includes("near")){
			client.updatePresence(from, Presence.composing)
			reply("aquele preto desgracado")
	}
	
//msc

           if (messagesC.includes("culimpinho")){
			client.updatePresence(from, Presence.composing)
			tujuh = fs.readFileSync('./assets/culimpo.mp3');
            client.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
	}
	
			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			switch(command) {
				case 'help':
				case 'menu':
				if (isBanned) return reply(mess.only.benned)
					client.sendMessage(from, help(prefix), text)
					break
					case 'kitomenu':
					client.sendMessage(from, kitomenu(prefix), text)
					break
					case 'menuadm':
					client.sendMessage(from, menuadm(prefix), text)
					break
					case 'tabela':
					client.sendMessage(from, tabela(prefix), text)
					break
				case 'info':
				if (isBanned) return reply(mess.only.benned)
					me = client.user
					uptime = process.uptime()
					teks = `nome do bot : ${me.name}\nnumero do bot : @${me.jid.split('@')[0]}\nprefix: ${prefix}\ntotal de bloqueados  : ${blocked.length}\nO bot est� ativo em : ${kyun(uptime)}`
					buffer = await getBuffer(me.imgUrl)
					client.sendMessage(from, buffer, image, {caption: teks, contextInfo:{mentionedJid: [me.jid]}})
					break
				case 'blocklist':
				if (isBanned) return reply(mess.only.benned)
					teks = 'Esta � a lista de n�meros bloqueados :\n'
					for (let block of blocked) {
						teks += `~> @${block.split('@')[0]}\n`
					}
					teks += `Total : ${blocked.length}`
					client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": blocked}})
					break
					case 'play':
					if (isBanned) return reply(mess.only.benned)
                reply(mess.wait)
                play = body.slice(5)
                anu = await fetchJson(`https://api.zeks.xyz/api/ytplaymp3?q=${play}&apikey=apivinz`)
               if (anu.error) return reply(anu.error)
                 infomp3 = `MUSICA ENCONTRADA!!!*\nT�tulo : ${anu.result.title}\nlink : ${anu.result.source}\nTamanho : ${anu.result.size}\n\n*ESPERE UM POUQUINHO, N SPAME O CHAT*`
                buffer = await getBuffer(anu.result.thumbnail)
                lagu = await getBuffer(anu.result.url_audio)
                client.sendMessage(from, buffer, image, {quoted: mek, caption: infomp3})
                client.sendMessage(from, lagu, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: mek})
                await limitAdd(sender)
                break
				case 'fig':
				case 'sticker':
				if (isBanned) return reply(mess.only.benned)
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.stick)
							})
							.on('end', function () {
								console.log('Finish')
								client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply(mess.wait)
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`❌ Gagal, pada saat mengkonversi ${tipe} ke stiker`)
							})
							.on('end', function () {
								console.log('Finish')
								client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ranw = getRandom('.webp')
						ranp = getRandom('.png')
						reply(mess.wait)
						keyrmbg = 'Your-ApiKey'
						await removeBackgroundFromImageFile({path: media, apiKey: keyrmbg, size: 'auto', type: 'auto', ranp}).then(res => {
							fs.unlinkSync(media)
							let buffer = Buffer.from(res.base64img, 'base64')
							fs.writeFileSync(ranp, buffer, (err) => {
								if (err) return reply('Falha, ocorreu um erro, tente novamente mais tarde.')
							})
							exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
								fs.unlinkSync(ranp)
								if (err) return reply(mess.error.stick)
								client.sendMessage(from, fs.readFileSync(ranw), sticker, {quoted: mek})
							})
						})
					/*} else if ((isMedia || isQuotedImage) && colors.includes(args[0])) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.on('start', function (cmd) {
								console.log('Started :', cmd)
							})
							.on('error', function (err) {
								fs.unlinkSync(media)
								console.log('Error :', err)
							})
							.on('end', function () {
								console.log('Finish')
								fs.unlinkSync(media)
								client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=${args[0]}@0.0, split [a][b]; [a] palettegen=reserve_transparent=off; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)*/
					} else {
						reply(`manda imagem ou gif com a legenda ${prefix}fig`)
					}
					break
             case 'ban':
					index.updatePresence(from, Presence.composing) 
					if (args.length < 1) return
					if (!isOwner) return reply(mess.only.ownerB)
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
			        ban = mentioned
					reply(`banido com sucesso : ${ban}`)
					break
           case 'unban':
					if (!isOwner)return reply(mess.only.ownerB)
					bnnd = body.slice(8)
					ban.splice(`${bnnd}@s.whatsapp.net`, 1)
					reply(`N�mero wa.me/${bnnd} foi desbanido!`)
					break
        case 'banlist':
				ben = '```Lista banida``` :\n'
					for (let banned of ban) {
						ben += `~> @${banned.split('@')[0]}\n`
					}
					ben += `Total : ${ban.length}`
					index.sendMessage(from, ben.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": ban}})
					break
          case 'google':
          if (isBanned) return reply(mess.only.benned)
                const googleQuery = body.slice(8)
                if(googleQuery == undefined || googleQuery == ' ') return reply(`*Hasil Pencarian : ${googleQuery}* tidak ditemukan`)
                google({ 'query': googleQuery }).then(results => {
                let vars = `_*Resultado Pesquisa : ${googleQuery}*_\n`
                for (let i = 0; i < results.length; i++) {
                    vars +=  `\n\n\n*T�tulo* : ${results[i].title}\n\n*Descri��o* : ${results[i].snippet}\n\n*Link* : ${results[i].link}\n\n`
                }
                    reply(vars)
                }).catch(e => {
                    console.log(e)
                    denz.sendMessage(from, 'Erro Google : ' + e);
                })
                await limitAdd(sender) 
                break 
              case 'novonome':
					if (args.length < 1) return
					if (!isOwner) return reply(mess.only.ownerB)
					name = body.slice(12)
					reply(`O nome do bot foi alterado com sucesso para : ${name}`)
					break
               case 'tts':
					if (args.length < 1) return client.sendMessage(from, 'Qual � o c�digo da linguagem, tio?', text, {quoted: mek})
					const gtts = require('./lib/gtts')(args[0])
					if (args.length < 2) return client.sendMessage(from, 'Cad� o texto tio', text, {quoted: mek})
					dtt = body.slice(9)
					ranm = getRandom('.mp3')
					rano = getRandom('.ogg')
					dtt.length > 600
					? reply('A maior parte do texto � merda')
					: gtts.save(ranm, dtt, function() {
						exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
							fs.unlinkSync(ranm)
							buff = fs.readFileSync(rano)
							if (err) return reply('falha:(')
							client.sendMessage(from, buff, audio, {quoted: mek, ptt:true})
							fs.unlinkSync(rano)
						})
					})
					break
                case 'attp2':
					if (args.length < 1) return reply(`* burro`)
					teks = body.slice(6)
					atytyd = await getBuffer(`https://api.vhtear.com/textxgif?text=${teks}&apikey=GratisssCokkk`)
					client.sendMessage(from, atytyd, sticker, {quoted: mek})
					break
					
			   case 'attp':
			if (isBanned) return reply(mess.only.benned)
				if (args.length < 1) return reply(`ta errado burro`)
				attp2 = await getBuffer(`https://api.xteam.xyz/attp?file&text=${encodeURIComponent(q)}`)
				client.sendMessage(from, attp2, sticker, {quoted: mek})
				break
					case 'link':
				case 'linkgc':
				if (isBanned) return reply(mess.only.benned)
				    client.updatePresence(from, Presence.composing) 
				    if (!isGroup) return reply(mess.only.group)
                                     if (!isUser) return reply(mess.only.daftarB)
					linkgc = await client.groupInviteCode (from)
					yeh = `https://chat.whatsapp.com/${linkgc}`
					client.sendMessage(from, yeh, text, {quoted: mek, detectLinks: false})
					break
					case 'delete':
				case 'del':
				case 'd':  
					if (!isOwner) return reply('so meu dono lindo faz isso')
					if (!isGroup)return reply(mess.only.group)
					if (!isGroupAdmins)return reply(mess.only.admin)
					client.deleteMessage(from, { id: mek.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
					break
					case 'emoji':
		     case 'sttc2':
		            if (!isGroup) return reply(mess.only.group)
		            reply(mess.wait)
                    if (args.length < 1) return reply('*_Qual o emoji da figurinha??_*\n*_Somente emojis padr�es!')
                    emoji = args[0]
                    try {
                        emoji = encodeURI(emoji[0])
                    } catch {
                        emoji = encodeURI(emoji)
                    }
                    buffer = await getBuffer(`http://api.lolhuman.xyz/api/smoji/${emoji}?apikey=RiuApikey`)
                    client.sendMessage(from, buffer, sticker, { quoted: mek })
                    break
					case 'pinterest':
					if (isBanned) return reply(mess.only.benned)
                    tels = body.slice(11)
					client.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=${tels}`, {method: 'get'})
					reply(mess.wait)
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek, caption: `*PINTEREST*\n\*Resultado da pesquisa* : *${tels}*`})
                    await limitAdd(sender)
					break
					case 'happymod':
					if (isBanned) return reply(mess.only.benned)
			data = await fetchJson(`https://tobz-api.herokuapp.com/api/happymod?q=${body.slice(10)}&apikey=${TobzApi}`)
			hupo = data.result[0] 
			teks = `*Nome*: ${data.result[0].title}\n*vers�o*: ${hupo.version}\n*Tamanho:* ${hupo.size}\n*root*: ${hupo.root}\n*compra*: ${hupo.price}\n*link*: ${hupo.link}\n*download*: ${hupo.download}`
			buffer = await getBuffer(hupo.image)
			client.sendMessage(from, buffer, image, {quoted: mek, caption: `${teks}`})
			await limitAdd(sender)
			break
					case 'criador':
                    client.sendMessage(from, {displayname: "Jeff", vcard: vcard}, MessageType.contact, { quoted: mek})
                    client.sendMessage(from, 'Ctt do meu dono ai, pfv n flode o chat',MessageType.text, { quoted: mek} )
                    break
                    case 'corno':		
                    if (isBanned) return reply(mess.only.benned)
	            	if (args.length < 1) return reply('marque seus amigos!')
					rate = body.slice(1)
					const ti =['4','9','17','28','34','48','59','62','74','83','97','100','29','94','75','82','41','39']
					const kl = ti[Math.floor(Math.random() * ti.length)]
					client.sendMessage(from, 'vc e corno?'+rate+'*\n\n a porcentagem de chifrudo q vc e : '+ kl+'%', text, { quoted: mek })
					break
					case 'wame':
					if (isBanned) return reply(mess.only.benned)
                  client.updatePresence(from, Presence.composing) 
                  options = {
                  text: `  LINK WHATSAPP  \n\n_Solicitado por_ :  @${sender.split("@s.whatsapp.net")[0]} \n\nSeu link WhatsApp:\n\n https://wa.me/${sender.split("@s.whatsapp.net")[0]} \n\n Ou \n\n https://api.whatsapp.com/send?phone=${sender.split("@")[0]} \n\n DARK DOMINA  `,
                  contextInfo: { mentionedJid: [sender] }
                  }
                  client.sendMessage(from, options, text, { quoted: mek } )
			      break
			case 'playmp3':
			if (isBanned) return reply(mess.only.benned)
                reply(mess.wait)
                play = body.slice(9)
                anu = await fetchJson(`https://api.zeks.xyz/api/ytplaymp3?q=${play}&apikey=${ZeksApi}`, {method: 'get'})
               if (anu.error) return reply(anu.error)
                 infomp3 = `  TIMELINE PLAY MP3  \n � T�tulo:  ${anu.result.title}\n � Link:  ${anu.result.source}\n � Tamanho:  ${anu.result.size}\n\n ESPERE NOVAMENTE ENVIANDO POR FAVOR, N�O SPAME O CHAT `
                buffer = await getBuffer(anu.result.thumbnail)
                lagu = await getBuffer(anu.result.url_audio)
                client.sendMessage(from, buffer, image, {quoted: mek, caption: infomp3})
                client.sendMessage(from, lagu, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: mek})
                await limitAdd(sender) 
                break 
                case 'wame':
                if (isBanned) return reply(mess.only.benned)
                  client.updatePresence(from, Presence.composing) 
                  options = {
                  text: `  LINK WHATSAPP  \n\n_Solicitado por_ :  @${sender.split("@s.whatsapp.net")[0]} \n\nSeu link WhatsApp:\n\n https://wa.me/${sender.split("@s.whatsapp.net")[0]} \n\n Ou \n\n https://api.whatsapp.com/send?phone=${sender.split("@")[0]} \n`,
                  contextInfo: { mentionedJid: [sender] }
                  }
                  client.sendMessage(from, options, text, { quoted: mek } )
			      break
					case 'playstore':
					if (isBanned) return reply(mess.only.benned)
                ps = `${body.slice(11)}`
                  anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/playstore?q=${ps}`, {method: 'get'})
                  store = '======================\n'
                  for (let ply of anu.result){
                  store += `Nome Apk:  ${ply.app.name}\nID:  ${ply.app.id}\n�  Link Apk:  ${ply.app.url}\n===================\n`
                  }
                  reply(store.trim())
                  break
                  case 'porno':
                  if (isBanned) return reply(mess.only.benned)
				    if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdU0UmT8RigE3Hbr80gmigjb2AdnPJklcQ3A&usqp=CAU`)
					buffer = await getBuffer(`https://fotosdemulheresnuas.net/wp-content/uploads/2018/11/novinha-petuda-fotos-4.jpg`)
					buffer = await getBuffer(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqWoYHFA_SDgUip6MtvimWRdub_lshAn5Edg&usqp=CAU`)
					buffer = await getBuffer(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwvLmbqW9LeOCpXiGxgu3By4eQEmJM2Xp26Q&usqp=CAU`)
					buffer = await getBuffer(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcnhmpQD1C1Dp7I2_kpi13gAsuoudOPPraog&usqp=CAU`)
					buffer = await getBuffer(`https://fotosdemulheresnuas.net/wp-content/uploads/2018/12/prima-novinha-pelada-6.jpg`)
					buffer = await getBuffer(`https://fotosdemulheresnuas.net/wp-content/uploads/2018/12/Mia-Khalifa-fotos-5.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: 'heheheheheh'})
					client.sendMessage(from, buffer, image, {quoted: mek, caption: 'heheheheheh'})
					client.sendMessage(from, buffer, image, {quoted: mek, caption: 'heheheheheh'})
					buffer = await getBuffer(`https://fotosdemulheresnuas.net/wp-content/uploads/2018/12/Mia-Khalifa-fotos-6.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: 'heheheheheh'})
					buffer = await getBuffer(`https://fotosdemulheresnuas.net/wp-content/uploads/2018/12/Mia-Khalifa-fotos-7.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: 'heheheheheh'})
					buffer = await getBuffer(`https://fotosdemulheresnuas.net/wp-content/uploads/2018/12/Mia-Khalifa-fotos-8.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: 'heheheheheh'})
					buffer = await getBuffer(`https://fotosdemulheresnuas.net/wp-content/uploads/2018/12/Mia-Khalifa-fotos-10.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: 'heheheheheh'})
					buffer = await getBuffer(`https://fotosdemulheresnuas.net/wp-content/uploads/2018/12/Mia-Khalifa-fotos-16.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: 'heheheheheh'})
					client.sendMessage(from, buffer, image, {quoted: mek, caption: 'heheheheheh'})
					client.sendMessage(from, buffer, image, {quoted: mek, caption: 'heheheheheh'})
					client.sendMessage(from, buffer, image, {quoted: mek, caption: 'heheheheheh'})
					client.sendMessage(from, buffer, image, {quoted: mek, caption: 'k'})
					break
					case 'admins':
					if (isBanned) return reply(mess.only.benned)
					client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					teks = `Lista admin do grupo*${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
				case 'tts':
				if (isBanned) return reply(mess.only.benned)
				if (!isPublic) return reply(mess.only.public)
					if (args.length < 1) return client.sendMessage(from, 'Kode bahasanya mana om?', text, {quoted: mek})
					if (args.length < 2) return client.sendMessage(from, 'Textnya mana om', text, {quoted: mek})
					dtt = body.slice(9)
					ranm = getRandom('.mp3')
					rano = getRandom('.ogg')
					dtt.length > 600
					? reply('oq quer falar')
					: gtts.save(ranm, dtt, function() {
						exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
							fs.unlinkSync(ranm)
							buff = fs.readFileSync(rano)
							if (err) return reply('Gagal om:(')
							client.sendMessage(from, buff, audio, {quoted: mek, ptt:true})
							fs.unlinkSync(rano)
						})
					})
					break
				case 'meme':
				if (isBanned) return reply(mess.only.benned)
					meme = await fetchJson('https//kagchi-api.glitch.me/meme/memes', { method: 'get' })
					buffer = await getBuffer(`https://imgur.com/${meme.hash}.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '.......'})
					break
				/*case 'memeindo':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://imgur.com/${memein.hash}.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '.......'})
					break*/
				case 'prefixo':
					if (args.length < 1) return
					if (!isOwner) return reply(mess.only.ownerB)
					prefix = args[0]
					reply(`kitinho o prefix j� foi alterado com sucesso : ${prefix}`)
					break
					case 'novafoto':
				client.updatePresence(from, Presence.composing) 
				if (!isQuotedImage) return reply(`Envie fotos com legendas ${prefix}setbotpp ou tags de imagem que já foram enviadas`)
					if (!isOwner) return reply(mess.only.ownerB)
					enmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(enmedia)
					await client.updateProfilePicture(botNumber, media)
					reply('Obrigado pelo novo perfil😗')
					break
				case 'loli':
				if (isBanned) return reply(mess.only.benned)
					loli.getSFWLoli(async (err, res) => {
						if (err) return reply('❌ *ERROR* ❌')
						buffer = await getBuffer(res.url)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Ingat! Citai Lolimu'})
					})
					break
				case 'nsfwloli':
				if (isBanned) return reply(mess.only.benned)
					if (!isNsfw) return reply('❌ *FALSE* ❌')
					loli.getNSFWLoli(async (err, res) => {
						if (err) return reply('❌ *ERROR* ❌')
						buffer = await getBuffer(res.url)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Jangan jadiin bahan buat comli om'})
					})
					break
				case 'hilih':
				if (isBanned) return reply(mess.only.benned)
					if (args.length < 1) return reply('Teksnya mana um?')
					anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/hilih?teks=${body.slice(7)}`, {method: 'get'})
					reply(anu.result)
					break
				case 'ytmp3':
				if (isBanned) return reply(mess.only.benned)
					if (args.length < 1) return reply('Urlnya mana um?')
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
					anu = await fetchJson(`https://mhankbarbar.tech/api/yta?url=${args[0]}&apiKey=${apiKey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `*Title* : ${anu.title}\n*Filesize* : ${anu.filesize}`
					thumb = await getBuffer(anu.thumb)
					client.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: mek})
					break
				case 'ytsearch':
				if (isBanned) return reply(mess.only.benned)
					if (args.length < 1) return reply('O que voc� est� procurando? pau?')
					anu = await fetchJson(`https://mhankbarbar.tech/api/ytsearch?q=${body.slice(10)}&apiKey=${apiKey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = '=================\n'
					for (let i of anu.result) {
						teks += `TITULO : ${i.title}\n ID : ${i.id}\nPUBLICADOS : ${i.publishTime}\nDIRA�AO : ${i.duration}\nVISUALIZAC�ES: ${h2k(i.views)}\n=================\n`
					}
					reply(teks.trim())
					break
				case 'nulis':
				case 'tulis':
				if (isBanned) return reply(mess.only.benned)
					if (args.length < 1) return reply('O que voc� quer escrever? ')
					teks = body.slice(7)
					reply(mess.wait)
					anu = await fetchJson(`https://mhankbarbar.tech/nulis?text=${teks}&apiKey=${apiKey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buff = await getBuffer(anu.result)
					client.sendMessage(from, buff, image, {quoted: mek, caption: mess.success})
					break
				case 'url2img':
				if (isBanned) return reply(mess.only.benned)
					tipelist = ['desktop','tablet','mobile']
					if (args.length < 1) return reply('Qual � o tipo hum?')
					if (!tipelist.includes(args[0])) return reply('Tipe desktop|tablet|mobile')
					if (args.length < 2) return reply('Onde est� o url, hum?')
					if (!isUrl(args[1])) return reply(mess.error.Iv)
					reply(mess.wait)
					anu = await fetchJson(`https://mhankbarbar.tech/api/url2image?tipe=${args[0]}&url=${args[1]}&apiKey=${apiKey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buff = await getBuffer(anu.result)
					client.sendMessage(from, buff, image, {quoted: mek})
					break
				case 'tstiker':
				case 'tsticker':
				if (isBanned) return reply(mess.only.benned)
					if (args.length < 1) return reply('Onde est� o texto hum?')
					ranp = getRandom('.png')
					rano = getRandom('.webp')
					teks = body.slice(9).trim()
					anu = await fetchJson(`https://mhankbarbar.tech/api/text2image?text=${teks}&apiKey=${apiKey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						client.sendMessage(from, fs.readFileSync(rano), sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					break
				case 'marcar':
				if (isBanned) return reply(mess.only.benned)
				client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += `  Total : ${groupMembers.length}\n`
					for (let mem of groupMembers) {
						teks += `╠➥ @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions('╔══✪〘 Mencionando Todos 〙✪══\n╠➥'+teks+'╚═〘 RUDE-BOT 〙', members_id, true)
					break
                                case 'marcaratk':
                                if (isBanned) return reply(mess.only.benned)
				client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += `  Total : ${groupMembers.length}\n`
					for (let mem of groupMembers) {
						teks += `╠➥ @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions('╔══✪〘 ATK AGR GOGOGO〙✪══\n╠➥'+teks+'╚═〘 RUDE-BOT 〙', members_id, true)
					break
                                case 'tagall3':
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `╠➥ https://wa.me/${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					client.sendMessage(from, teks, text, {detectLinks: false, quoted: mek})
					break
				case 'limpar':
					if (!isOwner) return reply('so meu dono lindo faz isso')
					anu = await client.chats.all()
					index.setMaxListeners(25)
					for (let _ of anu) {
					}
					reply('agr o chat do bot ta sem atraso :)')
					break
				case 'bc':
					if (!isOwner) return reply('cade o texto?')
					if (args.length < 1) return reply('.......')
					anu = await client.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buff, image, {caption: `[ Ini Broadcast ]\n\n${body.slice(4)}`})
						}
						reply('transmissao feita')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `[ recado do kito ]\n\n${body.slice(4)}`)
						}
						reply('prontinhu')
					}
					break
                                case 'promover':
                                if (isBanned) return reply(mess.only.benned)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'agr ele � adm kkkkk\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(from, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`Promovido o sucesso @${mentioned[0].split('@')[0]} agr � adm nessa porra `, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					}
					break
				case 'rebaixar':
				if (isBanned) return reply(mess.only.benned)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'fico sem adm amig�o\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`@${mentioned[0].split('@')[0]} agr � apenas um membro comum lisho `, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					}
					break
				case 'add':
				if (isBanned) return reply(mess.only.benned)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args.length < 1) return reply('coloca a porra do numero assim 55219...')
					if (args[0].startsWith('08')) return reply('Gunakan kode negara mas')
					try {
						num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						client.groupAdd(from, [num])
					} catch (e) {
						console.log('Error :', e)
						reply('n foi add, n sabemos pq kkkkk')
					}
					break
				case 'kick':
				if (isBanned) return reply(mess.only.benned)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'tiramos essa putinha kkkkkkk :\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`putinha saindo pra j� : @${mentioned[0].split('@')[0]}`, mentioned, true)
						client.groupRemove(from, mentioned)
					}
					break
				case 'listadmins':
				if (isBanned) return reply(mess.only.benned)
					if (!isGroup) return reply(mess.only.group)
					teks = `lista dos gostosos dos adm  *${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
                                case 'linkgroup':
                                if (isBanned) return reply(mess.only.benned)
                                        if (!isGroup) return reply(mess.only.group)
                                        if (!isGroupAdmins) return reply(mess.only.admin)
                                        if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                                        linkgc = await client.groupInviteCode(from)
                                        reply('https://chat.whatsapp.com/'+linkgc)
                                        break
                                case 'sair':
                    if (!isGroup) return reply(mess.only.group)
                    if (!isOwner) return reply('so meu dono lindo faz isso')
                     setTimeout( () => {
					client.groupLeave (from) 
					}, 2000)
                     setTimeout( () => {
					client.updatePresence(from, Presence.composing) 
					client.sendMessage(from, 'tchau filhos da puta ', text) // ur cods
					}, 0)
                     break
				case 'toimg':
				if (isBanned) return reply(mess.only.benned)
					if (!isQuotedSticker) return reply('marque uma figurinha ')
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('n deu pra fazer ')
						buffer = fs.readFileSync(ran)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: '>//<'})
						fs.unlinkSync(ran)
					})
					break
				case 'simi':
					if (args.length < 1) return reply('cade o texto?')
					teks = body.slice(5)
					anu = await simih(teks) //fetchJson(`https://mhankbarbars.herokuapp.com/api/samisami?text=${teks}`, {method: 'get'})
					//if (anu.error) return reply('Simi ga tau kak')
					reply(anu)
					break
				case 'simih':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if (Number(args[0]) === 1) {
						if (isSimi) return reply('O modo simi est� ativo ')
						samih.push(from)
						fs.writeFileSync('./src/simi.json', JSON.stringify(samih))
						reply('ativado modo simi com sucesso')
					} else if (Number(args[0]) === 0) {
						samih.splice(from, 1)
						fs.writeFileSync('./src/simi.json', JSON.stringify(samih))
						reply(' modo simi desativado')
					} else {
						reply('1 para ativar, 0 para desativar')
					}
					break
            
				case 'bemvindo':
				if (isBanned) return reply(mess.only.benned)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply('ja esta ativo')
						welkom.push(from)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('boas vindas ativado ')
					} else if (Number(args[0]) === 0) {
						welkom.splice(from, 1)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('boas vindas desligado no grupo')
					} else {
						reply('1 para ativar, 0 para desativar ')
					}
                                      break
               case 'antifake':
					try {
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if (Number(args[0]) === 1) {
						if (isAntiFake) return reply('Ja esta ativo')
						antifake.push(from)
						fs.writeFileSync('./database/json/antifake.json', JSON.stringify(antifake))
						reply('Ativou com sucesso o recurso de antifake neste grupo')
					} else if (Number(args[0]) === 0) {
						antifake.splice(from, 1)
						fs.writeFileSync('./database/json/antifake.json', JSON.stringify(antifake))
						reply('Desativou com sucesso o recurso de antifake neste grupo')
					} else {
						reply('1 para ativar, 0 para desativar')
					}
					} catch {
						reply('Deu erro, tente novamente :/')
					}
                break
               case 'fechargrupo':
               if (isBanned) return reply(mess.only.benned)
					client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					var nomor = mek.participant
					const close = {
					text: `Grupo fechado pelo administrador @${nomor.split("@s.whatsapp.net")[0]}\nagora *apenas administradores* podem enviar mensagens`,
					contextInfo: { mentionedJid: [nomor] }
					}
					client.groupSettingChange (from, GroupSettingChange.messageSend, true);
					reply(close)
					break
					case 'abrirgrupo':
                if (isBanned) return reply(mess.only.benned)
					client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					open = {
					text: `Grupo aberto pelo administrador @${sender.split("@")[0]}\nagora *todos os participantes* podem enviar mensagens`,
					contextInfo: { mentionedJid: [sender] }
					}
					client.groupSettingChange (from, GroupSettingChange.messageSend, false)
					client.sendMessage(from, open, text, {quoted: mek})
					break
				default:
					if (isGroup && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						console.log(muehe)
						reply(muehe)
					} else {
						return console.log(color('[WARN]','red'), 'Unregistered Command from', color(sender.split('@')[0]))
					}
                           }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
}
starts()
