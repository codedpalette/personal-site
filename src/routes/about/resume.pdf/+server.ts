import { launch } from 'puppeteer';

import globalStyles from '$lib/styles/global.scss?inline';

import Resume from '../Resume.svelte';

// SvelteKit doesn't export types for server-side components API, need to define it myself
type ServerSideComponent = {
	render(): { html: string; head: string; css: { code: string } };
};

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	console.log(globalStyles);
	const resumeRender = (Resume as unknown as ServerSideComponent).render();
	const browser = await launch({ headless: 'new' });
	const page = await browser.newPage();
	await page.setContent(
		`<html>
			<head>	
				${resumeRender.head}
				<style type='text/css'>
					${globalStyles}					
					${resumeRender.css.code}
				</style>
			</head>
			<body>
				${resumeRender.html}
			</body>
		</html>`,
		{ waitUntil: 'networkidle0' }
	);
	const pdf = await page.pdf({ format: 'A4' });
	return new Response(pdf, { status: 200 });
}

// Enable prerendering of server endpoints for deploying with adapter-static
export const prerender = true;
