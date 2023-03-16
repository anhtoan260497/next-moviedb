export const progressColor = (value: number) => {
    if (value < 30) return 'rgb(239,35,96)'
    if (value >= 30 && value < 70) return 'rgb(211,213,48)'
    if (value >= 70) return 'rgb(33,208,122)'
}

export const calculateRuntime = (value : number):string => {
    const hour = Math.floor(value / 60) 
    const minute = value - (hour * 60)
    return hour ? `${hour}h ${minute}m` : `${minute}m`
}

export const premieredString = (date : string, name?: string, season ?: string) => {
        const dateString = date.split('-')
        const year = dateString[0]
        const day = dateString.pop()
        const monthIndex = parseInt(dateString.pop() || "0")
        const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
        return name ? `${season} of ${name} premiered on ${months[monthIndex-1]} ${day}, ${year}`  : `${months[monthIndex-1]} ${day}, ${year}`
}

export const convertRevenue = (revenue : number) => {
   return (revenue).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
