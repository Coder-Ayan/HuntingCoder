import * as fs from 'fs';

export default function handler(req, res) {
    if (req.method === 'POST') {
        let files = fs.readdirSync('contact-messages');
        fs.writeFileSync(`contact-messages/${files.length + 1}.json`, JSON.stringify(req.body));
        return res.status(200).json({ status: "success" });
    } else {
        return res.status(405).json({ error: "Method Not Allowed", allow: ['POST'] });
    }
}