<script lang="ts">
	import { fade } from 'svelte/transition';
	import HeroSection from '$lib/components/HeroSection.svelte';
</script>

<svelte:head>
	<title>Hakkımızda | Dede Gayrimenkul</title>
</svelte:head>

<main class="bg-gray-50" in:fade>
	<HeroSection title="Hakkımızda" description="Dede Gayrimenkul Ofisi hakkında bilgilendirme" />
	<!-- Ana İçerik -->
	<section class="mx-auto max-w-6xl px-4 py-16">
		<div class="grid gap-12 md:grid-cols-2">
			<!-- Sol Taraf - Hikayemiz -->
			<div class="space-y-6">
				<h2 class="text-3xl font-bold text-amber-800">Hikayemiz</h2>
				<p class="text-gray-600">
					20 yılı aşkın süredir gayrimenkul sektöründe faaliyet gösteren Dede Gayrimenkul,
					müşterilerine güvenilir ve profesyonel hizmet sunma misyonuyla yola çıkmıştır.
					Kurulduğumuz günden bu yana, binlerce ailenin hayallerindeki eve kavuşmasına yardımcı
					olduk.
				</p>
				<p class="text-gray-600">
					Deneyimli ekibimiz ve müşteri odaklı yaklaşımımızla, gayrimenkul sektöründe güvenilir bir
					marka olarak hizmet vermeye devam ediyoruz. Her müşterimizin ihtiyaçlarını özenle dinliyor
					ve en uygun çözümleri sunuyoruz.
				</p>
			</div>

			<!-- Sağ Taraf - Değerlerimiz -->
			<div class="space-y-8">
				<h2 class="text-3xl font-bold text-amber-800">Değerlerimiz</h2>
				<div class="grid gap-6">
					<div class="flex gap-4">
						<div
							class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-100"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6 text-amber-800"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
								/>
							</svg>
						</div>
						<div>
							<h3 class="text-xl font-semibold text-gray-900">Güvenilirlik</h3>
							<p class="text-gray-600">
								Şeffaf ve dürüst iş anlayışımızla müşterilerimizin güvenini kazanıyoruz.
							</p>
						</div>
					</div>

					<div class="flex gap-4">
						<div
							class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-100"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6 text-amber-800"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M13 10V3L4 14h7v7l9-11h-7z"
								/>
							</svg>
						</div>
						<div>
							<h3 class="text-xl font-semibold text-gray-900">Profesyonellik</h3>
							<p class="text-gray-600">
								Uzman kadromuzla profesyonel ve kaliteli hizmet sunuyoruz.
							</p>
						</div>
					</div>

					<div class="flex gap-4">
						<div
							class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-100"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6 text-amber-800"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
								/>
							</svg>
						</div>
						<div>
							<h3 class="text-xl font-semibold text-gray-900">Müşteri Odaklılık</h3>
							<p class="text-gray-600">
								Her müşterimizin ihtiyaçlarını özenle dinliyor ve en uygun çözümleri sunuyoruz.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- İstatistikler -->
	<section class="bg-amber-800 py-16 text-white">
		<div class="mx-auto max-w-6xl px-4">
			<div class="grid grid-cols-2 gap-8 md:grid-cols-4">
				<div class="text-center">
					<div class="text-4xl font-bold">20+</div>
					<div class="mt-2">Yıllık Deneyim</div>
				</div>
				<div class="text-center">
					<div class="text-4xl font-bold">1000+</div>
					<div class="mt-2">Mutlu Müşteri</div>
				</div>
				<div class="text-center">
					<div class="text-4xl font-bold">500+</div>
					<div class="mt-2">Tamamlanan Satış</div>
				</div>
				<div class="text-center">
					<div class="text-4xl font-bold">50+</div>
					<div class="mt-2">Aktif Portföy</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Ekibimiz -->
	<section class="mx-auto max-w-6xl px-4 py-16">
		<h2 class="mb-12 text-center text-3xl font-bold text-amber-800">Ekibimiz</h2>
		<div class="grid gap-8 md:grid-cols-3">
			<div class="text-center">
				<img
					src="/team1.jpg"
					alt="Ahmet Dede"
					class="mx-auto mb-4 h-48 w-48 rounded-full object-cover"
				/>
				<h3 class="text-xl font-semibold">Ahmet Dede</h3>
				<p class="text-gray-600">Kurucu & Genel Müdür</p>
			</div>
			<div class="text-center">
				<img
					src="/team2.jpg"
					alt="Mehmet Dede"
					class="mx-auto mb-4 h-48 w-48 rounded-full object-cover"
				/>
				<h3 class="text-xl font-semibold">Mehmet Dede</h3>
				<p class="text-gray-600">Satış Müdürü</p>
			</div>
			<div class="text-center">
				<img
					src="/team3.jpg"
					alt="Ayşe Dede"
					class="mx-auto mb-4 h-48 w-48 rounded-full object-cover"
				/>
				<h3 class="text-xl font-semibold">Ayşe Dede</h3>
				<p class="text-gray-600">Pazarlama Müdürü</p>
			</div>
		</div>
	</section>
</main>
