export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
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
