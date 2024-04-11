import User from '../schemas/userSchema.js'
import bcrypt from 'bcrypt'
import generateToken from '../utils/generateToken.js'


export const getRegisteredUser = async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body // Hämta förnamn, efternamn och e-post från förfrågan

        // Hämta användardata och exkludera lösenordet
        const getData = await User.find({ firstName, lastName, email }).select('-password')

        // Om ingen användardata hittades, skicka ett felmeddelande
        if (!getData) {
            res.status(401);
            throw new Error('Obehörig')
        }

        res.status(200).json(getData)
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}


export const createNewUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body; // Hämta förnamn, efternamn, e-post och lösenord från förfrågan
        
        // Kontrollera om alla obligatoriska fält är ifyllda
        if (!firstName || !lastName || !email || !password) {
            res.status(400);
            throw new Error('Vänligen fyll i alla fält korrekt');
        }

        // Kontrollera om e-postadressen redan finns i databasen
        const emailExist = await User.exists({ email });
        if (emailExist) {
            res.status(401);
            throw new Error('Obehörig');
        }
        
        // Kryptera lösenordet
        const hashedPassword = await bcrypt.hash(password, 10);

        // Skapa en ny användare med krypterat lösenord
        const newUser = await User.create({ firstName, lastName, email, password: hashedPassword });

        // Generera JWT-token för den nya användaren
        const token = generateToken(newUser);

        // Skapa ett objekt med info om användaren
        const responsUserData = {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            token,
        };

        res.status(201).json({
            ...responsUserData,
            message: 'Registrering lyckades'
        });
        
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}


export const updateUser = async (req, res) => {

}


export const deleteUser = async (req, res) => {
    try {
        const id = req.body._id; // Hämta användar-ID från förfrågan

        // Hitta och ta bort användaren med det angivna ID:et
        const deleteUser = await User.findByIdAndDelete(id)
        
        // Om användaren inte hittades, skicka ett felmeddelande
        if (!deleteUser) {
            res.status(401)
            throw new Error('Obehörig')
        }

        res.status(200).json(deleteUser.firstName);

    } catch (error) {
        res.json({
            message: error.message
        })
    }
}
