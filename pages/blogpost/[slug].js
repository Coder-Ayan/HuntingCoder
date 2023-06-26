import { useState } from 'react';
import * as fs from 'fs';
import styles from '../../styles/Blogpost.module.css'

const Slug = (props) => {
    const [blog, setBlog] = useState(props.blog);

    function createMarkup(content) {
        return { __html: content };
    }

    return (
        <main className={styles.articleBlock}>
            <h1>{blog.title}</h1>
            {blog && <div dangerouslySetInnerHTML={createMarkup(blog.content)} />}
        </main>
    )
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { slug: 'c-the-programming-language' } },
            { params: { slug: 'go-the-programming-language' } },
            { params: { slug: 'java-the-programming-language' } },
            { params: { slug: 'javascript-the-programming-language' } },
            { params: { slug: 'python-the-programming-language' } },
            { params: { slug: 'ruby-the-programming-language' } },
        ],
        fallback: false
    }
}

export async function getStaticProps(context) {
    const { slug } = context.params;

    let data = await fs.promises.readFile(`blogdata/${slug}.json`, 'utf-8');
    let blog = await JSON.parse(data);

    return { props: { blog } }
}

export default Slug