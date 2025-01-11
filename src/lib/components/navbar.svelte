<script lang="ts">
	import { page } from '$app/state';
	import { watch } from 'runed';

	let isMobileMenuOpen = $state(false);

	const toggleMobileMenu = () => {
		isMobileMenuOpen = !isMobileMenuOpen;
	};

	watch(
		() => page.url.pathname,
		() => {
			isMobileMenuOpen = false;
		}
	);
</script>

<nav class="fixed left-0 right-0 top-0 z-50 bg-amber-50 shadow-lg">
	<div class="mx-auto max-w-7xl px-4">
		<div class="flex h-16 justify-between">
			<!-- Logo -->
			<div class="flex items-center">
				<img src="/DedeEmlakLogo.svg" alt="Dede Gayrimenkul" class="size-20" />
			</div>

			<!-- Masaüstü Menü -->
			<div class="hidden items-center space-x-8 md:flex">
				<a href="/" class="text-amber-900 hover:text-amber-700">Ana Sayfa</a>
				<a href="/hakkimizda" class="text-amber-900 hover:text-amber-700">Hakkımızda</a>

				<!-- Dropdown Container -->
				<div class="group relative">
					<button class="flex items-center text-amber-900 hover:text-amber-700 focus:outline-none">
						<a href="/gayrimenkul" class="mr-1">Gayrimenkul</a>
						<svg
							class="h-4 w-4 transition-transform duration-200 group-hover:rotate-180"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</button>

					<div
						class="invisible absolute right-0 z-50 mt-2 w-48 rounded-md bg-amber-50 py-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100"
					>
						<a
							href="/gayrimenkul?type=sale"
							class="block px-4 py-2 text-amber-900 hover:bg-amber-100"
						>
							Satılık
						</a>
						<a
							href="/gayrimenkul?type=rent"
							class="block px-4 py-2 text-amber-900 hover:bg-amber-100"
						>
							Kiralık
						</a>
						<a href="/gayrimenkul" class="block px-4 py-2 text-amber-900 hover:bg-amber-100">
							Tümü
						</a>
					</div>
				</div>

				<a href="/iletisim" class="text-amber-900 hover:text-amber-700">İletişim</a>
			</div>

			<!-- Mobil Menü Butonu -->
			<div class="flex items-center md:hidden">
				<button
					onclick={toggleMobileMenu}
					class="text-amber-900 hover:text-amber-700"
					aria-label="Mobil menü"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
			</div>
		</div>

		<!-- Mobil Menü -->
		<div
			class="absolute left-0 right-0 overflow-hidden bg-white font-bold shadow shadow-zinc-200 md:hidden md:font-normal"
			style="max-height: {isMobileMenuOpen
				? '400px'
				: '0px'}; transition: max-height 0.3s ease-in-out;"
		>
			<div class="flex flex-col gap-2 pb-3 pt-2">
				<a
					href="/"
					class="flex items-center justify-center px-3 py-2 text-gray-700 hover:bg-gray-100"
				>
					Ana Sayfa
				</a>
				<a
					href="/hakkimizda"
					class="flex items-center justify-center px-3 py-2 text-gray-700 hover:bg-gray-100"
					>Hakkımızda</a
				>
				<a
					href="/gayrimenkul"
					class="flex items-center justify-center px-3 py-2 text-gray-700 hover:bg-gray-100"
				>
					Gayrimenkul
				</a>
				<div class="font-normal">
					<a
						href="/gayrimenkul?type=sale"
						class="flex items-center justify-center px-3 py-2 text-gray-700 hover:bg-gray-100"
					>
						Satılık
					</a>
					<a
						href="/gayrimenkul?type=rent"
						class="flex items-center justify-center px-3 py-2 text-gray-700 hover:bg-gray-100"
					>
						Kiralık
					</a>
					<a
						href="/gayrimenkul"
						class="flex items-center justify-center px-3 py-2 text-gray-700 hover:bg-gray-100"
					>
						Tümü
					</a>
				</div>
				<a
					href="/iletisim"
					class="flex items-center justify-center px-3 py-2 text-gray-700 hover:bg-gray-100"
					>İletişim</a
				>
			</div>
		</div>
	</div>
</nav>

<!-- Navbar'ın yüksekliği kadar boşluk bırak -->
<div class="h-16"></div>
