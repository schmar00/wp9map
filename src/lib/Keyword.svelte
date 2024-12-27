<script>
    import { distance } from 'fastest-levenshtein';
    import { keywords } from './keywords';
    import * as config from './config.js'
    import * as scripts from './scripts.js'

    export let selectedCategory;
    export let searchTerm = '';
    export let markerArr

    let wordArr = keywords.map(a => a[1]);
    let showBtn = true;
    const btnToggle = () => (showBtn = !showBtn);

    async function kwMarkerArr(x){
        //console.log(scripts.semQuery.replace('§',searchTerm))
        markerArr = [];
        markerArr = await fetch(config.ENDPOINT + '?query=' + encodeURIComponent(scripts.semQuery.replace('§',x)) + '&Accept=application%2Fsparql-results%2Bjson')
			.then(res => res.json())
			.then(a => a.results.bindings.map(b => [b.title.value==''?b.label.value:b.title.value, b.cat.value, scripts.rndCoords(b.coord.value.split(';')[0]), b.s.value, b.count.value, b.shortForm.value, b.title.value, []]));        
			console.log('markerArr', markerArr);  
    }

</script>
<div class="p-2 m-1">
    <input bind:value={searchTerm} on:input={() => showBtn = true} type="text" id="first_name"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="search by keyword" required />
    <div class:hidden={!showBtn}>
    {#each wordArr.filter(a => (distance(searchTerm, a.slice(0, searchTerm.length + 1)) < 2  || a.indexOf(searchTerm) > 0 ) && searchTerm.length > 2) as k}
         <button on:click={btnToggle} 
            on:click={()=>{kwMarkerArr(k); selectedCategory = null; searchTerm=k;}} 
            class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-1 me-2 mt-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
            {k}
        </button>
    {/each}
    </div>
</div>

<!-- setMarkers('VALUES ?kw {<'+keywords.find(a=>(a[1]==k))[0]+'>}'); console.log(keywords.find(a=>(a[1]==k)).join('-')) -->