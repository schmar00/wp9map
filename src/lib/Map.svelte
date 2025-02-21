<script>
// @ts-nocheck

    import { onMount } from 'svelte';
    import * as scripts from './scripts.js'
    import Ror from '../assets/ror.svg'
    import * as config from './config.js'
    import { MapLibre, Marker, Popup, AttributionControl, Control } from "svelte-maplibre";

    export let selectedCategory
    export let searchTerm = ''
    export let descList = []
    export let markerArr = []
    export let initMarkerArr = []
    //export let data;
    let map;

    let rorArr = [];
    let mode = 'light';

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    function updateTheme(e) {
        if (e.matches) {
            mode = 'dark';
        } else {
            mode = 'light';
        }
    }

    // Initial check
    updateTheme(mediaQuery);

    // Add listener
    //mediaQuery.addEventListener('change', updateTheme);
    let coordArr = []

    onMount(markerStart);

    export async function markerStart() {
        rorArr = await fetch(config.ENDPOINT + '?query=' + encodeURIComponent(scripts.rorQuery) + '&Accept=application%2Fsparql-results%2Bjson')
			.then(res => res.json())
			.then(a => a.results.bindings.map(b => [b.l.value, scripts.rndCoords(b.latLong.value), b.page.value, b.s.value]));//   +'§'+rndCoords(b.latLong.value).join('§')));

        markerArr = await fetch(config.ENDPOINT + '?query=' + encodeURIComponent(scripts.initQuery) + '&Accept=application%2Fsparql-results%2Bjson')
			.then(res => res.json())
			.then(a => a.results.bindings.map(b => [
                b.title.value==''?b.label.value:b.title.value, // RDF label
                b.cat.value, // category summary
                scripts.rndCoords(b.coord.value.split(';')[0]), // first coordinate
                b.s.value, // smart URI
                -1, // count of matches
                b.shortForm.value, // if EGS member - acronym
                b.title.value, // if EGS member - label
                b.cat.value.split(';')
                    .filter(x => config.subjectsList.map(a=>a.title).includes(x.split('|')[0]))
                    .map(a=>a.split('|')) // category values array, filtered by subjectsList
            ]));
        initMarkerArr = markerArr;
        coordArr = markerArr.map(a => a[2].toString());
        coordArr = coordArr.filter(b => coordArr.filter(c => c==b).length > 1) //???
        console.log('markerArr', markerArr);
            //console.log('coordArr', coordArr);
            //console.log(map, map._containerId);
    }

    async function markerOnClick(clickedUri) {
        let query = '';
        if(searchTerm.length > 0){
            query = scripts.descQuery_kw.replace('§uri', clickedUri).replace('§kw', searchTerm);
        } else if (selectedCategory != null) {
            query = scripts.descQuery_cat.replace('§uri', clickedUri).replace('§topic', `?kw foaf:primaryTopic "${selectedCategory.title}" .`);
            //console.log(query);
        } else {
            query = scripts.descQuery_cat.replace('§uri', clickedUri).replace('§topic', '');
        }
        descList = await fetch(config.ENDPOINT + '?query=' + encodeURIComponent(query) + '&Accept=application%2Fsparql-results%2Bjson')
			.then(res => res.json())
			.then(a => descList = a.results.bindings.map(b => ({
                org:b.Org.value, 
                uri:b.o.value, 
                title:b.L.value, 
                desc:b.Desc.value, 
                sort1:b.sort1==undefined?'':b.sort1.value, 
                sort2:b.sort2==undefined?'':b.sort2.value,
                id:b.ID.value
            })).filter(c => c.id.indexOf('proj.europe') == -1))
            .then(a => descList = uniqueLinks(descList));
		    console.log('descList: ', descList);
    }

    function uniqueLinks(dL){
        let unique = [];
        dL.forEach(a => {
            if(!unique.some(b => b.title == a.title)){
                unique.push(a);
            }
        });
        return unique;
    }

    function mrkSize(m){
        let size = 'h-2.5 w-2.5';

        if (m[5]=='') { //partner organization
        
        } else if (m[4] > 0) { //keyword search
            let c = parseInt(m[4]); //console.log(c)
            let sum = markerArr.map(a => parseInt(a[4])).reduce((acc, currentValue) => acc + currentValue, 0,)
            size = c<sum*0.3?'h-3 w-3':c<sum*0.6?'h-5 w-5':'h-7 w-7';
        } else if (selectedCategory!=undefined) { //category search
            let c = parseInt(m[7].find(a => a[0] == selectedCategory.title)[3])
            size = c<12?'h-2.5 w-2.5':c<56?'h-4 w-4':'h-6 w-6';
        } else { //?
            
        }
        return size
    }


    // @ts-ignore
    function sum(mArr){
        return mArr.map(a => parseInt(a[1]) + parseInt(a[2])).reduce((acc, currentValue) => acc + currentValue, 0,);
    } 
    
    function getColor(topic) {
        return `${config.subjectsList.find(a => a.title==topic).bgColor} h-3 shadow`
    }

    function getStyle(count, sum) {
        return `width: ${Math.round(count/sum*100)}%;`
    }

    let markers = [{lngLat:[14, 52],label:'LABEL', name:'name'}, {lngLat:[14, 50],label:'LABELb', name:'nameb'}]
    let clickedName
    let mapClasses = "relative h-[500px] md:col-span-2 p-0 bg-white rounded-lg shadow dark:bg-gray-800"

    let basemap = `https://basemaps.cartocdn.com/gl/${mediaQuery.matches?'dark-matter':'positron'}-gl-style/style.json`
    //let basemap = `https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer/resources/styles/root.json`

    $: selectedCategory, markerArr = initMarkerArr;

