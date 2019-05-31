export const formatDateToSQLFormat = date => {
    const formattedDate = new Date(date)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

    return formattedDate;
};
