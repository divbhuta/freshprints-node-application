const fetchParticularSKUDataWithIndex = (data, key, value) => {
    let itemIndex = -1;
    const filteredItem = data.filter((item, index) => {
        if (item[key]?.toLowerCase() === value?.toLowerCase()) {
            itemIndex = index;
            return true
        }
        return false;
    })
    return {
        item: filteredItem[0],
        itemIndex
    }
}

export {
    fetchParticularSKUDataWithIndex
}