</script>


<MapLibre style={basemap} class={mapClasses} standardControls attributionControl={false} zoom={2.7} center={[14, 52]}>
  <AttributionControl customAttribution={`GeoSphere Austria`}/>
  <!-- {#if markerArr.length > 0} -->

  {#each markerArr as m}
  {#if m[1].indexOf(selectedCategory==null?'':selectedCategory.title) > -1}
    <Marker lngLat={m[2]} on:click={markerOnClick(m[3])} 
        class="{mrkSize(m)} rounded-full border border-white border-1 border-opacity-80 bg-opacity-70 text-black text-xs font-semibold shadow-4xl cursor-pointer
        {parseInt(m[4])>0?'bg-red-500':parseInt(m[4])<0?(selectedCategory==undefined?'bg-sky-500':selectedCategory.bgColor):'bg-slate-500'}">

      <div class="ml-3 text-gray-900 dark:text-white whitespace-nowrap {m[5]=='GeoSphere'||m[5]=='GeoZS'?'-mt-2':''}">
        {m[5]}
      </div>
      
      <Popup openOn="click" let:close    offset={[0, -10]}>
        <div class="w-64 -mx-[12px] -my-[16px] px-3 pt-2 pb-3 rounded-lg shadow dark:bg-gray-700 text-[10px] text-gray-900 dark:text-white leading-tight break-words">
            <div class="mb-2 text-sm"><strong>{m[0]}</strong> <span class="text-[10px]">({m[7].length>0?sum(m[7]):m[4]})</span></div>
            {#each m[7] as s, i}
                {#if i < 4}
                <div class="relative flex mb-1">
                    <div style={getStyle(parseInt(s[1]),sum(m[7]))} class="{getColor(s[0])} bg-opacity-70 dark:bg-opacity-100"></div>
                    <div style={getStyle(parseInt(s[2]),sum(m[7]))} class="{getColor(s[0])} bg-opacity-30 dark:bg-opacity-70"></div>
                    <div class="absolute inset-0 flex items-center justify-end">
                        {s[0]} - {Math.round((parseInt(s[1])+parseInt(s[2]))/sum(m[7])*100)}%
                    </div>
                </div>
                {:else}
                <span>{s[0]} - {Math.round((parseInt(s[1])+parseInt(s[2]))/sum(m[7])*100)}%, </span>
                {/if}
            {/each}
         </div>
      </Popup>
      
    </Marker>
  {/if}  
  {/each}
  <!-- {/if} -->
  {#if markerArr.length < 1}
  <Control>
      <div role="status">
          <div class='flex space-x-2 justify-center items-center mt-[240px] mr-[370px] inline'>
              <span class='sr-only'>Loading...</span>
              <div class='h-4 w-4 bg-blue-500 bg-opacity-75 outline outline-offset-0 outline-white outline-2 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
              <div class='h-4 w-4 bg-blue-500 bg-opacity-75 outline outline-offset-0 outline-white outline-2 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
              <div class='h-4 w-4 bg-blue-500 bg-opacity-75 outline outline-offset-0 outline-white outline-2 rounded-full animate-bounce'></div>
         </div>
      </div>
  </Control>
  {/if}

</MapLibre>
