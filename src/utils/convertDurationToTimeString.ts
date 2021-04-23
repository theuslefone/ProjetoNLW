export function convertDurationToTimeString(duration: number): string {
const hours = Math.floor(duration / 3600);// Converte em horas
const minutes = Math.floor((duration % 3600) / 60); // O resto da divisão é igual aos segudos, então multiplica-se por 60 para fazaer os minutos
const seconds = duration % 60;

const timeString = [hours, minutes, seconds]
    .map(unit => String(unit).padStart(2, '0'))
    .join(':')

    return timeString;
}