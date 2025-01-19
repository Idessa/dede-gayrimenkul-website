<script lang="ts">
	import { fade } from 'svelte/transition';
	import HeroSection from '$lib/components/HeroSection.svelte';
</script>

<svelte:head>
	<title>Hakkımızda | Dede Gayrimenkul</title>
</svelte:head>

<main class="bg-gray-50 dark:bg-gray-900" in:fade>
	<HeroSection title="Hakkımızda" description="Dede Gayrimenkul Ofisi hakkında bilgilendirme" />
	<!-- Ana İçerik -->
	<section class="mx-auto max-w-6xl px-4 py-16">
		<div class="grid gap-12 md:grid-cols-2">
			<!-- Sol Taraf - Hikayemiz -->
			<div class="space-y-6">
				<h2 class="text-3xl font-bold text-amber-800 dark:text-amber-200">
					32 Yıllık Tecrübeyle Güvenilir Hizmet
				</h2>
				<p class="text-gray-600 dark:text-gray-300">
					32 yıldır gayrimenkul sektöründe faaliyet gösteren Dede Gayrimenkul Yatırımları,
					müşterilerine güvenilir ve profesyonel hizmet sunma misyonuyla yola çıkmıştır.
					Kurulduğumuz günden bu yana, binlerce ailenin hayallerindeki eve kavuşmasına yardımcı
					olduk. Deneyimli ekibimiz ve müşteri odaklı yaklaşımımızla, gayrimenkul sektöründe
					güvenilir bir marka olarak hizmet vermeye devam ediyoruz. Her müşterimizin ihtiyaçlarını
					özenle dinliyor ve en uygun çözümleri sunuyoruz.
				</p>
				<p class="text-gray-600 dark:text-gray-300">
					Deneyimli ekibimiz ve müşteri odaklı yaklaşımımızla, gayrimenkul sektöründe güvenilir bir
					marka olarak hizmet vermeye devam ediyoruz. Her müşterimizin ihtiyaçlarını özenle dinliyor
					ve en uygun çözümleri sunuyoruz.
				</p>
			</div>

			<!-- Sağ Taraf - Değerlerimiz -->
			<div class="space-y-8">
				<h2 class="text-3xl font-bold text-amber-800 dark:text-amber-200">Değerlerimiz</h2>
				<div class="grid gap-6">
					<div class="flex gap-4">
						<div
							class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/20"
						>
							<iconify-icon
								icon="mdi:shield-check"
								class="text-2xl text-amber-800 dark:text-amber-200"
							></iconify-icon>
						</div>
						<div>
							<h3 class="text-xl font-semibold text-gray-900 dark:text-white">Güvenilirlik</h3>
							<p class="text-gray-600 dark:text-gray-300">
								Şeffaf ve dürüst iş anlayışımızla müşterilerimizin güvenini kazanıyoruz.
							</p>
						</div>
					</div>

					<div class="flex gap-4">
						<div
							class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/20"
						>
							<iconify-icon
								icon="mdi:lightning-bolt"
								class="text-2xl text-amber-800 dark:text-amber-200"
							></iconify-icon>
						</div>
						<div>
							<h3 class="text-xl font-semibold text-gray-900 dark:text-white">Profesyonellik</h3>
							<p class="text-gray-600 dark:text-gray-300">
								Uzman kadromuzla profesyonel ve kaliteli hizmet sunuyoruz.
							</p>
						</div>
					</div>

					<div class="flex gap-4">
						<div
							class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/20"
						>
							<iconify-icon
								icon="mdi:account-group"
								class="text-2xl text-amber-800 dark:text-amber-200"
							></iconify-icon>
						</div>
						<div>
							<h3 class="text-xl font-semibold text-gray-900 dark:text-white">Müşteri Odaklılık</h3>
							<p class="text-gray-600 dark:text-gray-300">
								Her müşterimizin ihtiyaçlarını özenle dinliyor ve en uygun çözümleri sunuyoruz.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- İstatistikler -->
	<section class="bg-amber-800 py-16 text-white dark:bg-amber-900">
		<div class="mx-auto max-w-6xl px-4">
			<div class="grid grid-cols-2 gap-8 md:grid-cols-4">
				<div class="text-center">
					<div class="text-4xl font-bold">32+</div>
					<div class="mt-2 text-amber-100">Yıllık Deneyim</div>
				</div>
				<div class="text-center">
					<div class="text-4xl font-bold">1000+</div>
					<div class="mt-2 text-amber-100">Mutlu Müşteri</div>
				</div>
				<div class="text-center">
					<div class="text-4xl font-bold">500+</div>
					<div class="mt-2 text-amber-100">Tamamlanan Satış</div>
				</div>
				<div class="text-center">
					<div class="text-4xl font-bold">50+</div>
					<div class="mt-2 text-amber-100">Aktif Portföy</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Ekibimiz -->
</main>
