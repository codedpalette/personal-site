import type { MetaTagsProps } from 'svelte-meta-tags';

export const load = () => {
	const pageMetaTags: MetaTagsProps = {
		title: 'About'
	};
	return {
		pageMetaTags
	};
};
