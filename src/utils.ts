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

const connections = {
    'buddies': {
        'bundle': ['id_bundle', 'id']
    },
    'bundle': {
        'buddies': ['id', 'id_bundle'],
        'spray': ['id', 'id_bundle'],
        'title': ['id', 'id_bundle'],
        'cards': ['id', 'id_bundle'],
        'skins': ['id', 'id_bundle'],
    },
    'cards': {
        'bundle': ['id_bundle', 'id']
    },
    'chroma': {
        'skin': ['id_skin', 'id']
    },
    'level': {
        'skin': ['id_skin', 'id']
    },
    'skins': {
        'weapon': ['id_weapon', 'id'],
        'bundle': ['id_bundle', 'id'],
        'level': ['id', 'id_skin'],
        'chroma': ['id', 'id_skin'],
    },
    'spray': {
        'bundle': ['id_bundle', 'id']
    },
    'title': {
        'bundle': ['id_bundle', 'id']
    },
    'weapons': {
        'weaponinfo': ['id', 'id_weapon'],
        'skins': ['id', 'id_weapon'],
    },
    'weaponsinfo': {
        'weapon': ['id_weapon', 'id']
    },
}

export function getInfo() {
    return fields;
}

export function getConnections() {
    return connections;
}