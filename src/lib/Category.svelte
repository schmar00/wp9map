<script>
  import * as config from './config.js'
  export let selectedCategory = null
  export let searchTerm = ''
  export let descList = []
  /* export let markerArr
  export let initMarkerArr */

</script>

<div class="flex flex-wrap">
  {#each config.subjectsList as s}
    <div class="flex items-center me-4">
      <input on:click={() => {searchTerm = ''; descList = [];}} id="{s.title}-radio" type="radio" value={s} 
          bind:group={selectedCategory} class={s.accColor}>
      <label for="{s.title}-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          {s.title}
      </label>
    </div>
  {/each} 
</div>

