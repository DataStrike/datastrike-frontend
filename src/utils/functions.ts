import { Team } from "@/models/teams/columns.tsx";

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const secToMin = (sec: number): string => {
  // Format must be MM:SS (2 digits for minutes and seconds)
  const minutes = Math.floor(sec / 60);
  const formattedSeconds = (sec % 60).toFixed(0).padStart(2, "0");
  return `${minutes}:${formattedSeconds}`;
};

export const adjustEventValues = (events: any[], thresholdSeconds: number) => {
  events.sort((a, b) => parseFloat(a.timestamp) - parseFloat(b.timestamp));

  // Parcourir les événements
  let lastEvent = null;
  let index = 1; // Compteur pour attribuer des valeurs distinctes

  for (const event of events) {
    // Vérifier s'il y a un événement précédent
    if (lastEvent !== null) {
      // Convertir les horodatages en objets Date
      const currentTimestamp = new Date(parseFloat(event.timestamp) * 1000);
      const lastTimestamp = new Date(parseFloat(lastEvent.timestamp) * 1000);

      // Calculer la différence en secondes entre les horodatages
      const timeDifferenceSeconds =
        (currentTimestamp.getTime() - lastTimestamp.getTime()) / 1000;

      // Vérifier si la différence est inférieure à la limite
      if (timeDifferenceSeconds < thresholdSeconds) {
        // Augmenter la valeur de l'événement actuel
        index += 1;
      } else {
        // Réinitialiser le compteur si la différence est supérieure à la limite
        index = 1;
      }
    }

    // Attribuer la valeur à l'événement actuel
    event.value = index;

    // Mettre à jour l'événement précédent
    lastEvent = event;
  }

  return events;
};

export const flattenArray = (arrayOfArrays: (string | undefined)[][]) => {
  return arrayOfArrays
    .flat()
    .filter((element) => element !== undefined) as string[];
};

export const countOccurrences = (array: string[]) => {
  return array.reduce((acc: { [key: string]: number }, curr: string) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});
};

export const selectTeam = (
  teams: Team[],
  team: Team,
  setTeam: (team: Team) => void,
  localStorage: Storage | Window["localStorage"],
) => {
  if (teams && teams.length > 0 && !team.id) {
    const lastSelectedTeam = localStorage.getItem("lastSelectedTeam");
    const selectedTeam = lastSelectedTeam
      ? teams.find((t) => t.name === lastSelectedTeam)
      : null;

    if (selectedTeam) {
      setTeam(selectedTeam);
      localStorage.setItem("lastSelectedTeam", selectedTeam.name);
    } else {
      setTeam(teams[0]);
      localStorage.setItem("lastSelectedTeam", teams[0].name);
    }
  }
};
