export const ENDPOINT = 'https://resource.geosphere.at/graphdb/repositories/WP9-TEST';

export const subjectsList = [
    {title: 'Climate change', accColor: 'accent-red-500', bgColor: 'bg-red-500'},
    {title: 'Mineral resources', accColor: 'accent-teal-700', bgColor: 'bg-teal-500'},
    {title: 'Critical raw materials (CRM)', accColor: 'accent-teal-500', bgColor: 'bg-teal-500'},
    {title: 'Geoenergy', accColor: 'accent-purple-500', bgColor: 'bg-purple-500'},
    {title: 'CO2 storage (CCS)', accColor: 'accent-slate-500', bgColor: 'bg-slate-500'},
    {title: 'Geophysics', accColor: 'accent-yellow-500', bgColor: 'bg-yellow-500'},
    {title: 'Volcanology', accColor: 'accent-fuchsia-500', bgColor: 'bg-fuchsia-500'},
    {title: 'Seismology', accColor: 'accent-fuchsia-500', bgColor: 'bg-fuchsia-500'},
    {title: 'Natural hazards', accColor: 'accent-red-500', bgColor: 'bg-red-500'},
    //{title: 'Environmental geosciences', accColor: 'accent-green-500', bgColor: 'bg-green-500'},
    {title: 'Soil science', accColor: 'accent-orange-500', bgColor: 'bg-orange-500'},
    {title: 'Hydrogeology', accColor: 'accent-sky-500', bgColor: 'bg-sky-500'},
    {title: 'Marine geology', accColor: 'accent-indigo-500', bgColor: 'bg-indigo-500'},
    //{title: 'Tectonics', accColor: 'accent-slate-500', bgColor: 'bg-slate-500'},
    {title: 'Structural geology', accColor: 'accent-pink-500', bgColor: 'bg-pink-500'},
    {title: 'Geochemistry', accColor: 'accent-orange-500', bgColor: 'bg-orange-500'},
    //{title: 'Paleontology', accColor: 'accent-green-500', bgColor: 'bg-green-500'},
    //{title: 'Geospatial data and mapping', accColor: 'accent-violet-500', bgColor: 'bg-violet-500'}
	];
/* slate, red, orange, yellow, lime, green, ?emerald, teal, cyan, ?sky, blue, indigo, 
violet, purple, fuchsia, pink, ?rose */

export function getCls(cls, color, pct) {
    switch (cls) {
        case 'radio': return `accent-${color} w-5 h-4`;
        case 'segment': return `w-[${pct}%] bg-${color} m-1`;
    }
}

// mFill, mSize, and later (mOpac, mStroke, mWidth, mStrOpac)
export const mrk = ['#0084d1', '5', '0.8', 'white', '2', '0.5'];

