const dataSet =[{
	basicInfo:{
		id:0,
		title:'JavaScript Quiz',
		shortDescription:'java script is the most popular language now a days lets give a quiz of it.',
		imgURL:'/assets/js.png'
	},
	questions:[
		{
			question: "Inside which HTML element do we put the JavaScript?",
			options: ["<scripting>", "<js>", "<script>", "<javascript>"],
			correct: 2,
		},
		{
			question: "The external JavaScript file must contain the <script> tag.",
			options: ["True", "False"],
			correct: 1,
		},
		{
			question: "Where is the correct place to insert a JavaScript?",
			options: [
				"Both the <head> section and the <body> section are correct",
				"The <head> section",
				"The <body> section",
			],
			correct: 0,
		},
	]
},
{
	basicInfo:{
		id:1,
		title:'HTML Quiz',
		shortDescription:'Hyper Text Markup Language.',
		imgURL:'/assets/2.jpg'
	},
	questions:[
		{
			question: "Inside which HTML element do we put the JavaScript?",
			options: ["<scripting>", "<js>", "<script>", "<javascript>"],
			correct: 2,
		},
		{
			question: "The external JavaScript file must contain the <script> tag.",
			options: ["True", "False"],
			correct: 1,
		},
		{
			question: "Where is the correct place to insert a JavaScript?",
			options: [
				"Both the <head> section and the <body> section are correct",
				"The <head> section",
				"The <body> section",
			],
			correct: 0,
		},
	]
}
];

export default dataSet;
