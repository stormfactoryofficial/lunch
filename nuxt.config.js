import * as dotenv from 'dotenv';
dotenv.config();

const isDev = process.env.NODE_ENV !== 'production';

export default defineNuxtConfig({
	vue: {
		compilerOptions: {
			isCustomElement: (tag) => tag === 'hgroup'
		}
	},
	static: {
		prefix: false
	},
	buildModules: [ '@nuxtjs/dotenv' ],
	runtimeConfig: {
		public: {
			GOOGLE_API_KEY: process.env.GOOGLE_API_KEY
		}
	},
	css: ['@/assets/style.css'],
	app: {
		baseURL: isDev ? '/' : '/lunch', 
		head: {
			meta: [
				{ charset: 'utf-8' }
			], 
			title: 'lunch', 
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: 'favicon.png' },
				{ rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css', integrity: 'sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi', crossorigin: 'anonymous' },
				{ rel: 'stylesheet', href: 'https://pro.fontawesome.com/releases/v5.10.0/css/all.css' },
			], 
			script: [
				{ src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.min.js', integrity: 'sha384-IDwe1+LCz02ROU9k972gdyvl+AESN10+x7tBKgc9I5HFtuNz0wWnPclzo6p9vxnk',crossorigin: 'anonymous' },
				{ src: '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js' },
				{ src: 'https://code.jquery.com/jquery-3.6.2.min.js', integrity: 'sha256-2krYZKh//PcchRtd+H+VyyQoZ/e3EcrkxhM8ycwASPA=', crossorigin: 'anonymous' },
			] 
		}
	}
})
