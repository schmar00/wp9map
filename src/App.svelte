<script>
    import Keyword from "./lib/Keyword.svelte";
    import Category from "./lib/Category.svelte";
    import Map from "./lib/Map.svelte";
    import List from "./lib/List.svelte";
    import gifmovie from "/src/map720.gif";

    let selectedCategory, searchTerm, descList, markerArr
    


</script>


<p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
    <span ><a class="text-red-500" href="https://en.wikipedia.org/wiki/Proof_of_concept#Software_development" target="_blank" title="A proof of concept (POC) demonstrates the feasibility of a proposed product, method, or idea.">
        [Proof of Concept]
    </a></span>
    - a map of Europe .. 
    <span class="font-bold">Geological Survey Organisations</span> plus <span class="font-bold">project-related partner</span> institutions .. <br>
    by scientific areas <span class="text-base">(linked keywords from <a href="https://ror.org">ROR</a>, <a href="https://explore.openaire.eu">OpenAIRE</a>, 
    <a href="https://cordis.europa.eu">CORDIS</a>, <a href="https://keep.eu">Interreg</a>, <a href="https://www.wikidata.org">WikiData</a>, <a href="https://metadata.europe-geology.eu">EGDI metadata</a>, 
    <a href="https://wp9.geoinformation.dev">GSEU Yellow Pages</a>, <a href="https://data.europa.eu/en">European data</a>, ..)</span>
    <span class="inline-flex">&nbsp; 
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="DodgerBlue" class="size-4">
          <path fill-rule="evenodd" d="M1 4.75C1 3.784 1.784 3 2.75 3h14.5c.966 0 1.75.784 1.75 1.75v10.515a1.75 1.75 0 0 1-1.75 1.75h-1.5c-.078 0-.155-.005-.23-.015H4.48c-.075.01-.152.015-.23.015h-1.5A1.75 1.75 0 0 1 1 15.265V4.75Zm16.5 7.385V11.01a.25.25 0 0 0-.25-.25h-1.5a.25.25 0 0 0-.25.25v1.125c0 .138.112.25.25.25h1.5a.25.25 0 0 0 .25-.25Zm0 2.005a.25.25 0 0 0-.25-.25h-1.5a.25.25 0 0 0-.25.25v1.125c0 .108.069.2.165.235h1.585a.25.25 0 0 0 .25-.25v-1.11Zm-15 1.11v-1.11a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 .25.25v1.125a.25.25 0 0 1-.164.235H2.75a.25.25 0 0 1-.25-.25Zm2-4.24v1.125a.25.25 0 0 1-.25.25h-1.5a.25.25 0 0 1-.25-.25V11.01a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 .25.25Zm13-2.005V7.88a.25.25 0 0 0-.25-.25h-1.5a.25.25 0 0 0-.25.25v1.125c0 .138.112.25.25.25h1.5a.25.25 0 0 0 .25-.25ZM4.25 7.63a.25.25 0 0 1 .25.25v1.125a.25.25 0 0 1-.25.25h-1.5a.25.25 0 0 1-.25-.25V7.88a.25.25 0 0 1 .25-.25h1.5Zm0-3.13a.25.25 0 0 1 .25.25v1.125a.25.25 0 0 1-.25.25h-1.5a.25.25 0 0 1-.25-.25V4.75a.25.25 0 0 1 .25-.25h1.5Zm11.5 1.625a.25.25 0 0 1-.25-.25V4.75a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 .25.25v1.125a.25.25 0 0 1-.25.25h-1.5Zm-9 3.125a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z" clip-rule="evenodd" />
        </svg>
        &nbsp; 
        <details class="text-xs cursor-pointer">
          <summary></summary>
          <img class="rounded-t-lg" src={gifmovie} alt="" />
        </details>
      </span>
</p>

<br><Category bind:selectedCategory bind:searchTerm bind:descList  /><br>

<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
 
    <Map bind:selectedCategory bind:searchTerm bind:descList bind:markerArr /> 
  
    <div class="max-h-[500px] overflow-auto">
        <Keyword bind:selectedCategory bind:searchTerm bind:markerArr/>
        <List bind:descList />
    </div>
    
</div>




