# Svelte + Vite

This template should help get you started developing with Svelte in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

## notes
```
npm create vite@latest  
```  
-> wp9map  
select Svelte  
select JavaScript  
  
```  
cd wp9map  
npm install  
npm run dev  
```  
  
in app.svelte ->  
```  
	<script>  
	 let count = $state(0);  
	</script>  
	<button onclick={() => count++}>  
	 clicks: {count}  
	</button>  
```  
legacy -> runes mode !!  
__________________________________________  
  
```  
npx svelte-add@latest tailwindcss  
npm i  
npm run dev  
```  
```  
tailwind.config.js ??? ->  
/** @type {import('tailwindcss').Config} */  
export default {  
  content: ["./src/**/*.{html,js,svelte,ts}",  
    './pages/**/*.{html,js}',  
    './components/**/*.{html,js}',  
  ],  
  
  theme: {  
    extend: {}  
  },  
  
  plugins: []  
};  
```

  
![](https://github.com/schmar00/wp9map/blob/main/src/wp9map.gif)
