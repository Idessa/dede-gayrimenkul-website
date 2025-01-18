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
	const SITE_TITLE = 'Dede Gayrimenkul ve Yatırım Danışmanlığı | Bursa Emlak';
	const SITE_IMAGE = 'https://dedegayrimenkul.com/Favicon.ico';
	const KEYWORDS =
		'Bursa emlak, Dede gayrimenkul, Eskisehir arazi, Eskişehir arsa, yatirim uzmani, yatırım uzmanı, acil arazi, acele satılık, Karacabey emlak, Balikesir emlak, Balıkesir gayrimenkul, Ankara emlak, Istanbul gayrimenkul, İstanbul emlak, kelepir emlak, satilik daire, satılık daire, kiralik daire, kiralık daire, konut projesi, yeni proje, arsa yatirim, arsa yatırım, ticari gayrimenkul, bursa satilik daire, bursa kiralık daire, bursa yatirim, eskisehir yatirim firsati, karacabey arazi, satilik tarla, satılık tarla, emlak danışmanı, emlak danismani, gayrimenkul danışmanı, gayrimenkul danismani, yatirimlik daire, yatırımlık daire, sifir daire, sıfır daire, ikinci el daire, 2.el daire, mustakil ev, müstakil ev, villa, yazlik, yazlık, dublex, dubleks, triplex, tripleks, bahçeli ev, bahceli ev, deniz manzarali, deniz manzaralı, sehir merkezi, şehir merkezi, merkezi konum, site içinde, site icinde, güvenlikli site, guvenlikli site, otoparklı, otoparkli, asansörlü, asansorlu, kombili, doğalgazlı, dogalgazli, krediye uygun, acil satılık daire, kelepir daire, yatırımlık arsa, yatirimlik arsa, ticari dükkan, dukkan, mağaza, magaza, ofis, işyeri, isyeri, depo, fabrika, sanayi, satilik isyeri, kiralık işyeri, bursa nilüfer emlak, nilufer emlak, bursa osmangazi emlak, bursa yıldırım emlak, yildirim emlak, mudanya emlak, gemlik emlak, inegöl emlak, inegol emlak, kestel emlak, gürsu emlak, görükle emlak, gorukle emlak, fethiye emlak, çanakkale emlak, canakkale emlak';
</script>

<svelte:head>
	<title>{SITE_TITLE}</title>
	<meta name="description" content={SITE_DESCRIPTION} />
	<meta name="keywords" content={KEYWORDS} />

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
