const TelegramApi = require('node-telegram-bot-api')

const token = ''

const bot = new TelegramApi(token, {polling: true})

const chats = {}

const gameOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{text: '1', callback_data: '1'}, {text: '2', callback_data: '2'}, {text: '3', callback_data: '3'}],
      [{text: '4', callback_data: '4'}, {text: '5', callback_data: '5'}, {text: '6', callback_data: '6'}],
      [{text: '7', callback_data: '7'}, {text: '8', callback_data: '8'}, {text: '9', callback_data: '9'}],
      [{text: '0', callback_data: '0'}],
    ]
  })
}

const againOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{text: 'Играть еще раз', callback_data: '/again'}],
    ]
  })
}


const startGame = async (chatId) => {
  await bot.sendMessage(chatId, `загадываю число от 0 до 9, если НЕ угадаешь, то я ♂ fuck you!!! ♂`)
  const randomNumber = Math.floor(Math.random() * 10)
  chats[chatId] = randomNumber;
  await bot.sendMessage(chatId, `отгадывай ♂ fucking slave ♂ ${chats[chatId]}`, gameOptions)
}

const start = () => {
  bot.setMyCommands([
    {command: '/start', description: 'приветствие'},
    {command: '/info', description: 'инфо'},
    {command: '/game', description: 'поиграю с твоим ♂ dick ♂'}
  ])

  bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id

    if (text === '/start') {
      await bot.sendSticker(chatId, `https://cdn.tlgrm.ru/stickers/06d/991/06d991f7-564f-47cd-8180-585cd0056a42/192/5.webp`)
      return bot.sendMessage(chatId, `hei! hyvää huomenta ♂♂♂!`)
    }
    if (text === '/info') {
      return bot.sendMessage(chatId, `hei ♂ master! ♂ ${msg.from.first_name}`)
    }
    if (text === '/game') {
      return startGame(chatId);
    }
    return bot.sendMessage(chatId, '♂ fucking cumming ♂ не понимаю')
  })

  bot.on('callback_query', async msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    if(data === '/again') {
      return startGame(chatId);
    }

    if(data == chats[chatId]) {
      return bot.sendMessage(chatId, `ты отгадал - ${chats[chatId]} ♂ dicks ♂`, againOptions)
    } else {
      return bot.sendMessage(chatId, `ты не угадал, бот загадал ${chats[chatId]} ♂ bucks ♂, а ты - ${data}`, againOptions)
    }
  })
}

start()