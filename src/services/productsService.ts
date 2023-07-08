const products = [
	{
		id: 1,
		sku: "BOOK-TECH-1000",
		name: "Crash Course in Python",
		description:
			"Learn Python at your own pace. The author explains how the technology works in easy-to-understand language. This book includes working examples that you can apply to your own projects. Purchase the book and get started today!",
		unitPrice: 14.99,
		imageUrl: "assets/images/products/books/book-luv2code-1000.png",
		active: true,
		unitsInStock: 100,
		dateCreated: "2023-07-06T13:59:57.000+00:00",
		lastUpdated: null,
		_links: {
			self: {
				href: "http://192.168.31.161:8080/api/products/1",
			},
			product: {
				href: "http://192.168.31.161:8080/api/products/1",
			},
			category: {
				href: "http://192.168.31.161:8080/api/products/1/category",
			},
		},
	},
	{
		id: 2,
		sku: "BOOK-TECH-1001",
		name: "Become a Guru in JavaScript",
		description:
			"Learn JavaScript at your own pace. The author explains how the technology works in easy-to-understand language. This book includes working examples that you can apply to your own projects. Purchase the book and get started today!",
		unitPrice: 20.99,
		imageUrl: "assets/images/products/books/book-luv2code-1001.png",
		active: true,
		unitsInStock: 100,
		dateCreated: "2023-07-06T13:59:57.000+00:00",
		lastUpdated: null,
		_links: {
			self: {
				href: "http://192.168.31.161:8080/api/products/2",
			},
			product: {
				href: "http://192.168.31.161:8080/api/products/2",
			},
			category: {
				href: "http://192.168.31.161:8080/api/products/2/category",
			},
		},
	},
	{
		id: 3,
		sku: "BOOK-TECH-1002",
		name: "Exploring Vue.js",
		description:
			"Learn Vue.js at your own pace. The author explains how the technology works in easy-to-understand language. This book includes working examples that you can apply to your own projects. Purchase the book and get started today!",
		unitPrice: 14.99,
		imageUrl: "assets/images/products/books/book-luv2code-1002.png",
		active: true,
		unitsInStock: 100,
		dateCreated: "2023-07-06T13:59:57.000+00:00",
		lastUpdated: null,
		_links: {
			self: {
				href: "http://192.168.31.161:8080/api/products/3",
			},
			product: {
				href: "http://192.168.31.161:8080/api/products/3",
			},
			category: {
				href: "http://192.168.31.161:8080/api/products/3/category",
			},
		},
	},
	{
		id: 4,
		sku: "BOOK-TECH-1003",
		name: "Advanced Techniques in Big Data",
		description:
			"Learn Big Data at your own pace. The author explains how the technology works in easy-to-understand language. This book includes working examples that you can apply to your own projects. Purchase the book and get started today!",
		unitPrice: 13.99,
		imageUrl: "assets/images/products/books/book-luv2code-1003.png",
		active: true,
		unitsInStock: 100,
		dateCreated: "2023-07-06T13:59:57.000+00:00",
		lastUpdated: null,
		_links: {
			self: {
				href: "http://192.168.31.161:8080/api/products/4",
			},
			product: {
				href: "http://192.168.31.161:8080/api/products/4",
			},
			category: {
				href: "http://192.168.31.161:8080/api/products/4/category",
			},
		},
	},
	{
		id: 5,
		sku: "BOOK-TECH-1004",
		name: "Crash Course in Big Data",
		description:
			"Learn Big Data at your own pace. The author explains how the technology works in easy-to-understand language. This book includes working examples that you can apply to your own projects. Purchase the book and get started today!",
		unitPrice: 18.99,
		imageUrl: "assets/images/products/books/book-luv2code-1004.png",
		active: true,
		unitsInStock: 100,
		dateCreated: "2023-07-06T13:59:57.000+00:00",
		lastUpdated: null,
		_links: {
			self: {
				href: "http://192.168.31.161:8080/api/products/5",
			},
			product: {
				href: "http://192.168.31.161:8080/api/products/5",
			},
			category: {
				href: "http://192.168.31.161:8080/api/products/5/category",
			},
		},
	},
	{
		id: 6,
		sku: "BOOK-TECH-1005",
		name: "JavaScript Cookbook",
		description:
			"Learn JavaScript at your own pace. The author explains how the technology works in easy-to-understand language. This book includes working examples that you can apply to your own projects. Purchase the book and get started today!",
		unitPrice: 23.99,
		imageUrl: "assets/images/products/books/book-luv2code-1005.png",
		active: true,
		unitsInStock: 100,
		dateCreated: "2023-07-06T13:59:57.000+00:00",
		lastUpdated: null,
		_links: {
			self: {
				href: "http://192.168.31.161:8080/api/products/6",
			},
			product: {
				href: "http://192.168.31.161:8080/api/products/6",
			},
			category: {
				href: "http://192.168.31.161:8080/api/products/6/category",
			},
		},
	},
	{
		id: 7,
		sku: "BOOK-TECH-1006",
		name: "Beginners Guide to SQL",
		description:
			"Learn SQL at your own pace. The author explains how the technology works in easy-to-understand language. This book includes working examples that you can apply to your own projects. Purchase the book and get started today!",
		unitPrice: 14.99,
		imageUrl: "assets/images/products/books/book-luv2code-1006.png",
		active: true,
		unitsInStock: 100,
		dateCreated: "2023-07-06T13:59:57.000+00:00",
		lastUpdated: null,
		_links: {
			self: {
				href: "http://192.168.31.161:8080/api/products/7",
			},
			product: {
				href: "http://192.168.31.161:8080/api/products/7",
			},
			category: {
				href: "http://192.168.31.161:8080/api/products/7/category",
			},
		},
	},
	{
		id: 8,
		sku: "BOOK-TECH-1007",
		name: "Advanced Techniques in JavaScript",
		description:
			"Learn JavaScript at your own pace. The author explains how the technology works in easy-to-understand language. This book includes working examples that you can apply to your own projects. Purchase the book and get started today!",
		unitPrice: 16.99,
		imageUrl: "assets/images/products/books/book-luv2code-1007.png",
		active: true,
		unitsInStock: 100,
		dateCreated: "2023-07-06T13:59:57.000+00:00",
		lastUpdated: null,
		_links: {
			self: {
				href: "http://192.168.31.161:8080/api/products/8",
			},
			product: {
				href: "http://192.168.31.161:8080/api/products/8",
			},
			category: {
				href: "http://192.168.31.161:8080/api/products/8/category",
			},
		},
	},
	{
		id: 9,
		sku: "BOOK-TECH-1008",
		name: "Introduction to Spring Boot",
		description:
			"Learn Spring Boot at your own pace. The author explains how the technology works in easy-to-understand language. This book includes working examples that you can apply to your own projects. Purchase the book and get started today!",
		unitPrice: 25.99,
		imageUrl: "assets/images/products/books/book-luv2code-1008.png",
		active: true,
		unitsInStock: 100,
		dateCreated: "2023-07-06T13:59:57.000+00:00",
		lastUpdated: null,
		_links: {
			self: {
				href: "http://192.168.31.161:8080/api/products/9",
			},
			product: {
				href: "http://192.168.31.161:8080/api/products/9",
			},
			category: {
				href: "http://192.168.31.161:8080/api/products/9/category",
			},
		},
	},
	{
		id: 10,
		sku: "BOOK-TECH-1009",
		name: "Become a Guru in React.js",
		description:
			"Learn React.js at your own pace. The author explains how the technology works in easy-to-understand language. This book includes working examples that you can apply to your own projects. Purchase the book and get started today!",
		unitPrice: 23.99,
		imageUrl: "assets/images/products/books/book-luv2code-1009.png",
		active: true,
		unitsInStock: 100,
		dateCreated: "2023-07-06T13:59:57.000+00:00",
		lastUpdated: null,
		_links: {
			self: {
				href: "http://192.168.31.161:8080/api/products/10",
			},
			product: {
				href: "http://192.168.31.161:8080/api/products/10",
			},
			category: {
				href: "http://192.168.31.161:8080/api/products/10/category",
			},
		},
	},
	{
		id: 11,
		sku: "BOOK-TECH-1010",
		name: "Beginners Guide to Data Science",
		description:
			"Learn Data Science at your own pace. The author explains how the technology works in easy-to-understand language. This book includes working examples that you can apply to your own projects. Purchase the book and get started today!",
		unitPrice: 24.99,
		imageUrl: "assets/images/products/books/book-luv2code-1010.png",
		active: true,
		unitsInStock: 100,
		dateCreated: "2023-07-06T13:59:57.000+00:00",
		lastUpdated: null,
		_links: {
			self: {
				href: "http://192.168.31.161:8080/api/products/11",
			},
			product: {
				href: "http://192.168.31.161:8080/api/products/11",
			},
			category: {
				href: "http://192.168.31.161:8080/api/products/11/category",
			},
		},
	},
	{
		id: 12,
		sku: "BOOK-TECH-1011",
		name: "Advanced Techniques in Java",
		description:
			"Learn Java at your own pace. The author explains how the technology works in easy-to-understand language. This book includes working examples that you can apply to your own projects. Purchase the book and get started today!",
		unitPrice: 19.99,
		imageUrl: "assets/images/products/books/book-luv2code-1011.png",
		active: true,
		unitsInStock: 100,
		dateCreated: "2023-07-06T13:59:57.000+00:00",
		lastUpdated: null,
		_links: {
			self: {
				href: "http://192.168.31.161:8080/api/products/12",
			},
			product: {
				href: "http://192.168.31.161:8080/api/products/12",
			},
			category: {
				href: "http://192.168.31.161:8080/api/products/12/category",
			},
		},
	},
	{
		id: 13,
		sku: "BOOK-TECH-1012",
		name: "Exploring DevOps",
		description:
			"Learn DevOps at your own pace. The author explains how the technology works in easy-to-understand language. This book includes working examples that you can apply to your own projects. Purchase the book and get started today!",
		unitPrice: 24.99,
		imageUrl: "assets/images/products/books/book-luv2code-1012.png",
		active: true,
		unitsInStock: 100,
		dateCreated: "2023-07-06T13:59:57.000+00:00",
		lastUpdated: null,
		_links: {
			self: {
				href: "http://192.168.31.161:8080/api/products/13",
			},
			product: {
				href: "http://192.168.31.161:8080/api/products/13",
			},
			category: {
				href: "http://192.168.31.161:8080/api/products/13/category",
			},
		},
	},
	{
		id: 14,
		sku: "BOOK-TECH-1013",
		name: "The Expert Guide to SQL",
		description:
			"Learn SQL at your own pace. The author explains how the technology works in easy-to-understand language. This book includes working examples that you can apply to your own projects. Purchase the book and get started today!",
		unitPrice: 19.99,
		imageUrl: "assets/images/products/books/book-luv2code-1013.png",
		active: true,
		unitsInStock: 100,
		dateCreated: "2023-07-06T13:59:57.000+00:00",
		lastUpdated: null,
		_links: {
			self: {
				href: "http://192.168.31.161:8080/api/products/14",
			},
			product: {
				href: "http://192.168.31.161:8080/api/products/14",
			},
			category: {
				href: "http://192.168.31.161:8080/api/products/14/category",
			},
		},
	},
	{
		id: 15,
		sku: "BOOK-TECH-1014",
		name: "Introduction to SQL",
		description:
			"Learn SQL at your own pace. The author explains how the technology works in easy-to-understand language. This book includes working examples that you can apply to your own projects. Purchase the book and get started today!",
		unitPrice: 22.99,
		imageUrl: "assets/images/products/books/book-luv2code-1014.png",
		active: true,
		unitsInStock: 100,
		dateCreated: "2023-07-06T13:59:57.000+00:00",
		lastUpdated: null,
		_links: {
			self: {
				href: "http://192.168.31.161:8080/api/products/15",
			},
			product: {
				href: "http://192.168.31.161:8080/api/products/15",
			},
			category: {
				href: "http://192.168.31.161:8080/api/products/15/category",
			},
		},
	},
	{
		id: 16,
		sku: "BOOK-TECH-1015",
		name: "The Expert Guide to JavaScript",
		description:
			"Learn JavaScript at your own pace. The author explains how the technology works in easy-to-understand language. This book includes working examples that you can apply to your own projects. Purchase the book and get started today!",
		unitPrice: 22.99,
		imageUrl: "assets/images/products/books/book-luv2code-1015.png",
		active: true,
		unitsInStock: 100,
		dateCreated: "2023-07-06T13:59:57.000+00:00",
		lastUpdated: null,
		_links: {
			self: {
				href: "http://192.168.31.161:8080/api/products/16",
			},
			product: {
				href: "http://192.168.31.161:8080/api/products/16",
			},
			category: {
				href: "http://192.168.31.161:8080/api/products/16/category",
			},
		},
	},
	{
		id: 17,
		sku: "BOOK-TECH-1016",
		name: "Exploring React.js",
		description:
			"Learn React.js at your own pace. The author explains how the technology works in easy-to-understand language. This book includes working examples that you can apply to your own projects. Purchase the book and get started today!",
		unitPrice: 27.99,
		imageUrl: "assets/images/products/books/book-luv2code-1016.png",
		active: true,
		unitsInStock: 100,
		dateCreated: "2023-07-06T13:59:57.000+00:00",
		lastUpdated: null,
		_links: {
			self: {
				href: "http://192.168.31.161:8080/api/products/17",
			},
			product: {
				href: "http://192.168.31.161:8080/api/products/17",
			},
			category: {
				href: "http://192.168.31.161:8080/api/products/17/category",
			},
		},
	},
	{
		id: 18,
		sku: "BOOK-TECH-1017",
		name: "Advanced Techniques in React.js",
		description:
			"Learn React.js at your own pace. The author explains how the technology works in easy-to-understand language. This book includes working examples that you can apply to your own projects. Purchase the book and get started today!",
		unitPrice: 13.99,
		imageUrl: "assets/images/products/books/book-luv2code-1017.png",
		active: true,
		unitsInStock: 100,
		dateCreated: "2023-07-06T13:59:57.000+00:00",
		lastUpdated: null,
		_links: {
			self: {
				href: "http://192.168.31.161:8080/api/products/18",
			},
			product: {
				href: "http://192.168.31.161:8080/api/products/18",
			},
			category: {
				href: "http://192.168.31.161:8080/api/products/18/category",
			},
		},
	},
	{
		id: 19,
		sku: "BOOK-TECH-1018",
		name: "Introduction to C#",
		description:
			"Learn C# at your own pace. The author explains how the technology works in easy-to-understand language. This book includes working examples that you can apply to your own projects. Purchase the book and get started today!",
		unitPrice: 26.99,
		imageUrl: "assets/images/products/books/book-luv2code-1018.png",
		active: true,
		unitsInStock: 100,
		dateCreated: "2023-07-06T13:59:57.000+00:00",
		lastUpdated: null,
		_links: {
			self: {
				href: "http://192.168.31.161:8080/api/products/19",
			},
			product: {
				href: "http://192.168.31.161:8080/api/products/19",
			},
			category: {
				href: "http://192.168.31.161:8080/api/products/19/category",
			},
		},
	},
	{
		id: 20,
		sku: "BOOK-TECH-1019",
		name: "Crash Course in JavaScript",
		description:
			"Learn JavaScript at your own pace. The author explains how the technology works in easy-to-understand language. This book includes working examples that you can apply to your own projects. Purchase the book and get started today!",
		unitPrice: 13.99,
		imageUrl: "assets/images/products/books/book-luv2code-1019.png",
		active: true,
		unitsInStock: 100,
		dateCreated: "2023-07-06T13:59:57.000+00:00",
		lastUpdated: null,
		_links: {
			self: {
				href: "http://192.168.31.161:8080/api/products/20",
			},
			product: {
				href: "http://192.168.31.161:8080/api/products/20",
			},
			category: {
				href: "http://192.168.31.161:8080/api/products/20/category",
			},
		},
	},
];

export function getProductsList() {
	return products;
}
