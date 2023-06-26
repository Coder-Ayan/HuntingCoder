import * as fs from 'fs';

// http://localhost:3000/api/blogs/?start=2&count=3
export default function handler(req, res) {
    let blogs = [];
    const startIndex = parseInt(req.query.start);
    const numberOfBlogs = parseInt(req.query.count);

    let files = fs.readdirSync('blogdata', 'utf-8');
    files = files.slice(startIndex, startIndex + numberOfBlogs);

    files.forEach(file => {
        let data = fs.readFileSync(`blogdata/${file}`, 'utf-8');
        blogs.push(JSON.parse(data));
    })

    return res.status(200).send(blogs);
}