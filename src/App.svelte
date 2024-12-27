<script>
    import Keyword from "./lib/Keyword.svelte";
    import Category from "./lib/Category.svelte";
    import Map from "./lib/Map.svelte";
    import List from "./lib/List.svelte";

    let selectedCategory, searchTerm, descList, markerArr
    


</script>


<p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
    <span ><a class="text-red-500" href="https://en.wikipedia.org/wiki/Proof_of_concept#Software_development" target="_blank" title="A proof of concept (POC) demonstrates the feasibility of a proposed product, method, or idea.">
        [Proof of Concept]
    </a></span>
    - a map of Europe .. 
    <span class="font-bold">Geological Survey Organisations</span> plus <span class="font-bold">project-related partner</span> institutions .. <br>
    by scientific areas <span class="text-base">(linked keywords from <a href="https://ror.org">ROR</a>, <a href="https://explore.openaire.eu">OpenAIRE</a>, 
    <a href="https://cordis.europa.eu">CORDIS</a>, <a href="https://keep.eu">Interreg</a>, <a href="https://www.wikidata.org">WikiData</a>, <a href="https://metadata.europe-geology.eu">EGDI</a>, 
    <a href="https://wp9.geoinformation.dev">GSEU-WP9</a>, ..)</span>
    
</p>

<br><Category bind:selectedCategory bind:searchTerm bind:descList  /><br>

<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
 
    <Map bind:selectedCategory bind:searchTerm bind:descList bind:markerArr /> 
  
    <div class="max-h-[500px] overflow-auto">
        <Keyword bind:selectedCategory bind:searchTerm bind:markerArr/>
        <List bind:descList />
    </div>
    
</div>




