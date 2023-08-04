import { createServer } from './app.js'

createServer().catch(() => {
  console.log('Something went wrong!')
})