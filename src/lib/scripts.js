
export function rndCoords(l) {
	let x = Math.round(parseFloat(l.split(',')[0]) * 100) / 100
	let y = Math.round(parseFloat(l.split(',')[1]) * 100) / 100
	return [y, x]//reverse coords for maplibre
}

//initial markerArr - 
export const initQuery = `PREFIX wgs: <http://www.w3.org/2003/01/geo/wgs84_pos#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    PREFIX dcterms: <http://purl.org/dc/terms/>
    PREFIX eurio: <http://data.europa.eu/s66#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    SELECT DISTINCT ?s (MIN(?l) AS ?label) 
    (GROUP_CONCAT(DISTINCT ?co; separator=";") AS ?coord) 
    (GROUP_CONCAT(DISTINCT ?stat; separator=";") as ?cat)
    (COALESCE(?sf,'') AS ?shortForm) (COALESCE(?t,'') AS ?title) (COALESCE(?i,'') AS ?identifier)
    WHERE {
    {SELECT DISTINCT ?s (CONCAT(?c, '|', STR(COUNT(DISTINCT ?p)),'|',STR(COUNT(DISTINCT ?d)),'|',STR(COUNT(?kw))) AS ?stat)
        WHERE {
        ?s a eurio:Organisation . FILTER(REGEX(STR(?s),'org.europe'))
        {?o dcterms:relation ?s; rdf:type eurio:Project; dcterms:subject ?kw . 
        ?kw foaf:primaryTopic ?c . BIND(?o AS ?p)}
        UNION
        {?o dcterms:relation ?s; rdf:type <http://www.w3.org/ns/dcat#DataSet>; dcterms:subject ?kw . 
        ?kw foaf:primaryTopic ?c . BIND(?o AS ?d)}
        #FILTER(!REGEX(?c, 'Volcanology')) 
        #FILTER(!REGEX(?c, 'Geospatial Data and Mapping'))
        } GROUP BY ?s ?c ORDER BY DESC (COUNT(DISTINCT ?p) + COUNT(DISTINCT ?d))}
        ?s wgs:lat_long ?co; rdfs:label ?l . FILTER(lang(?l)='')
        OPTIONAL{?s dcterms:title ?t; eurio:shortForm ?sf; dcterms:identifier ?i .}
        FILTER(STRAFTER(STR(?s),'https://org.europe-geology.eu/')=?i || !BOUND(?i))
    }
    GROUP BY ?s ?t ?sf ?i
    ORDER BY ?shortForm`;

//rorArr
export const rorQuery = `PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    PREFIX dcterms: <http://purl.org/dc/terms/>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX wgs: <http://www.w3.org/2003/01/geo/wgs84_pos#>
    PREFIX wdt: <http://www.wikidata.org/prop/direct/>
    select distinct ?l ?latLong ?page ?s
    FROM <https://ror.org>
    WHERE {
        VALUES ?t {'geo' 'labor'}
        ?s dcterms:type ?t; rdfs:label ?l; wgs:lat_long ?latLong; foaf:page ?page; wdt:P571 ?since . 
        FILTER(REGEX(STR(?s),'ror.org'))
    } `;

//descList - organisation §uri = organisation, §topic = category name if exists
//${selected.title!=''?'?kw foaf:primaryTopic "'+selected.title+'".':''} 
export const descQuery_cat = `PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX dbo: <http://dbpedia.org/ontology/>
    PREFIX dcterms: <http://purl.org/dc/terms/>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    SELECT ?o (MIN(?l) AS ?L) (COALESCE(MIN(?desc),'') AS ?Desc) (MIN(?s) AS ?Org) (COALESCE(MIN(?id),?o) AS ?ID)
    (COUNT(DISTINCT ?kw) AS ?count)
    WHERE {
        VALUES ?s {<§uri>}
        ?o dcterms:subject ?kw; dcterms:relation ?s; rdfs:label ?l .
        OPTIONAL{?o dcterms:identifier ?id .}
        OPTIONAL{?o dcterms:description ?desc .} 
        §topic 
        FILTER(!REGEX(STR(?o),'earth/ncl'))
    } GROUP BY ?o
    ORDER BY DESC (?count)
    LIMIT 100`;

//descList - organisation §uri = organisation, §kw = keyword string
// todo: add sem dist 1 
export const descQuery_kw = `PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX dbo: <http://dbpedia.org/ontology/>
    PREFIX dcterms: <http://purl.org/dc/terms/>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    SELECT ?o (MIN(?l) AS ?L) (COALESCE(MIN(?desc),'') AS ?Desc) (MIN(?s) AS ?Org) ?searchTerm
    (CONTAINS(?L,STR(?searchTerm)) AS ?sort1) (CONTAINS(?Desc,STR(?searchTerm)) AS ?sort2)
    (COALESCE(MIN(?id),?o) AS ?ID)
    WHERE {
    VALUES ?s {<§uri>} VALUES ?searchTerm {'§kw'@en}
    VALUES ?p {skos:narrower skos:broader skos:related}
    ?kw skos:prefLabel ?searchTerm; ?p ?k .
    {?o dcterms:subject ?kw; dcterms:relation ?s; rdfs:label ?l .}
     UNION
    {?o dcterms:subject ?k; dcterms:relation ?s; rdfs:label ?l .}
     UNION
    {?s dcterms:subject ?kw; rdfs:label ?l . BIND(?s AS ?o)}
     UNION
    {?s dcterms:subject ?k; rdfs:label ?l . BIND(?s AS ?o)}
    OPTIONAL{?o dcterms:identifier ?id .}
    OPTIONAL{?o dcterms:description ?desc .} 
    FILTER(!REGEX(STR(?o),'earth/ncl'))
    } GROUP BY ?o ?searchTerm
    ORDER BY DESC (?sort1) (?sort2)`;    

//keyword markerArr - 
export const semQuery = `PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX dbo: <http://dbpedia.org/ontology/>
    PREFIX dcterms: <http://purl.org/dc/terms/>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    PREFIX wgs: <http://www.w3.org/2003/01/geo/wgs84_pos#>
    PREFIX eurio: <http://data.europa.eu/s66#>
    SELECT ('' AS ?cat) ?s (MIN(?l) AS ?label) (GROUP_CONCAT(DISTINCT ?co; separator=";") AS ?coord) 
    (COUNT(?x) AS ?count)
    (COALESCE(?sf,'') AS ?shortForm) (COALESCE(?t,'') AS ?title) (COALESCE(?i,'') AS ?identifier)
    WHERE { VALUES ?searchTerm {'§'@en} 
    VALUES ?p {skos:narrower skos:broader skos:related}
    ?kw skos:prefLabel ?searchTerm; ?p ?k .
    {?o dcterms:subject ?kw; dcterms:relation ?s . BIND(1 AS ?x)}
    UNION
    {?o dcterms:subject ?k; dcterms:relation ?s . }
    UNION
    {?s dcterms:subject ?kw .}
    UNION
    {?s dcterms:subject ?k .}
    ?s wgs:lat_long ?co; rdfs:label ?l . FILTER(lang(?l)='')
    FILTER(REGEX(STR(?s),'org.europe'))
    OPTIONAL{?s dcterms:title ?t; eurio:shortForm ?sf; dcterms:identifier ?i .}
    FILTER(STRAFTER(STR(?s),'https://org.europe-geology.eu/')=?i || !BOUND(?i))
    } GROUP BY ?s ?t ?sf ?i`;



