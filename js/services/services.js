const postData = async(url, data, method) => {
    const res = await fetch(url, {
        method: method,
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    return await res.json();
};

const getResource = async(url, data, method) => {
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error(`could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json()
};

export{postData};
export{getResource};