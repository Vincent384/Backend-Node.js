import User from '../schemas/userSchema.js'
import bcrypt from 'bcrypt'
import generateToken from '../utils/generateToken.js'

// Funktion för att låta användare logga in
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body // Hämta e-post och lösenord från förfrågan

        // Kontrollera om e-post och lösenord är angivna korrekt
        if (!email || !password) {
            res.status(400)
            throw new Error('Vänligen fyll i alla fält korrekt')
        }

        // Hitta användaren baserat på e-postadressen
        const user = await User.findOne({ email })

        // Om användaren inte finns, skicka ett felmeddelande
        if (!user) {
            res.status(401)
            throw new Error('Obehörig')
        }

        // Jämför lösenordet som användaren angett med det lagrade hashade lösenordet
        const compareUser = await bcrypt.compare(password, user.password)

        // Om lösenorden inte matchar, skicka ett felmeddelande
        if (!compareUser) {
            res.status(401)
            throw new Error('Obehörig')
        }

        // Generera JWT-token för användaren
        const token = generateToken(user)

        // Skapa ett objekt med info om användaren
        const responsUserData = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token,
        }

        res.status(200).json(responsUserData)

    } catch (error) {
        res.json({
            message: error.message
        });
    }
};
