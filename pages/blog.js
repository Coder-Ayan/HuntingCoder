import { useEffect, useState } from 'react';
import * as fs from 'fs';
import InfiniteScroll from 'react-infinite-scroll-component';
import Link from 'next/link';
import styles from '../styles/Blog.module.css'

const Blog = (props) => {
	const [blogs, setBlogs] = useState(props.blogs);
	const [hasMore, setHasMore] = useState(props.hasMore);

	useEffect(() => {
		if (blogs.length >= props.allBlogsCount) {
			setHasMore(false);
		}
	}, [blogs])


	const fetchData = async () => {
		let numberOfBlogs = 6;
		let response = await fetch(`http://localhost:3000/api/blogs?start=${blogs.length}&count=${numberOfBlogs}`);
		let fetchedBlogs = await response.json();
		setBlogs([...blogs, ...fetchedBlogs]);
	};

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<h1 className={styles.blogTitle} style={{ fontSize: '4rem', marginTop: '0' }}>Blogs</h1>
				<InfiniteScroll
					dataLength={blogs.length} //This is important field to render the next data
					next={fetchData}
					hasMore={hasMore}
					loader={<h4>Loading...</h4>}
					endMessage={
						<p style={{ textAlign: 'center' }}>
							<b>Yay! You have seen it all</b>
						</p>
					}>
					<div className={styles.grid}>
						{
							blogs.map(blog => {
								return (
									<Link href={`/blogpost/${blog.slug}`} className={styles.card} key={blog.slug}>
										<h3>{blog.title}</h3>
										<p>{blog.metaDescription}</p>
									</Link>
								)
							})
						}
					</div>
				</InfiniteScroll>
			</main>
		</div >
	)
}

export async function getServerSideProps() {
	let response = await fetch("http://localhost:3000/api/blogs/?start=0&count=6");
	let blogs = await response.json()
	let hasMore = true;

	let allBlogsCount = fs.readdirSync('blogdata', 'utf-8').length;

	if (blogs.length == allBlogsCount) {
		hasMore = false;
	}

	return { props: { blogs, allBlogsCount, hasMore } }
}

// export async function getStaticProps() {
// 	let blogs = []
// 	let files = fs.readdirSync('blogdata', 'utf-8')
// 	files.forEach(file => {
// 		let data = fs.readFileSync(`blogdata/${file}`, 'utf-8');
// 		blogs.push(JSON.parse(data));
// 	})

// 	return { props: { blogs } }
// }

export default Blog