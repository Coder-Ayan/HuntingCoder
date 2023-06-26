import * as fs from 'fs';

// http://localhost:3000/api/blogpost?slug=java-the-programming-language
export default function handler(req, res) {
    const slug = req.query.slug;
    let blog;
    try {
        blog = fs.readFileSync(`blogdata/${slug}.json`, 'utf-8');
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.status(200).json(JSON.parse(blog));
}