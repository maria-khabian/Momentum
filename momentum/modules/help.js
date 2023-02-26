const getRandomNum = (numMin = 1, numMax = 21) => {
    return Math.floor(Math.random() * (numMax - numMin)) + numMin;
}

export {getRandomNum}