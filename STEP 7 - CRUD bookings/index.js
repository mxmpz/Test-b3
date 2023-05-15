import dotenv from 'dotenv'

import api from './api/index.js'
dotenv.config()

// For testing purposes
export default api.launch(process.env.API_PORT);
