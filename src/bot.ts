import { Client, GatewayIntentBits, Message } from 'discord.js';
import * as dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import axios from 'axios';
import path from 'path';

// Cargar variables de entorno
dotenv.config();

// Crear el cliente del bot
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

// Servidor HTTP para mantener el bot activo
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req: any, res: { send: (arg0: string) => void; }) => {
  res.send('El bot está activo y escuchando.');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Carpeta para guardar imágenes
const IMAGE_FOLDER = './images';

// Función para guardar logs
function logActivity(message: string): void {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  fs.appendFileSync('log.txt', logMessage);
  console.log(logMessage);
}

// Asegurar que la carpeta de imágenes exista
if (!fs.existsSync(IMAGE_FOLDER)) {
  fs.mkdirSync(IMAGE_FOLDER, { recursive: true });
}

// Evento: Cuando el bot se conecta
client.once('ready', () => {
  if (client.user) {
    logActivity(`Bot conectado como ${client.user.tag}`);
  }
});

// Evento: Detectar mensajes
client.on('messageCreate', async (message: Message) => {
  // Ignorar mensajes del propio bot
  if (message.author.bot) return;

  // Verificar si el mensaje contiene #newgamer
  if (message.content.includes('#newgamer')) {
    logActivity(`📩 Nuevo mensaje detectado de ${message.author.username}: "${message.content}"`);

    // Guardar el mensaje en un archivo de texto
    fs.appendFileSync('mensajes.txt', `${message.author.username}: ${message.content}\n`);

    // Si el mensaje tiene archivos adjuntos, descargar las imágenes
    if (message.attachments.size > 0) {
      message.attachments.forEach(async (attachment) => {
        if (attachment.contentType?.startsWith('image/')) {
          try {
            const imagePath = path.join(IMAGE_FOLDER, `${Date.now()}_${attachment.name || 'image'}`);
            const response = await axios.get(attachment.url, { responseType: 'arraybuffer' });
            fs.writeFileSync(imagePath, response.data as Buffer);
            logActivity(`📷 Imagen guardada: ${imagePath}`);
          } catch (error) {
            logActivity(`❌ Error al descargar la imagen: ${error}`);
          }
        }
      });
    }

    // Confirmar en Discord que el mensaje ha sido procesado
    await message.reply('✅ ¡Tu mensaje ha sido guardado con éxito!');
  }
});

// Iniciar el bot
client.login(process.env.DISCORD_TOKEN);