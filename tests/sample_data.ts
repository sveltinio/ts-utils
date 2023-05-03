export const menu = [
	{ identifier: 'home', name: 'Home', url: '/', weight: 1 },
	{ identifier: 'blog', name: 'Blog', url: '/blog', weight: 2 },
	{ identifier: 'about', name: 'About', url: '/about', weight: 3 },
	{ identifier: 'contact', name: 'Contact', url: '/contact', weight: 4 }
];

export const people = [
	{ username: 'nick', genre: 'm', email: 'email_1@example.com' },
	{ username: 'jason', genre: 'm', email: 'email_2@example.com' },
	{ username: 'john', genre: 'm', email: 'email_3@example.com' },
	{ username: 'sara', genre: 'f', email: 'email_4@example.com' },
	{ username: 'meggie', genre: 'f', email: 'email_5@example.com' }
];

export const posts = [
	{
		title: 'WebComponents',
		author: 'nick',
		'published-at': '03/09/2023',
		meta: {
			category: 'webdev',
			tags: ['tag_1', 'tag_2']
		}
	},
	{
		title: 'The future of Golang',
		author: 'nick',
		'published-at': '02/29/2023',
		meta: {
			category: 'webdev',
			tags: ['tag_1']
		}
	},
	{
		title: 'Roman Empire',
		author: 'sara',
		'published-at': '03/09/2023',
		meta: {
			category: 'culture',
			tags: ['tag_2', 'tag_3']
		}
	},
	{
		title: 'Sustainability today',
		author: 'john',
		'published-at': '02/09/2023',
		meta: {
			category: 'culture',
			tags: ['tag_1', 'tag_4']
		}
	},
	{
		title: 'SvelteKit 1.0',
		author: 'meggie',
		meta: {
			category: 'webdev',
			tags: ['tag_4']
		}
	}
];
