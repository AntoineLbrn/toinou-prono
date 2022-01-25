import jwt from 'jsonwebtoken';

class AuthService {
    generateToken(discordUserId: string, discordAccessToken: string): any {
        return jwt.sign({
            discordUserId,
            discordAccessToken
        }, process.env.JWT_SECRET, { expiresIn: '7d' })
    }
    
}

export default new AuthService();