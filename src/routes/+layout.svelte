<script lang="ts">
	import '../app.css';
	import 'iconify-icon';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import Navbar from '$lib/components/navbar.svelte';
	import Footer from '$lib/components/footer.svelte';
	let { children } = $props();
	let path = $state('');

	// URL'i key olarak kullan
	$effect(() => {
		path = $page.url.pathname;
	});

	const SITE_DESCRIPTION =
		'Dede Gayrimenkul, 32 yılı aşkın süredir gayrimenkul sektöründe güvenilir ve kaliteli hizmet sunuyor.';
	const SITE_URL = 'https://dedegayrimenkul.com/';
	const SITE_TITLE = 'Dede Gayrimenkul ve Yatırım Danışmanlığı';
	const SITE_IMAGE = 'https://dedegayrimenkul.com/Favicon.ico';
</script>

<svelte:head>
	<meta name="description" content={SITE_DESCRIPTION} />

	<!-- Open Graph Meta Etiketleri -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={SITE_URL} />
	<meta property="og:title" content={SITE_TITLE} />
	<meta property="og:description" content={SITE_DESCRIPTION} />
	<meta property="og:image" content={SITE_IMAGE} />
	<meta property="og:site_name" content={SITE_TITLE} />
	<meta property="og:locale" content="tr_TR" />

	<!-- Twitter Meta Etiketleri -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={SITE_URL} />
	<meta name="twitter:title" content={SITE_TITLE} />
	<meta name="twitter:description" content={SITE_DESCRIPTION} />
	<meta name="twitter:image" content={SITE_IMAGE} />
</svelte:head>

<Navbar />

{#key path}
	<main in:fade={{ duration: 300 }} class="flex-1">
		{@render children()}
	</main>
{/key}

<Footer />
