export const selectSong = (song) => {
    return {
        type: 'SONG_SELECTED',
        payload: song
    }
}

export const penjumlahan = (num1, num2) =>{
    return{
        type: 'JUMLAH',
        payload:{
            num1:num1,
            num2:num2
        }
    }
}

export const pengurangan = (num1,num2) => {
    return{
        type:'KURANG',
        payload:{
            num1:num1,
            num2:num2
        }
    }
}

export const pengalian = (num1,num2) => {
    return{
        type:'KALI',
        payload:{
            num1:num1,
            num2:num2
        }
    }
}

export const pembagian = (num1,num2) => {
    return{
        type:'BAGI',
        payload:{
            num1:num1,
            num2:num2
        }
    }
}
