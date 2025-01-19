<script lang="ts">
	import { page } from '$app/state';
	import { watch } from 'runed';
	import { mode, setMode } from 'mode-watcher';
	import 'iconify-icon';
	import { onMount } from 'svelte';

	let isMobileMenuOpen = $state(false);
	let navbar: HTMLElement;

	const toggleMobileMenu = () => {
		isMobileMenuOpen = !isMobileMenuOpen;
	};

	// Sayfa değiştiğinde menüyü kapat
	watch(
		() => page.url.pathname,
		() => {
			isMobileMenuOpen = false;
		}
	);

	// Scroll olduğunda menüyü kapat
	let lastScrollY = 0;
	function handleScroll() {
		const currentScrollY = window.scrollY;
		if (Math.abs(currentScrollY - lastScrollY) > 10) {
			isMobileMenuOpen = false;
		}
		lastScrollY = currentScrollY;
	}

	// Dışarı tıklandığında menüyü kapat
	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (isMobileMenuOpen && navbar && !navbar.contains(target)) {
			isMobileMenuOpen = false;
		}
	}

	onMount(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });
		document.addEventListener('click', handleClickOutside);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			document.removeEventListener('click', handleClickOutside);
		};
	});

	function toggleDarkMode() {
		setMode($mode === 'dark' ? 'light' : 'dark');
	}
</script>

<nav
	bind:this={navbar}
	class="fixed left-0 right-0 top-0 z-50 bg-amber-50 shadow-lg dark:bg-gray-800"
>
	<div class="mx-auto max-w-7xl px-4">
		<div class="flex h-16 justify-between">
			<!-- Logo -->
			<div class="flex items-center">
				<img src="/DedeEmlakLogo.svg" alt="Dede Gayrimenkul" class="size-20" />
			</div>

			<!-- Masaüstü Menü -->
			<div class="hidden items-center space-x-8 md:flex">
				<a
					href="/"
					class="text-amber-900 hover:text-amber-700 dark:text-amber-100 dark:hover:text-amber-300"
					>Ana Sayfa</a
				>
				<a
					href="/hakkimizda"
					class="text-amber-900 hover:text-amber-700 dark:text-amber-100 dark:hover:text-amber-300"
					>Hakkımızda</a
				>

				<!-- Dropdown Container -->
				<div class="group relative">
					<button
						class="flex items-center text-amber-900 hover:text-amber-700 focus:outline-none dark:text-amber-100 dark:hover:text-amber-300"
					>
						<a href="/gayrimenkul" class="mr-1">Gayrimenkul</a>
						<iconify-icon
							icon="mdi:chevron-down"
							class="text-xl transition-transform duration-200 group-hover:rotate-180"
						></iconify-icon>
					</button>

					<div
						class="invisible absolute right-0 z-50 mt-2 w-48 rounded-md bg-amber-50 py-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100 dark:bg-gray-700"
					>
						<a
							href="/gayrimenkul?type=sale"
							class="block px-4 py-2 text-amber-900 hover:bg-amber-100 dark:text-amber-100 dark:hover:bg-gray-600"
						>
							Satılık
						</a>
						<a
							href="/gayrimenkul?type=rent"
							class="block px-4 py-2 text-amber-900 hover:bg-amber-100 dark:text-amber-100 dark:hover:bg-gray-600"
						>
							Kiralık
						</a>
						<a
							href="/gayrimenkul"
							class="block px-4 py-2 text-amber-900 hover:bg-amber-100 dark:text-amber-100 dark:hover:bg-gray-600"
						>
							Tümü
						</a>
					</div>
				</div>

				<a
					href="/iletisim"
					class="text-amber-900 hover:text-amber-700 dark:text-amber-100 dark:hover:text-amber-300"
					>İletişim</a
				>
			</div>

			<!-- Mobil Menü Butonu ve Dark Mode Toggle -->
			<div class="flex items-center gap-2 md:hidden">
				<button
					onclick={toggleMobileMenu}
					class="text-amber-900 hover:text-amber-700 dark:text-amber-100 dark:hover:text-amber-300"
					aria-label="Mobil menü"
				>
					<iconify-icon icon="mdi:menu" class="text-xl"></iconify-icon>
				</button>

				<button
					onclick={toggleDarkMode}
					class="rounded-lg p-2 text-amber-900 hover:bg-amber-100 dark:text-amber-100 dark:hover:bg-gray-700"
					aria-label="Tema değiştir"
				>
					{#if $mode === 'dark'}
						<iconify-icon icon="mdi:white-balance-sunny" class="text-xl"></iconify-icon>
					{:else}
						<iconify-icon icon="mdi:moon-waning-crescent" class="text-xl"></iconify-icon>
					{/if}
				</button>
			</div>

			<!-- Dark Mode Toggle (Desktop) -->
			<div class="hidden items-center space-x-2 md:flex">
				<button
					onclick={toggleDarkMode}
					class="rounded-lg p-2 text-amber-900 hover:bg-amber-100 dark:text-amber-100 dark:hover:bg-gray-700"
					aria-label="Tema değiştir"
				>
					{#if $mode === 'dark'}
						<iconify-icon icon="mdi:white-balance-sunny" class="text-xl"></iconify-icon>
					{:else}
						<iconify-icon icon="mdi:moon-waning-crescent" class="text-xl"></iconify-icon>
					{/if}
				</button>
			</div>
		</div>

		<!-- Mobil Menü -->
		<div
			class="absolute left-0 right-0 overflow-hidden bg-white font-bold shadow shadow-zinc-200 dark:bg-gray-800 dark:shadow-zinc-900 md:hidden md:font-normal"
			style="max-height: {isMobileMenuOpen
				? '400px'
				: '0px'}; transition: max-height 0.3s ease-in-out;"
		>
			<div class="flex flex-col gap-2 pb-3 pt-2">
				<a
					href="/"
					class="flex items-center justify-center px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
				>
					Ana Sayfa
				</a>
				<a
					href="/hakkimizda"
					class="flex items-center justify-center px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
				>
					Hakkımızda
				</a>
				<a
					href="/gayrimenkul"
					class="flex items-center justify-center px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
				>
					Gayrimenkul
				</a>
				<div class="font-normal">
					<a
						href="/gayrimenkul?type=sale"
						class="flex items-center justify-center px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
					>
						Satılık
					</a>
					<a
						href="/gayrimenkul?type=rent"
						class="flex items-center justify-center px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
					>
						Kiralık
					</a>
					<a
						href="/gayrimenkul"
						class="flex items-center justify-center px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
					>
						Tümü
					</a>
				</div>
				<a
					href="/iletisim"
					class="flex items-center justify-center px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
				>
					İletişim
				</a>
			</div>
		</div>
	</div>
</nav>

<!-- Navbar'ın yüksekliği kadar boşluk bırak -->
<div class="h-16"></div>
