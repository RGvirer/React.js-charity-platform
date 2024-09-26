export const dateDifference = (props) => {
    const currentDate = new Date();
    const dateSubmit = props.time;
    const timeDifference = currentDate - dateSubmit;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    if (daysDifference > 1)
        return `${daysDifference} ימים`;
    else if (daysDifference === 1)
        return `1 יום`;
    else if (hoursDifference > 1)
        return `${hoursDifference} שעות`;
    else if (hoursDifference === 1)
        return `1 שעה`;
    else if (minutesDifference > 1)
        return `${minutesDifference} דקות`;
    else if (minutesDifference === 1)
        return `1 דקה`;
    return `0 דקות`
}