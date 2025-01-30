function genrateSlug(value) {
    let uniqueSlug 
    
    uniqueSlug = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');

    uniqueSlug += Date.now();

    return uniqueSlug;
}

export default genrateSlug;