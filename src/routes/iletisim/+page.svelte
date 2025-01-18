<script lang="ts">
	import { fade } from 'svelte/transition';
	import HeroSection from '$lib/components/HeroSection.svelte';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form } = $props<{ form: ActionData }>();
	let formState = $state({
		creating: false,
		success: undefined as boolean | undefined
	});

	// Form verilerini tutacak state ekleyelim
	let formData = $state({
		name: '',
		email: '',
		phone: '',
		message: ''
	});

	const submitCreateMessage = () => {
		formState.creating = true;
		return async ({ result, update }: { result: any; update: any }) => {
			await update();
			formState.success = result.type === 'success';
			formState.creating = false;

			// 3 saniye sonra durumu sıfırla
			setTimeout(() => {
				formState.success = undefined;
			}, 3000);
		};
	};
</script>

<svelte:head>
	<title>İletişim | Dede Gayrimenkul</title>
</svelte:head>

<main class="" in:fade>
	<!-- Hero Section -->
	<HeroSection
		title="İletişime Geçin"
		description="Sizinle çalışmaktan ve size yardımcı olmaktan mutluluk duyarız."
	/>

	<!-- Ana İçerik -->
	<section class="mx-auto max-w-6xl px-4 py-16">
		<div class="grid gap-12 md:grid-cols-2">
			<!-- Sol Taraf - İletişim Bilgileri -->
			<div class="space-y-8">
				<div>
					<h2 class="text-3xl font-bold text-amber-800">Bize Ulaşın</h2>
					<p class="mt-4 text-gray-600">
						Gayrimenkul danışmanlığı konusunda profesyonel hizmet almak için bizimle iletişime
						geçebilirsiniz.
					</p>
				</div>

				<div class="space-y-6">
					<div class="flex items-start gap-4">
						<div
							class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-100"
						>
							<svg
								class="h-6 w-6 text-amber-800"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
								/>
							</svg>
						</div>
						<div>
							<h3 class="mb-2 text-xl font-semibold text-gray-900">Telefon</h3>
							<a class="text-gray-600" href="tel:+902244532228">+90 224 453 22 28</a>
						</div>
					</div>

					<div class="flex items-start gap-4">
						<div
							class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-100"
						>
							<svg
								class="h-6 w-6 text-amber-800"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								/>
							</svg>
						</div>
						<div>
							<h3 class="mb-2 text-xl font-semibold text-gray-900">E-posta</h3>
							<a class="text-gray-600" href="mailto:acilarazi.com@gmail.com">
								acilarazi.com@gmail.com
							</a>
						</div>
					</div>

					<div class="flex items-start gap-4">
						<div
							class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-100"
						>
							<svg
								class="h-6 w-6 text-amber-800"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
								/>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
						</div>
						<div>
							<h3 class="text-xl font-semibold text-gray-900">Adres</h3>
							<p class="mt-2 text-gray-600">
								Fulya mahallesi Büyükdere caddesi no:7 kapı no:62 <br />
								şisli/İstanbul/Türkiye
							</p>
						</div>
					</div>

					<div class="flex items-start gap-4">
						<div
							class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-100"
						>
							<svg
								class="h-6 w-6 text-amber-800"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<div>
							<h3 class="text-xl font-semibold text-gray-900">Çalışma Saatleri</h3>
							<p class="mt-2 text-gray-600">
								Pazartesi - Cumartesi: 09:00 - 18:00<br />
								Pazar: Kapalı
							</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Sağ Taraf - İletişim Formu -->
			<div class="rounded-lg bg-white p-8 shadow-lg">
				<h2 class="text-2xl font-bold text-amber-800">Mesaj Gönderin</h2>
				<p class="mt-2 text-gray-600">Size en kısa sürede dönüş yapacağız.</p>
				{#if form?.success}
					<div class="mb-4 rounded-md bg-green-50 p-4 text-green-800">
						{form.message}
					</div>
				{:else if form?.error}
					<div class="mb-4 rounded-md bg-red-50 p-4 text-red-800">
						{form.message}
					</div>
				{/if}
				<form
					class="mt-8 space-y-6"
					action="?/create"
					method="POST"
					use:enhance={submitCreateMessage}
				>
					<div>
						<label for="name" class="block text-sm font-medium text-gray-700">Ad Soyad</label>
						<input
							type="text"
							id="name"
							name="name"
							bind:value={formData.name}
							required
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
						/>
					</div>

					<div>
						<label for="email" class="block text-sm font-medium text-gray-700">E-posta</label>
						<input
							type="email"
							id="email"
							name="email"
							bind:value={formData.email}
							required
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
						/>
					</div>

					<div>
						<label for="phone" class="block text-sm font-medium text-gray-700">Telefon</label>
						<input
							type="tel"
							id="phone"
							name="phone"
							bind:value={formData.phone}
							required
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
						/>
					</div>

					<div>
						<label for="message" class="block text-sm font-medium text-gray-700">Mesajınız</label>
						<textarea
							id="message"
							name="message"
							bind:value={formData.message}
							rows="4"
							required
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
						></textarea>
					</div>

					<button
						type="submit"
						disabled={formState.creating}
						class="relative w-full rounded-md bg-amber-800 py-2 text-white transition-all hover:bg-amber-700 disabled:opacity-50"
					>
						{#if formState.creating}
							<div class="flex items-center justify-center gap-2">
								<iconify-icon icon="line-md:loading-twotone-loop" class="text-xl"></iconify-icon>
								<span>Gönderiliyor...</span>
							</div>
						{:else if formState.success !== undefined}
							<div class="flex items-center justify-center gap-2" transition:fade>
								{#if formState.success}
									<div class="flex items-center gap-2 text-white">
										<iconify-icon icon="line-md:confirm-circle" class="text-xl"></iconify-icon>
										<span>Gönderildi!</span>
									</div>
								{:else}
									<div class="flex items-center gap-2 text-white">
										<iconify-icon icon="line-md:close-circle" class="text-xl"></iconify-icon>
										<span>Gönderim başarısız</span>
									</div>
								{/if}
							</div>
						{:else}
							Gönder
						{/if}
					</button>
				</form>
			</div>
		</div>
	</section>

	<!-- Harita -->
	<section class="mx-auto mb-10 h-[400px] w-full max-w-6xl">
		<iframe
			src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.6504900120997!2d29.0307!3d40.9907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDU5JzI2LjUiTiAyOcKwMDEnNTAuNiJF!5e0!3m2!1str!2str!4v1625836789012!5m2!1str!2str"
			width="100%"
			class="rounded-lg"
			height="100%"
			style="border:0;"
			allowfullscreen
			loading="lazy"
			title="Dede Gayrimenkul Konum"
		></iframe>
	</section>
</main>

<style lang="postcss">
	input,
	textarea {
		@apply border-gray-300;
	}
</style>
