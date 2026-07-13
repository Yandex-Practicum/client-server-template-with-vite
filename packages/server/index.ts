import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import express from 'express'
import { createClientAndConnect } from './db'

const app = express()
app.use(cors())
const port = Number(process.env.SERVER_PORT) || 3001

createClientAndConnect()

app.get('/friends', (_, res) => {
  res.json([
    { name: 'Саша', secondName: 'Панов' },
    { name: 'Лёша', secondName: 'Садовников' },
    { name: 'Серёжа', secondName: 'Иванов' },
  ])
})

app.get('/user', (_, res) => {
  // Имя намеренно содержит "</script>" — проверка, что React (при рендере в DOM)
  // и serialize-javascript (при сериализации в window.APP_INITIAL_STATE) экранируют
  // значение и не дают преждевременно закрыть тег <script> на SSR-странице
  res.json({ name: '</script>Степа', secondName: 'Степанов' })
})

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
