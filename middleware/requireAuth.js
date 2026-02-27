export async function requireAuth(req, res, next) {
    const userId = req.session.userId
    if(!userId) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    next()
}