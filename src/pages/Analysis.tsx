import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {useState} from 'react'


export function Analysis() {


  const [file, setFile] = useState<File | null>(null);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      console.log('Aucun fichier sélectionné');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append("teamId", "FakeTeamId");

    try {
      const response = await fetch('http://localhost:3333/new_overwatch_analysis', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Fichier téléversé avec succès');
        // Traiter la réponse du backend si nécessaire
      } else {
        console.error('Échec du téléversement du fichier');
      }
    } catch (error) {
      console.error('Erreur lors du téléversement du fichier :', error);
    }
  };

  return (
    <div>
      <div className="text-2xl font-semibold">Analysis</div>
      <div className="grid w-full lg:max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <div className="flex items-center justify-center">
      <Input
        id="picture"
        type="file"
        onChange={handleFileChange}
        className="file:bg-gray-200 file:text-black-700 hover:file:bg-blue-100"
      />
      <Button onClick={handleFileUpload}> Upload le fichier</Button>
      </div>
    </div>
    </div>
  );
}
