const fields = {
    'buddies': ['id', 'theme', 'icon', 'name'],
    'bundles': ['id', 'name', 'description', 'icon'],
    'cards': ['id', 'theme', 'name', 'icon'],
    'chromas': ['name', 'icon'],
    'levels': ['name', 'icon'],
    'skins': ['id', 'name', 'tier', 'theme', 'icon', 'price'],
    'sprays': ['id', 'name', 'category', 'theme', 'icon', 'animation'],
    'titles': ['id', 'name', 'txt'],
    'weapons': ['id', 'name', 'category', 'icon'],
    'weaponsinfo': ['info'],
}

export function getInfo() {
    return fields;
}
