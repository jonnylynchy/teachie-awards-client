export default dateStr => {
    const todayTime = new Date(dateStr);
    const month = todayTime.getMonth() + 1;
    const day = todayTime.getDate();
    const year = todayTime.getFullYear();
    return `${month}/${day}/${year}`;
};
