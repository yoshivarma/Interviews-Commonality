<div class="shadow-lg rounded-xl w-full md:w-80 p-4 bg-gray-800 relative overflow-hidden">
	<div class="w-full flex items-center justify-between mb-6">
		<p class="text-white text-xl font-medium">Cases</p>
		<button
			class="flex items-center hover:text-black text-gray-50 hover:text-white border-0 focus:outline-none"
		>
			<svg
				width="20"
				height="20"
				fill="currentColor"
				viewBox="0 0 1792 1792"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z"
				/>
			</svg>
		</button>
	</div>
	{#each [1, 2, 3] as i}
		<div class="flex items-center mb-2 rounded justify-between p-3">
			<span class="rounded-lg p-2 bg-white">
				<div class="px-2">{i}</div>
			</span>
			<div class="flex w-full ml-2 items-center justify-between text-white">
				<p>Case {i}</p>
				<div class="">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
					</svg>
				</div>
			</div>
		</div>
	{/each}
</div>
