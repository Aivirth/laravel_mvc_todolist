export const formatDateToSQLFormat = date => {
    const formattedDate = new Date(date)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

    return formattedDate;
};

export const delayHttpRequest = ms => {
    return function(x) {
        return new Promise(resolve => setTimeout(() => resolve(x), ms));
    };
};
