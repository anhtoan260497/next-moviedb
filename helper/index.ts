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