import { getHeliblock } from "services/heliblocks";

export function fillHeliblocks(ids) {
    return Promise.all(ids.map( heliblockId => getHeliblock(heliblockId)))
}

export function splitArrayByAttribute(arr, attribute) {
    const withAttribute = [];
    const withOutAttribute = [];

    arr.forEach(obj => {
        if(obj[attribute] === true) {
            withAttribute.push(obj)
        } else {
            withOutAttribute.push(obj)
        }
    });
    return [withAttribute, withOutAttribute];
}

export function sortByLastUpdate(arr) {
    return arr.sort((a, b) =>  b.lastUpdate.seconds - a.lastUpdate.seconds)
}
