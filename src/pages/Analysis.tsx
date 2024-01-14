import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import AnalysisList from "@/components/analysis/AnalysisList"
import MapList from "@/components/analysis/map/MapList"
import MapGraph from "@/components/analysis/map/MapGraph"


import { useState, useEffect } from 'react';
import io from 'socket.io-client';

export function Analysis() {


  const [files, setFiles] = useState<File[]>([]);
  const [maps, setMaps] = useState<any[]>([]);
  const [selectedMap, setSelectedMap] = useState<any | null>(null);


  useEffect(() => {

    fetchMapsFromAPI();
    const socket = io('http://localhost:3333');

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('analysisData', (data: any) => {
      console.info('Received event: ', data);
      fetchMapsFromAPI();
    });

    return () => {
      socket.disconnect();
    };
  }, []);


  const handleMapClick = (map_data: any) => {
    const fictiveMapData = {
      map_name: 'Map fictive',
      date: '2022-01-01',
      team1_name: 'Team A',
      team2_name: 'Team B',
      team1_score: 5,
      team2_score: 3,
      data: {
        events: generateRandomEvents(),
      },
    };
    if (map_data) {
    map_data.data.events = adjustEventValues(map_data.data.events, 15);
    setSelectedMap(map_data);

    console.info('Map selected:', map_data);
  }
  };

  function adjustEventValues(events, thresholdSeconds) {
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
        const timeDifferenceSeconds = (currentTimestamp.getTime() - lastTimestamp.getTime()) / 1000;

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
  }

  const fetchMapsFromAPI = async () => {
    try {
      const response = await fetch('http://localhost:3333/maps');
      if (response.ok) {
        const data = await response.json();
        setMaps(data);
        console.log('Maps fetched from API:', data);
      } else {
        console.error('Failed to fetch maps from API');
      }
    } catch (error) {
      console.error('Error fetching maps from API:', error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      setFiles(Array.from(selectedFiles));
    }
  };

  const handleFileUpload = async () => {
    if (!files || files.length === 0) {
      console.log('Aucun fichier sélectionné');
      return;
    }

    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });
    formData.append('teamId', 'FakeTeamId');

    try {
      const response = await fetch('http://localhost:3333/new_overwatch_analysis', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Fichiers téléversés avec succès');
        // Traiter la réponse du backend si nécessaire
      } else {
        console.error('Échec du téléversement des fichiers');
      }
    } catch (error) {
      console.error('Erreur lors du téléversement des fichiers :', error);
    }
  };

  const generateRandomEvents = () => {
    const numberOfEvents = Math.floor(Math.random() * 50) + 1; // Générer un nombre aléatoire d'événements (entre 1 et 10)
    const events = [];

    for (let i = 0; i < numberOfEvents; i++) {
      const event = {
        timestamp: i, // Utiliser une date au format ISO pour le timestamp
        type: Math.random() > 0.5 ? 'kill' : 'objective', // Alternance aléatoire entre 'kill' et 'objective'
        description: `Event ${i + 1}`, // Description générique
        value: Math.floor(Math.random() * 50)
      };

      events.push(event);
    }

    return events;
  };


  return (
    <div>
    <div className="text-2xl font-semibold">Analysis</div>

    <div className="flex gap-4 mb-4">
      <div className="w-1/3">
        <Label htmlFor="picture">Picture</Label>
        <div className="flex items-center justify-center mr-4">
          <Input
            id="picture"
            type="file"
            onChange={handleFileChange}
            className="file:bg-gray-200 file:text-black-700 hover:file:bg-blue-100 mr-4"
            multiple
          />
          <Button onClick={handleFileUpload}> Upload files</Button>
        </div>
      </div>
    </div>

    {/* AnalysisList prend toute la largeur */}
    <div>
      <AnalysisList maps={maps} />
    </div>
  </div>
  );
}
