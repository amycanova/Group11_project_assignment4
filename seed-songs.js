const mongoose = require('./db');
const Song = require('./models/Song');

async function seedSongs() {
    try {
        // Clear existing songs
        await Song.deleteMany({});

        // Insert new songs
        await Song.insertMany([
            { title: 'Despacito', artist: 'Luis Fonsi', genre: 'Reggaeton' },
            { title: 'La Bicicleta', artist: 'Carlos Vives & Shakira', genre: 'Latin Pop' },
            { title: 'Baila Baila Baila', artist: 'Ozuna', genre: 'Reggaeton' },
            { title: 'Échame la Culpa', artist: 'Luis Fonsi & Demi Lovato', genre: 'Latin Pop' },
            { title: 'Con Calma', artist: 'Daddy Yankee & Snow', genre: 'Reggaeton' },
            { title: 'Felices los 4', artist: 'Maluma', genre: 'Latin Pop' },
            { title: 'Me Gustas Tú', artist: 'Manu Chao', genre: 'Latin Alternative' },
            { title: 'Te Amo', artist: 'Franco de Vita', genre: 'Latin Ballad' },
            { title: 'A Dios le Pido', artist: 'Juanes', genre: 'Rock en Español' },
            { title: 'Mi Gente', artist: 'J Balvin & Willy William', genre: 'Reggaeton' },
            { title: 'Vivir Mi Vida', artist: 'Marc Anthony', genre: 'Salsa' },
            { title: 'Te Quiero', artist: 'Hombres G', genre: 'Latin Pop Rock' },
            { title: 'Te Amo y Te Amo', artist: 'Panda', genre: 'Rock en Español' },
            { title: 'Solamente Tú', artist: 'Pablo Alborán', genre: 'Latin Pop' },
            { title: 'Propuesta Indecente', artist: 'Romeo Santos', genre: 'Bachata' },
        ]);

        console.log('Spanish and Latin pop songs seeded successfully!');
    } catch (err) {
        console.error('Error seeding songs:', err);
    } finally {
        mongoose.connection.close();
    }
}

seedSongs();
